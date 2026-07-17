# PROMPT: Xây dựng Web Bán Điện Thoại — Phong cách thiết kế chuẩn Premium POS

> Sử dụng prompt này để yêu cầu AI tạo ra giao diện web bán điện thoại với bố cục, phong cách bo góc, lưới, màu sắc và tổ chức component giống hệt hệ thống POS ẩm thực hiện tại trong dự án này.

---

## PROMPT ĐẦY ĐỦ (COPY & PASTE VÀO AI)

```
Hãy xây dựng cho tôi một website bán điện thoại (Phone Store) bằng Next.js (App Router) + TypeScript + Vanilla CSS (không dùng Tailwind). 

Trang web gồm 3 màn hình chính:
1. Trang danh sách sản phẩm (Product Listing)
2. Trang chi tiết sản phẩm (Product Detail)
3. Trang giỏ hàng + thanh toán (Cart & Checkout)

---

## YÊU CẦU KỸ THUẬT

**Công nghệ bắt buộc:**
- Next.js 15+ với App Router (`app/` directory)
- TypeScript cho tất cả file `.tsx` và `.ts`
- CSS Module hoặc Vanilla CSS (tệp `.css` toàn cục hoặc `globals.css`)
- Lucide React cho icon (thư viện: `lucide-react`)
- Không dùng Tailwind CSS, không dùng UI library (MUI, Chakra, Shadcn...)
- Font: Inter hoặc Outfit từ Google Fonts

**Tổ chức thư mục:**
```
src/
  app/
    page.tsx               # Trang danh sách sản phẩm
    products/[id]/
      page.tsx             # Trang chi tiết sản phẩm
    cart/
      page.tsx             # Trang giỏ hàng
  components/
    base/
      Button.tsx           # Component nút dùng chung
      SafeImage.tsx        # Wrapper next/image với onError fallback
      Input.tsx            # Input dùng chung
    features/
      ProductGrid.tsx      # Lưới sản phẩm
      ProductCard.tsx      # Card sản phẩm đơn lẻ
      FilterSidebar.tsx    # Thanh lọc sản phẩm
      CartPanel.tsx        # Panel giỏ hàng bên phải
      Navbar.tsx           # Thanh điều hướng trên cùng
  types/
    product.ts             # Interface Product, Category, CartItem
  utils/
    formatters.ts          # formatCurrency, formatDate
  constants/
    labels.ts              # Toàn bộ string hiển thị UI (không hardcode)
  hooks/
    useCart.ts             # Custom hook quản lý giỏ hàng
    useProducts.ts         # Custom hook tải và lọc sản phẩm
  data/
    products.ts            # Dữ liệu mẫu điện thoại (mock data)
```

---

## YÊU CẦU THIẾT KẾ (BẮT BUỘC TUÂN THỦ)

### 1. Bảng màu & Dark Mode (Minimalist Tech Purple)
- Hỗ trợ **Dark Mode** đầy đủ (dùng CSS variable + `data-theme` attribute hoặc `prefers-color-scheme`).

**Màu accent chính:**
- **Primary**: `#6366F1` (Indigo / Tím chàm công nghệ) — dùng cho nút CTA, giá nổi bật, badge, link. Màu tím dịu nhẹ pha xanh dương, tạo cảm giác công nghệ tương lai nhưng không bị sặc sỡ.
- **Primary hover**: `#4F46E5` — trạng thái hover/active của nút.
- **Primary glow** (box-shadow CTA): `rgba(99, 102, 241, 0.20)`.

**Nền trang (Light Mode — Pure Clean Whites):**
- Nền chính: `#ffffff` (Trắng tinh khiết chủ đạo)
- Nền section phụ: `#f8fafc` (Mát mẻ, thanh lịch)
- Nền tertiary: `#f1f5f9` (Xám trắng nhẹ)

**Nền trang (Dark Mode — Sleek True Black):**
- Nền chính: `#000000` (Đen sâu OLED)
- Nền thứ cấp: `#08080a` (Đen xám siêu tối)
- Nền card: `#0c0c0e` (Card đen tuyền)

