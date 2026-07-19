/**
 * useIsMounted Hook
 * Idiomatic React 18+ hook using useSyncExternalStore to detect client-side mounting.
 * Eliminates SSR hydration mismatch warnings without triggering cascading renders via useEffect setState.
 *
 * Related: src/components/features/product/CompactProductCard.tsx
 * Related: src/components/features/product/CompareFloatingBar.tsx
 * Pattern: React 18 External Store Hydration Guard
 */

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Client value
    () => false  // Server value
  );
}
