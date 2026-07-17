# Rule: Frontend UI & UX Standard — Phone Shop (Vanilla CSS Edition)

## 1. Anti-Redundancy (Tiêu diệt trùng lặp)
- **Base Components:** Mọi UI xuất hiện > 2 lần PHẢI nằm trong `src/components/base/`.
- **Global Layouts:** Sử dụng App Router Layout để quản lý Navbar/Footer. CẤM copy-paste cấu trúc khung vào từng trang.

## 2. Design System Tokens — Vanilla CSS (Hệ thống biến CSS)
- **Magic Values:** CẤM hardcode màu hex, pixel, border-radius trong JSX hoặc CSS class. Tất cả phải khai báo trong `src/index.css` dưới dạng CSS variable.
- **Bảng màu bắt buộc (Apple-Inspired Premium Indigo):**
  - Primary: `var(--color-primary)` = `#5E5CE6` (Indigo-Violet — khác Apple blue, premium hơn orange)
  - Primary hover: `var(--color-primary-hover)` = `#4B4ACA`
  - Primary tint: `var(--color-primary-tint)` = `rgba(94, 92, 230, 0.1)`
  - Primary glow: `var(--color-primary-glow)` = `rgba(94, 92, 230, 0.25)` (cho button shadow)

  **Light Mode (Apple-style clean whites):**
  - BG primary: `var(--bg-primary)` = `#ffffff`
  - BG secondary: `var(--bg-secondary)` = `#f5f5f9` (Apple `#f5f5f7` + chút violet tinge)
  - BG tertiary: `var(--bg-tertiary)` = `#ebebf0`
  - BG card: `var(--bg-card)` = `#ffffff`
  - BG elevated: `var(--bg-elevated)` = `#f5f5f9`

  **Dark Mode (Apple-like deep black):**
  - BG primary dark: `var(--bg-dark-primary)` = `#000000`
  - BG secondary dark: `var(--bg-dark-secondary)` = `#111114` (chút blue-tinge khác Apple pure dark)
  - BG tertiary dark: `var(--bg-dark-tertiary)` = `#1c1c1f`
  - BG card dark: `var(--bg-dark-card)` = `#1c1c1f`

  **Typography (Apple `#1d1d1f` convention):**
  - Text primary: `var(--text-primary)` = `#1d1d1f` (Apple's exact heading color)
  - Text secondary: `var(--text-secondary)` = `#6e6e73` (Apple's body text)
  - Text muted: `var(--text-muted)` = `#86868b` (Apple's footnote)
  - Text primary dark: `var(--text-dark-primary)` = `#f5f5f7` (Apple dark text)
  - Text muted dark: `var(--text-dark-muted)` = `#98989d`

  **Border (Apple ultra-subtle):**
  - Border light: `var(--border-color)` = `rgba(0,0,0,0.08)`
  - Border medium: `var(--border-medium)` = `rgba(0,0,0,0.15)`
  - Border dark: `var(--border-dark)` = `rgba(255,255,255,0.1)`

  **Status colors (Apple Human Interface Guidelines):**
  - Success/Còn hàng: `var(--color-success)` = `#34C759` (Apple green)
  - Warning/Sắp hết: `var(--color-warning)` = `#FF9F0A` (Apple amber)
  - Danger/Hết hàng/Xóa: `var(--color-danger)` = `#FF3B30` (Apple red)

- **Typography tokens:** Chỉ dùng CSS variables:
  - `--font-size-display` = `2.5rem` | `--font-weight-black` = 900
  - `--font-size-h1` = `1.75rem` | `--font-size-h2` = `1.25rem`
  - `--font-size-body` = `0.9375rem` | `--font-size-small` = `0.8125rem`
  - `--font-size-caption` = `0.6875rem` | `--letter-spacing-caps` = `0.06em`
  - `--line-height-tight` = 1.1 (Apple headings) | `--line-height-body` = 1.5

- **Border-radius tokens (Apple-inspired, aggressive rounding):**
  - Container lớn: `var(--radius-3xl)` = 24px
  - Card/Modal: `var(--radius-2xl)` = 20px (Apple tăng 20px từ 16px)
  - Button/Input: `var(--radius-xl)` = 14px
  - Badge: `var(--radius-lg)` = 8px
  - Pill/Tag: `var(--radius-full)` = 9999px (Apple dùng nhiều)

- **Spacing system:**
  - `--space-xs` = 4px | `--space-sm` = 8px | `--space-md` = 16px
  - `--space-lg` = 24px | `--space-xl` = 32px | `--space-2xl` = 48px
  - `--space-3xl` = 64px | `--space-section` = 96px

- **Shadow system (Apple ultra-light shadows):**
  - `--shadow-xs` = `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)`
  - `--shadow-sm` = `0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)`
  - `--shadow-md` = `0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)`
  - `--shadow-primary` = `0 4px 20px rgba(94,92,230,0.25)` (glow button indigo)


## 3. UI State Management (Quản lý trạng thái)
- **Skeleton First:** CẤM dùng Loading Spinner cho khối dữ liệu. Hãy dùng Skeleton Screen với `@keyframes shimmer`.
- **Feedback System:** Sử dụng Global Toast (`useToastStore`) cho các thông báo Thành công/Lỗi. Không tự code UI thông báo trong từng Component.
- **Cart State:** Mọi thao tác với giỏ hàng phải đi qua `useCart()` hook, không đọc/ghi `useCartStore` trực tiếp trong component.

## 4. Accessibility & SEO (Chuẩn SEO & Tiếp cận)
- **Semantic HTML:** Luôn dùng `<main>`, `<section>`, `<article>`, `<aside>`. Chỉ có 1 thẻ `<h1>` duy nhất mỗi trang.
- **SafeImage:** Luôn dùng `<SafeImage>` (không dùng `next/image` trực tiếp) với `alt` text để tối ưu hiệu năng và tránh lỗi 404.
- **Aria-Labels:** Mọi nút icon-only (cart, search, dark mode toggle) phải có `aria-label`.
- **type="button":** Tất cả `<button>` không submit form phải có `type="button"` để tránh form submission nhầm.

## 5. Interactions & Animations (Tương tác & Micro-animations)
- **Visual Feedback:** Mọi nút bấm/link phải có trạng thái Hover, Active, Disabled rõ ràng.
- **Transition preset:** `transition: all 0.15s ease` cho buttons, `0.2s ease` cho card hover.
- **Card hover:** `transform: scale(1.01)` + `box-shadow` sâu hơn. KHÔNG dùng scale lớn hơn 1.02.
- **Accent bar:** Mọi ProductCard PHẢI có thanh dọc 6px `var(--color-primary)` ở cạnh trái.
- **CẤM framer-motion** trừ khi có yêu cầu đặc biệt — dùng CSS transitions thuần.

---

### ❌ Cấm (Don't)
```tsx
// 1. Hardcode màu & magic value
<div style={{ backgroundColor: '#f97316', borderRadius: '24px' }}>
  <p style={{ fontSize: '20px', fontWeight: 900 }}>Tiêu đề</p>
  <button style={{ padding: '12px 24px' }}>Click Me</button>
</div>

// 2. Dùng next/image trực tiếp
<Image src={product.image} alt={product.name} width={400} height={300} />

// 3. Import store trực tiếp trong component
import { useCartStore } from '@/store/useCartStore';
```

### ✅ Nên (Should)
```tsx
// 1. Dùng Semantic HTML + CSS Variables + Base Components
<article className="card-container">
  <div className="accent-bar" />
  <h2 className="text-primary" style={{ fontWeight: 'var(--font-weight-black)' }}>
    {LABELS.PRODUCT.TITLE}
  </h2>
  <Button variant="primary" type="button" aria-label={LABELS.PRODUCT.ADD_TO_CART}>
    {LABELS.PRODUCT.ADD_TO_CART}
  </Button>
</article>

// 2. Dùng SafeImage
<SafeImage src={product.image} alt={product.name} width={400} height={300} />

// 3. Dùng hook để truy cập cart
const { addToCart } = useCart();
```

## Checklist
- [ ] Trang này có đang lặp lại Navbar/Footer không?
- [ ] Đã dùng Global Toast thay vì tự code thông báo chưa?
- [ ] Các icon-only button đã có `aria-label` chưa?
- [ ] Đã dùng `SafeImage` kèm `alt` text chưa?
- [ ] Tất cả màu sắc có dùng CSS variable không?
- [ ] ProductCard có accent bar 6px bên trái không?
- [ ] Nút "Thêm vào giỏ" có `disabled` khi `stock <= 0` không?
