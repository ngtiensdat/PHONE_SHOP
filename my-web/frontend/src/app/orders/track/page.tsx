/**
 * Route Alias: /orders/track -> redirects to /orders
 */
import { redirect } from 'next/navigation';

export default function OrderTrackAliasPage() {
  redirect('/orders');
}