**Typography:**
- Text chính sáng: `#0f172a` (Slate-900) / tối: `#f8fafc`
- Text phụ sáng: `#475569` (Slate-600) / tối: `#cbd5e1`
- Text caption sáng: `#64748b` (Slate-500) / tối: `#94a3b8`
**Viền (Minimalist Tech Purple borders):**
- Sáng: `rgba(99, 102, 241, 0.06)` — cực mỏng, pha sắc tím nhạt.
- Tối: `rgba(99, 102, 241, 0.12)`

**Status colors (Apple Human Interface Guidelines):**
- Còn hàng: `#34C759` (Apple Green)
- Sắp hết: `#FF9F0A` (Apple Amber)
- Hết hàng / Nguy hiểm: `#FF3B30` (Apple Red)


### 2. Bo góc — Hệ thống Radius thống nhất (Apple-Inspired Aggressive Rounding)
Tuân thủ chính xác theo hệ thống bo góc phân cấp sau:
- **`border-radius: 24px`**: Container lớn — Section wrapper, Panel chính.
- **`border-radius: 20px`**: Card sản phẩm, Modal, Dropdown (Apple-style, tăng từ 16px cũ).
- **`border-radius: 14px`**: Nút thường, Input, Select, SearchBar.
- **`border-radius: 8px`**: Badge trạng thái nhỏ, chip lọc.
- **`border-radius: 9999px`**: Pill tag, nút pill, avatar chip (Apple dùng rất nhiều).

### 3. Hệ thống lưới (Grid Layout)
- **Trang danh sách sản phẩm**: Layout 2 cột (`aside` + `main`).
  - `aside` (FilterSidebar): `width: 260px`, cố định (sticky), tràn scroll riêng.
  - `main` (ProductGrid): Flex-grow, dùng `grid` responsive:
    - Mobile: `1 cột`
    - Tablet: `2 cột`
    - Desktop: `3 cột`
    - Large: `4 cột`
- **Trang giỏ hàng**: Layout 2 cột (`main cart list` + `order summary panel`).
  - `main`: Flex-grow, danh sách sản phẩm trong giỏ.
  - `summary panel`: `width: 384px` (w-96), cố định bên phải, sticky.
- Gap giữa các phần tử grid: `24px`.
- Padding container: `32px` (desktop), `16px` (mobile).

### 4. Card sản phẩm (ProductCard)
Mỗi card cần có:
- Ảnh sản phẩm (aspect ratio 4:3, `object-fit: cover`, bo góc 16px).
- Badge trạng thái ở góc trên (ví dụ: "Còn hàng" màu xanh emerald, "Sắp hết" màu amber, "Hết hàng" màu xám).
- Tên sản phẩm (font-weight: 800, 1 dòng, ellipsis overflow).
- Thương hiệu (font-weight: 600, text nhỏ màu gray-400).
- Giá bán (màu Primary orange, font-weight: 900, font-size: 1rem).
- Giá gốc (gạch ngang nếu đang giảm giá, text-decoration: line-through, màu gray-400).
- Thanh % giảm giá (badge rounded-lg, màu rose-500 background).
- Nút "Thêm vào giỏ" — chiếm toàn bộ chiều rộng card, bo góc 12px.
- Hiệu ứng hover: `transform: scale(1.01)`, `box-shadow` sâu hơn, tên sản phẩm đổi sang màu primary.
- Accent bar màu trái: Thanh dọc 6px ở cạnh trái card, màu primary/emerald tùy trạng thái.

### 5. Navbar
- Dính top (sticky/fixed), blur backdrop filter.
- Logo bên trái (icon điện thoại + text thương hiệu).
- Search bar ở giữa với icon kính lúp.
- Bên phải: Icon giỏ hàng (badge đếm số lượng), nút Dark Mode toggle.
- Viền bottom nhẹ, nền semi-transparent với `backdrop-filter: blur(12px)`.

### 6. FilterSidebar (Thanh lọc)
Gồm các section lọc:
- Lọc theo **Thương hiệu** (Apple, Samsung, Xiaomi...): Checkbox list.
- Lọc theo **Khoảng giá**: Range slider hoặc 2 input min/max.
- Lọc theo **Dung lượng RAM**: Checkbox hoặc chip toggle.
- Lọc theo **Màu sắc**: Color dot selector.
- Nút "Reset bộ lọc" ở cuối.
- Mỗi section có tiêu đề bold uppercase, có thể thu gọn (collapse/expand).

