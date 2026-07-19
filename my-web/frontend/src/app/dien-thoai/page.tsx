/**
 * Route Alias for /dien-thoai -> redirects to /products
 */
import { redirect } from 'next/navigation';

export default function DienThoaiPage() {
  redirect('/products');
}
