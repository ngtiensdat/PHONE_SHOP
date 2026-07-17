/**
 * AuthService
 * Encapsulates all authentication API endpoints.
 * Separates data fetching from UI hooks/components.
 *
 * Related: src/hooks/useAuth.ts, src/lib/api-client.ts
 * Pattern: Service Layer (Clean Architecture)
 */

import { api } from '@/lib/api-client';
import { AuthUser } from '@/store/useAuthStore';

export const authService = {
  login: async (credentials: any) => {
    return api.post<{ accessToken: string; user: AuthUser }>('/auth/login', credentials, {
      skipAuth: true,
    });
  },

  register: async (data: any) => {
    return api.post<AuthUser>('/auth/register', data, {
      skipAuth: true,
    });
  },

  logout: async () => {
    return api.post<void>('/auth/logout');
  },

  getProfile: async () => {
    return api.get<AuthUser>('/auth/profile');
  },
};
