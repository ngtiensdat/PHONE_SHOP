/**
 * useAuthStore
 * Zustand global store for authentication state.
 * Stores: accessToken, user info (from JWT payload).
 * Persisted: NO — accessToken is in-memory only for security.
 * Refresh token is in HTTP-Only cookie (managed by backend).
 *
 * Related: src/lib/api-client.ts, src/hooks/useAuth.ts
 * Pattern: Zustand store with typed state and actions
 */
import { create } from 'zustand';

export interface AuthUser {
  id: number;
  email: string;
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN';
  fullName?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isInitialized: boolean;

  // Actions
  setUser: (user: AuthUser | null) => void;
  setAccessToken: (token: string | null) => void;
  setInitialized: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isInitialized: false,

  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setInitialized: (isInitialized) => set({ isInitialized }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
    }),
}));
