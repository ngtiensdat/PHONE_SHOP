/**
 * api-client.ts
 * Centralized HTTP client for all API calls to the NestJS backend.
 * Features:
 *  - Auto-attach Authorization Bearer token from AuthStore
 *  - Auto-refresh on 401 (token expiry)
 *  - Consistent error handling and toast notifications
 *
 * Related: src/services/*.service.ts, src/store/useAuthStore.ts
 * Pattern: Singleton fetch wrapper with interceptor-like behavior
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = RequestInit & {
  skipAuth?: boolean;
};

async function getAccessToken(): Promise<string | null> {
  // Dynamic import to avoid circular dependency with auth store
  const { useAuthStore } = await import('../store/useAuthStore');
  return useAuthStore.getState().accessToken;
}

async function setAccessToken(token: string | null): Promise<void> {
  const { useAuthStore } = await import('../store/useAuthStore');
  useAuthStore.getState().setAccessToken(token);
}

export async function handleRefreshToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // HTTP-Only cookie
    });

    if (!res.ok) {
      await setAccessToken(null);
      return null;
    }

    const data = (await res.json()) as { data: { accessToken: string } };
    const newToken = data.data.accessToken;
    await setAccessToken(newToken);
    return newToken;
  } catch {
    await setAccessToken(null);
    return null;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { skipAuth = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const token = await getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    credentials: 'include',
  });

  // Auto-refresh on 401
  if (response.status === 401 && !skipAuth) {
    const newToken = await handleRefreshToken();
    if (newToken) {
      // Retry with new token
      const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers: {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        },
        credentials: 'include',
      });

      if (!retryResponse.ok) {
        const errorData = (await retryResponse.json()) as { message: string };
        throw new ApiError(
          retryResponse.status,
          errorData.message ?? 'Lỗi xác thực',
          errorData,
        );
      }

      const retryData = (await retryResponse.json()) as { data: T };
      return retryData.data;
    }

    throw new ApiError(401, 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
  }

  if (!response.ok) {
    const errorData = (await response.json()) as {
      message: string | string[];
      statusCode: number;
    };
    const message = Array.isArray(errorData.message)
      ? errorData.message[0]
      : (errorData.message ?? 'Có lỗi xảy ra');
    throw new ApiError(response.status, message, errorData);
  }

  const result = (await response.json()) as { data: T };
  return result.data;
}

// HTTP method helpers
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};