### 7. CartPanel (Panel tóm tắt đơn hàng)
- Nền trắng/slate-900, bo góc 24px, border nhẹ, shadow-sm.
- Hiển thị từng sản phẩm trong giỏ: ảnh nhỏ (48px) + tên + giá + nút tăng/giảm số lượng + xóa.
- Nút tăng/giảm: bo góc 6px, border nhẹ, hover màu nhẹ.
- Section tổng tiền: Tạm tính, Phí ship, Giảm giá, Tổng cộng (bold lớn, màu primary).
- Input mã giảm giá (voucher code) với nút "Áp dụng".
- Nút "Thanh toán ngay" — chiếm toàn bộ chiều rộng, bo góc 16px, màu primary, shadow primary/20, hover scale 1.01.

### 8. Micro-animations & Transitions
- Tất cả button: `transition: all 0.15s ease`.
- Card hover: `transition: transform 0.2s ease, box-shadow 0.2s ease`.
- Sidebar collapse: `transition: max-height 0.3s ease`.
- Thêm vào giỏ: Animation ngắn trên badge count (scale bounce).
- Skeleton loading: Dùng gradient animation khi đang tải dữ liệu.

### 9. Typography
- Font stack: `'Inter', 'Outfit', -apple-system, sans-serif`.
- Tiêu đề trang: `font-size: 1.25rem`, `font-weight: 900` (font-black).
- Tiêu đề section: `font-size: 1rem`, `font-weight: 800` (font-extrabold).
- Body: `font-size: 0.875rem`, `font-weight: 600` (font-semibold).
- Caption/Label: `font-size: 0.625rem`–`0.75rem`, `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.05em`.

---

## YÊU CẦU MOCK DATA

Tạo file `src/data/products.ts` với **ít nhất 12 điện thoại mẫu**, mỗi sản phẩm có:
```typescript
interface Product {
  id: number;
  name: string;          // "iPhone 16 Pro Max 256GB"
  brand: string;         // "Apple"
  price: number;         // Giá bán (VND), ví dụ: 34990000
  originalPrice?: number; // Giá gốc nếu đang giảm
  discount?: number;     // % giảm giá, ví dụ: 15
  image: string;         // URL ảnh (dùng https://picsum.photos/400/300?random=N)
  images?: string[];     // Thêm ảnh cho trang detail
  category: string;      // "flagship" | "mid-range" | "budget"
  ram: string;           // "8GB" | "12GB" | "16GB"
  storage: string;       // "128GB" | "256GB" | "512GB"
  color: string;         // "Titan Đen" | "Trắng Ngọc Trai"...
  colors?: string[];     // Tất cả màu có sẵn
  stock: number;         // Số lượng tồn kho
  rating: number;        // 4.5
  reviewCount: number;   // 128
  tags?: string[];       // ["5G", "AI Camera", "Flagship"]
  description?: string;
}
```

---

## YÊU CẦU CUSTOM HOOK

### `useCart.ts`
```typescript
// Quản lý giỏ hàng: thêm, xóa, cập nhật số lượng, tính tổng
// Lưu state vào localStorage để persist khi tải lại trang
// Trả về: { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotals, applyVoucher }
```

### `useProducts.ts`
```typescript  
// Load và filter sản phẩm
// Hỗ trợ: searchQuery, selectedBrands, priceRange, selectedRam, selectedColor, sortBy
// Trả về: { products, filteredProducts, loading, filters, setFilters, resetFilters }
```

---

## YÊU CẦU CONSTANTS

