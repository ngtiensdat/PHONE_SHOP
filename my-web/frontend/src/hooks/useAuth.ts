/**
 * useAuth Hook
 * Custom React hook for controlling authentication actions, endpoints, and status.
 *
 * Related: src/store/useAuthStore.ts, src/lib/api-client.ts
 * Pattern: Custom Hook for authentication facade
 */

'use client';

import { useAuthStore } from '@/store/useAuthStore';
import type { AuthUser } from '@/store/useAuthStore';
import { authService } from '@/services/auth.service';
import { toast } from '@/store/useToastStore';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { APP_CONFIG } from '@/constants/config';
import { handleRefreshToken } from '@/lib/api-client';

export function useAuth() {
  const router = useRouter();
  const { user, accessToken, isInitialized, setUser, setAccessToken, setInitialized, logout: clearStore } = useAuthStore();
  const clearCart = useCartStore((state) => state.clearCart);

  // Initialize and check current session
  const initializeAuth = useCallback(async () => {
    if (isInitialized) return;
    
    try {
      // Attempt to refresh token silently using shared HTTP-only cookie logic
      const token = await handleRefreshToken();
      if (token) {
        // Fetch user profile info via service
        const profile = await authService.getProfile();
        setUser(profile);
      }
    } catch (err) {
      // Silently ignore initialization errors (means guest user)
    } finally {
      setInitialized(true);
    }
  }, [isInitialized, setUser, setInitialized]);

  // Run initialization once on app load
  useEffect(() => {
    void initializeAuth();
  }, [initializeAuth]);

  // Login handler
  const login = useCallback(
    async (credentials: any) => {
      try {
        const data = await authService.login(credentials);

        setAccessToken(data.accessToken);
        setUser(data.user);
        toast.success(`Chào mừng trở lại, ${data.user.fullName || data.user.email}!`);

        // Redirect based on role
        if (data.user.role === 'ADMIN') {
          router.push('/admin');
        } else if (data.user.role === 'STAFF') {
          router.push('/admin/orders');
        } else {
          router.push('/dashboard');
        }
      } catch (err: any) {
        toast.error(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        throw err;
      }
    },
    [setAccessToken, setUser, router]
  );

  // Logout handler
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Fallback local cleanup even if server request fails
    } finally {
      clearStore();
      clearCart();
      toast.info('Bạn đã đăng xuất thành công.');
      router.push('/');
    }
  }, [clearStore, clearCart, router]);

  // Register handler
  const register = useCallback(
    async (data: any) => {
      try {
        await authService.register(data);
        toast.success('Đăng ký tài khoản thành công! Tiến hành đăng nhập.');
        router.push('/login');
      } catch (err: any) {
        toast.error(err.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
        throw err;
      }
    },
    [router]
  );

  return {
    user,
    accessToken,
    isAuthenticated: !!accessToken && !!user,
    isInitialized,
    isCustomer: user?.role === 'CUSTOMER',
    isStaff: user?.role === 'STAFF',
    isAdmin: user?.role === 'ADMIN',
    login,
    register,
    logout,
  };
}
