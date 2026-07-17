# Rule: Frontend Architecture & Logic Separation (Master Edition)

## 1. Single Responsibility Principle (Nguyên tắc đơn trách nhiệm)
- **Component (View):** Chỉ chịu trách nhiệm hiển thị (UI) và nhận tương tác. Tuyệt đối không chứa logic xử lý dữ liệu, tính toán phức tạp hay gọi API.
- **Custom Hook (Logic):** Chịu trách nhiệm quản lý logic và trạng thái (State/Logic). Mọi logic liên quan đến Cart, Filter sản phẩm, Auth phải được tách ra Custom Hook.
- **Service (Data):** Chịu trách nhiệm giao tiếp với API. CẤM gọi `fetch` hay `axios` trực tiếp trong Component hoặc Hook.

## 2. Component Modularization & Structure
- **Feature-Based:** Nếu một trang (Page) có nhiều phần lớn (Hero, Sliders, Settings, Modals), mỗi phần PHẢI là một Component riêng biệt nằm trong `src/components/features/`.
- **Atomic Components:** Các thành phần UI cơ bản (Button, Input, Badge) phải nằm trong `src/components/base/` (Đã quy định trong `frontend-ui-rule`).
- **File Length Awareness:** Mặc dù không giới hạn dòng code cứng nhắc, nhưng một file Page chỉ nên đóng vai trò "người điều phối" (Orchestrator), lắp ghép các Feature Component lại với nhau.

## 3. Data Fetching & API Standard
- **Centralized API:** Tất cả các cuộc gọi API phải thông qua folder `src/services/`. Sử dụng `apiClient` dùng chung để quản lý Token, Header và Error handling tập trung.
- **Error Handling:** Phải có cơ chế xử lý lỗi đồng nhất (ví dụ: hiển thị Toast message) thay vì chỉ `console.error`.

## 4. State Management Standard
- **Global State:** Sử dụng Zustand hoặc Context API cho các dữ liệu dùng chung toàn app (User Info, Theme, Cart).
- **Local State Separation:** Khi một Component có quá 5-7 cái `useState`, đó là tín hiệu phải tách chúng ra một Custom Hook hoặc chia nhỏ Component.

## 5. Constants & Anti-Hardcoding
- **Zero Hardcoding:** 
    - Các mảng dữ liệu tĩnh (Categories, Tabs, Navigation menu) phải nằm trong folder `src/constants/`.
    - API URL, Key phải nằm trong `.env` và truy cập qua `process.env`.
    - Các chuỗi text hiển thị (nếu lặp lại) nên được đưa vào hằng số.

## 6. Examples (Do vs Don't)

### ❌ Cấm (Don't) - Page "ôm đồm" 1000 dòng
```tsx
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  // ... 50 cái useState khác
  
  useEffect(() => {
    fetch('http://localhost:3001/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []); // Cấm gọi fetch trực tiếp và hardcode URL
  
  return (
    <div>
      <nav>...</nav> {/* Navbar nằm luôn ở đây - SAI */}
      <section>...</section> {/* Hero nằm luôn ở đây - SAI */}
    </div>
  );
}
```

### ✅ Nên làm (Do) - Page gọn gàng, tách biệt logic
```tsx
// useProducts.ts (Custom Hook)
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    productService.getAll().then(data => setProducts(data)); // Gọi qua Service
  }, []);
  return { products };
};

// HomePage.tsx (Sạch sẽ)
export default function HomePage() {
  const { products } = useProducts();
  const { cart } = useCart();
  return (
    <main>
      <Navbar />
      <FilterSidebar />
      <ProductGrid items={products} />
    </main>
  );
}
```

## Checklist
- [ ] Logic API đã được tách vào Service chưa?
- [ ] Các đoạn dữ liệu tĩnh (như categories) đã được đưa vào `constants` chưa?
- [ ] Đã tách logic phức tạp ra Custom Hook chưa?
- [ ] Page có đang chứa trực tiếp các đoạn code JSX quá dài của Navbar/Hero không? (Nếu có -> Tách vào Features).
- [ ] Đã thay thế `document.get...` bằng `useRef` chưa?