File `src/constants/labels.ts` chứa toàn bộ chuỗi UI (không hardcode string trong JSX):
```typescript
export const LABELS = {
  STORE: {
    TITLE: 'PhoneStore',
    SEARCH_PLACEHOLDER: 'Tìm kiếm điện thoại...',
  },
  PRODUCT: {
    ADD_TO_CART: 'Thêm vào giỏ',
    OUT_OF_STOCK: 'Hết hàng',
    ALMOST_OUT: (stock: number) => `Còn ${stock} sp`,
    DISCOUNT_BADGE: (pct: number) => `-${pct}%`,
    REVIEWS: (count: number) => `${count} đánh giá`,
  },
  CART: {
    TITLE: (count: number) => `Giỏ hàng (${count})`,
    EMPTY: 'Giỏ hàng trống',
    SUBTOTAL: 'Tạm tính',
    SHIPPING: 'Phí vận chuyển',
    DISCOUNT: 'Giảm giá',
    TOTAL: 'Tổng cộng',
    CHECKOUT: 'Thanh toán ngay',
    CLEAR_ALL: 'Xóa tất cả',
    VOUCHER_PLACEHOLDER: 'Nhập mã giảm giá...',
    APPLY_VOUCHER: 'Áp dụng',
  },
  FILTER: {
    TITLE: 'Bộ lọc',
    BRAND: 'Thương hiệu',
    PRICE_RANGE: 'Khoảng giá',
    RAM: 'RAM',
    COLOR: 'Màu sắc',
    RESET: 'Xóa bộ lọc',
    RESULTS: (count: number) => `${count} sản phẩm`,
  },
}
```

---

## CHECKLIST CHẤT LƯỢNG

Trước khi giao code, hãy đảm bảo:
- [ ] Không có chuỗi ký tự tiếng Việt hardcode trực tiếp trong JSX (phải dùng `LABELS`)
- [ ] Không dùng `any` trong TypeScript (phải có đầy đủ interface)
- [ ] Tất cả ảnh dùng qua component `SafeImage` với fallback `onError`
- [ ] Dark mode hoạt động đúng trên tất cả component
- [ ] Responsive trên mobile (320px), tablet (768px) và desktop (1280px+)
- [ ] Không có magic number (phải đặt trong constants hoặc CSS variable)
- [ ] Mỗi file component có comment block đầu mô tả mục đích
- [ ] `useCart.ts` persist giỏ hàng vào `localStorage`
- [ ] Nút "Thêm vào giỏ" disabled khi `stock <= 0`
- [ ] Tất cả button có `type="button"` để tránh submit form nhầm
```

---

## GHI CHÚ THIẾT KẾ THAM CHIẾU

Palette này lấy cảm hứng từ **triết lý thiết kế Apple** (apple.com 2024) nhưng tạo ra ngôn ngữ hình ảnh riêng biệt để không đụng hàng.

**So sánh khác biệt chủ chốt với Apple:**
| Yếu tố | Apple.com | PHONE_SHOP |
|---------|-----------|-----------|
| Accent color | `#0071e3` (Blue) | `#5E5CE6` (Indigo-Violet) |
| Background phụ | `#f5f5f7` (cold gray) | `#f5f5f9` (slight violet tinge) |
| Dark background | `#1d1d1f` | `#111114` (blue-dark tinge) |
| Border radius card | 18px | 20px |
| Shadow style | Gần như không có | Ultra-light + indigo glow trên CTA |

**Các design pattern đặc trưng cần giữ nguyên:**
| Pattern | Mô tả |
|---------|-------|
| **Accent bar** | Thanh dọc 6px màu `#5E5CE6` ở cạnh trái mỗi ProductCard |
| **Rounded containers** | Container lớn: 24px, Card: 20px (Apple-like) |
| **Ultra-light shadow** | `rgba(0,0,0,0.06)` max — không dùng shadow nặng |
| **Font-black headings** | Tiêu đề luôn dùng `font-weight: 900` |
| **Badge uppercase** | Badge trạng thái luôn UPPERCASE + `letter-spacing: 0.06em` |
| **Primary/10 bg tints** | Nền tint nhẹ dùng `rgba(94,92,230,0.1)` cho section highlight |
| **Scale hover** | Hover card dùng `scale(1.02)` (Apple-like, tinh tế hơn 1.01) |
| **Apple easing** | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` cho tất cả transitions |
| **Indigo glow CTA** | Nút "Thêm vào giỏ" có `box-shadow: 0 4px 20px rgba(94,92,230,0.28)` |
| **Apple Green = Available** | `#34C759` cho trạng thái "Còn hàng" |
| **Apple Amber = Warning** | `#FF9F0A` cho trạng thái "Sắp hết" |
| **Apple Red = Danger** | `#FF3B30` cho hành động nguy hiểm (xóa, hủy, hết hàng) |
| **Pill tags** | Filter chip dùng `border-radius: 9999px` — Apple style |
| **SF Pro / Inter font** | `font-family: 'SF Pro Display', 'Inter', -apple-system` |
