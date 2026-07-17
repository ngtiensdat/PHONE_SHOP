# Cấu trúc Dự án PHONE_SHOP — Web Bán Điện Thoại

> **Cập nhật lần cuối:** 2026-07-14
> **Ghi nhớ bởi:** Antigravity AI Agent
> **Mục đích:** Cung cấp bản đồ toàn diện cấu trúc thư mục và kiến trúc hệ thống để các phiên làm việc tiếp theo không cần khám phá lại từ đầu.

---

## THÔNG TIN CHUNG

| Thuộc tính | Giá trị |
|-----------|---------|
| **Tên đề tài** | Xây dựng website bán điện thoại tích hợp AI gợi ý sản phẩm |
| **Workspace** | `e:\PHONE_SHOP_code` |
| **Monorepo root** | `e:\PHONE_SHOP_code\my-web` |
| **Backend port** | `3001` (NestJS) |
| **Frontend port** | `3000` (Next.js) |
| **Dev command** | `npm run dev` (từ `e:\PHONE_SHOP_code`) — chạy cả 2 process song song |
| **Database** | PostgreSQL + pgvector extension |
| **Redis** | In-Memory fallback khi Redis offline (development mode) |

---

## CẤU TRÚC THƯ MỤC GỐC (`e:\PHONE_SHOP_code`)

```
e:\PHONE_SHOP_code\
├── .agent/                        # Cấu hình quy tắc cho AI Agent
│   ├── directory structure/       # Tài liệu cấu trúc dự án (file này)
│   ├── rule/                      # Quy tắc code, commit, naming convention
│   ├── skills/                    # Kỹ năng chuyên biệt của agent
│   └── workflow/                  # Quy trình làm việc chuẩn
├── .check-prompt/                 # Prompt mẫu để AI chấm điểm/review code
├── docs/                          # Tài liệu kỹ thuật, SRS, ERD...
├── my-web/                        # Monorepo chứa Backend + Frontend
│   ├── backend/                   # NestJS API Server
│   └── frontend/                  # Next.js Web Application
├── PROMPT_Phone_Store_UI.md       # Prompt tham khảo thiết kế UI Phone Store
├── TRIGGER_AI_AUDIT.md            # Kích hoạt quy trình kiểm toán code
├── TRIGGER_GIT_AUDIT.md           # Kích hoạt quy trình kiểm tra Git
├── TRIGGER_Mini_check_file.md     # Kích hoạt kiểm tra nhanh 1 file
└── package.json                   # Root workspace package (husky, commitlint)
```

---

## BACKEND (`e:\PHONE_SHOP_code\my-web\backend`)

### Công nghệ
- **Framework:** NestJS (TypeScript)
- **ORM:** Prisma (PostgreSQL + pgvector)
- **Auth:** JWT (Access Token 15 phút + Refresh Token 7 ngày, HTTP-Only Cookie)
- **AI/LLM:** LangChain + OpenAI API (`gpt-4o` cho chat, `text-embedding-ada-002` cho vector)
- **Cache/Rate Limit:** Redis (In-Memory fallback khi offline)
- **Security:** Helmet, CORS, Global Rate Limiter (CustomThrottlerGuard), RBAC

### Cấu trúc Backend

```
backend/
├── prisma/
│   └── schema.prisma              # Prisma Models (Phone Shop domain)
├── src/
│   ├── main.ts                    # Khởi động app, CORS, Helmet, Guards
│   ├── app.module.ts              # Root module, ThrottlerModule, APP_GUARD
│   ├── app.controller.ts          # Health check endpoint
│   ├── common/                    # Các thành phần dùng chung
│   │   ├── base/                  # BaseDto, BaseService, BaseController
│   │   ├── constants/             # messages.constant.ts, error-codes.constant.ts, enums.constant.ts
│   │   ├── decorators/            # @GetUser(), @Roles()
│   │   ├── exceptions/            # Custom Business Exceptions
│   │   ├── filters/               # AllExceptionsFilter (xử lý lỗi toàn cục)
│   │   ├── guards/                # JwtAuthGuard, JwtAuthOptionalGuard, CustomThrottlerGuard
│   │   ├── i18n/                  # Đa ngôn ngữ (vi/en)
│   │   ├── interceptors/          # Response transform interceptor
│   │   ├── redis/                 # RedisService (Cache, Lock, Rate Limit)
│   │   ├── strategies/            # JWT Strategy (Passport)
│   │   └── utils/                 # BcryptHelper, formatters
│   ├── config/
│   │   └── app.config.ts          # Cấu hình env vars (JWT, DB, Redis, OpenAI)
│   ├── database/
│   │   └── prisma.service.ts      # PrismaService (singleton DB connection)
│   └── modules/                   # Business Modules
│       ├── auth/                  # Đăng ký, Đăng nhập, OTP, Refresh Token, Đổi mật khẩu
│       │   ├── dto/               # login.dto.ts, register.dto.ts
│       │   ├── strategies/        # jwt.strategy.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   └── auth.module.ts
│       ├── user/                  # Hồ sơ người dùng, tìm kiếm, cập nhật avatar
│       ├── admin/                 # Quản trị hệ thống (duyệt sản phẩm, quản lý user)
│       ├── product/               # Quản lý điện thoại, danh mục, tồn kho
│       │   ├── product.controller.ts
│       │   ├── product.service.ts
│       │   └── product.module.ts
│       ├── category/              # Quản lý danh mục sản phẩm (Brand, Type)
│       ├── inventory/             # Quản lý tồn kho, biến thể sản phẩm (màu, dung lượng)
│       ├── order/                 # Tạo đơn hàng, lịch sử mua hàng, trạng thái đơn
│       ├── cart/                  # Giỏ hàng (Cart, CartItem)
│       ├── voucher/               # Quản lý mã giảm giá, điểm thưởng
│       ├── review/                # Đánh giá & bình luận sản phẩm
│       ├── ai/                    # AI Engine (LangChain, OpenAI, Vector Search)
│       │   ├── ai.controller.ts   # Endpoints: /ai/chat, /ai/recommend, /ai/compare
│       │   ├── ai.service.ts      # Orchestrator chính của AI pipeline
│       │   ├── vector.repository.ts # pgvector cosine distance queries
│       │   ├── dto/               # ChatDto, RecommendDto...
│       │   ├── prompts/           # Prompt templates cho LangChain
│       │   └── services/          # Sub-services của AI module:
│       │       ├── intent-detector.service.ts      # Nhận diện ý định người dùng
│       │       ├── product-retrieval.service.ts    # Hybrid search (vector + SQL)
│       │       ├── recommendation.service.ts       # Gợi ý sản phẩm
│       │       ├── compare.service.ts              # So sánh thông số kỹ thuật
│       │       ├── response-generator.service.ts   # Tạo phản hồi LLM structured output
│       │       ├── langchain.service.ts            # LangChain model instances
│       │       ├── openai.service.ts               # Embedding + Circuit Breaker
│       │       └── vector-sync.service.ts          # Đồng bộ embeddings lên pgvector
│       ├── mail/                  # Gửi email OTP, xác thực, thông báo đơn hàng
│       ├── media/                 # Upload ảnh lên Cloudinary
│       ├── notification/          # Thông báo hệ thống + WebSocket Gateway
│       ├── bug-report/            # Báo cáo lỗi từ người dùng
│       └── payment/               # Tích hợp cổng thanh toán (VNPay, Momo)
```

### Prisma Models (Phone Shop Domain)
| Nhóm | Models |
|------|--------|
| **Người dùng** | `User`, `UserProfile` |
| **Sản phẩm** | `Product`, `ProductVariant`, `ProductImage`, `Brand`, `Category` |
| **Tồn kho** | `Inventory`, `InventoryLog` |
| **Giỏ hàng** | `Cart`, `CartItem` |
| **Đơn hàng** | `Order`, `OrderItem`, `OrderStatus` |
| **Khuyến mãi** | `Voucher`, `UserVoucher`, `PointCode` |
| **Đánh giá** | `Review`, `ReviewImage` |
| **AI & Vector** | `AiFeedback`, `EmbeddingLog`, `Conversation`, `Message` |
| **Hệ thống** | `Notification`, `BugReport` |
| **Thanh toán** | `Payment`, `PaymentLog` |

### Phân quyền vai trò (RBAC)
| Role | Quyền hạn |
|------|-----------|
| `CUSTOMER` | Mua hàng, viết đánh giá, dùng AI chatbot, theo dõi đơn hàng |
| `STAFF` | Quản lý đơn hàng, cập nhật tồn kho, hỗ trợ khách hàng |
| `ADMIN` | Quản trị toàn hệ thống, quản lý sản phẩm, báo cáo doanh thu |

---

## FRONTEND (`e:\PHONE_SHOP_code\my-web\frontend`)

### Công nghệ
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Vanilla CSS (`src/index.css`) — KHÔNG dùng Tailwind
- **State:** Zustand (`useAuthStore`, `useToastStore`, `useCartStore`)
- **Icons:** Lucide React
- **Image:** Wrapper `SafeImage.tsx` (next/image + fallback)
- **Font:** Inter / Outfit từ Google Fonts (tích hợp qua CSS `@import`)

### Cấu trúc Frontend

```
frontend/src/
├── app/                           # Next.js App Router (các trang)
│   ├── page.tsx                   # Trang chủ (Product Listing — danh sách điện thoại)
│   ├── layout.tsx                 # Root layout (Providers, Fonts)
│   ├── products/[id]/             # /products/:id — Trang chi tiết sản phẩm
│   ├── cart/                      # /cart — Giỏ hàng & Checkout
│   ├── checkout/                  # /checkout — Xác nhận đơn hàng
│   ├── orders/                    # /orders — Lịch sử đơn hàng
│   ├── orders/[id]/               # /orders/:id — Chi tiết đơn hàng
│   ├── dashboard/                 # /dashboard — Hồ sơ cá nhân
│   ├── admin/                     # /admin — Quản trị hệ thống
│   ├── login/                     # /login — Đăng nhập
│   ├── register/                  # /register — Đăng ký
│   ├── verify-email/              # /verify-email — Xác thực email OTP
│   ├── forgot-password/           # /forgot-password
│   ├── reset-password/            # /reset-password
│   ├── vouchers/                  # /vouchers — Ví voucher của người dùng
│   └── policy/, terms/            # Trang pháp lý
│
├── components/
│   ├── base/                      # Atomic components tái sử dụng
│   │   ├── Button.tsx             # Nút bấm với variants
│   │   ├── Input.tsx              # Ô nhập liệu
│   │   ├── SafeImage.tsx          # Wrapper next/image với onError fallback
│   │   └── ...
│   └── features/                  # Smart components theo tính năng
│       ├── Navbar.tsx             # Thanh điều hướng (logo, search, cart badge, dark mode)
│       ├── Footer.tsx
│       ├── OnboardingModal.tsx    # Modal hoàn thiện hồ sơ lần đầu
│       ├── SettingsSection.tsx    # Cài đặt tài khoản
│       ├── UserDropdown.tsx       # Dropdown menu người dùng
│       ├── admin/                 # Components Admin Dashboard
│       ├── ai/                    # AI Chatbot UI (gợi ý điện thoại)
│       ├── assistive-touch/       # Nút trợ giúp nổi (AssistiveTouch)
│       ├── cart/                  # CartPanel, CartItem, CartSummary
│       │   ├── CartPanel.tsx      # Panel giỏ hàng bên phải
│       │   ├── CartItemRow.tsx    # Dòng sản phẩm trong giỏ
│       │   └── CartSummary.tsx    # Tóm tắt đơn hàng (tạm tính, ship, tổng)
│       ├── product/               # Card sản phẩm, danh sách, grid
│       │   ├── ProductGrid.tsx    # Lưới hiển thị sản phẩm
│       │   ├── ProductCard.tsx    # Card sản phẩm đơn lẻ (accent bar, badge, giá)
│       │   ├── ProductDetail.tsx  # Trang chi tiết sản phẩm
│       │   └── ProductImages.tsx  # Gallery ảnh sản phẩm
│       ├── filter/                # Thanh lọc sản phẩm
│       │   └── FilterSidebar.tsx  # Lọc brand, giá, RAM, màu sắc
│       ├── review/                # Đánh giá sản phẩm
│       ├── order/                 # Lịch sử đơn hàng, chi tiết đơn
│       └── profile/               # Dashboard cá nhân
│
├── constants/
│   ├── labels.ts                  # TOÀN BỘ chuỗi UI tiếng Việt (không hardcode)
│   ├── labels.en.ts               # Bản dịch tiếng Anh
│   ├── limits.constant.ts         # Giới hạn ký tự, số lượng
│   ├── location.constant.ts       # Danh sách tỉnh/thành phố Việt Nam
│   └── product.constant.ts        # Danh sách thương hiệu, RAM, Storage options
│
├── hooks/                         # Custom hooks
│   ├── useAuth.ts                 # Wrapper Zustand auth (login, logout, user info)
│   ├── useCart.ts                 # Quản lý giỏ hàng (thêm, xóa, cập nhật, persist localStorage)
│   ├── useProducts.ts             # Load & filter sản phẩm (search, brand, price, RAM, color)
│   ├── useProductDetail.ts        # Dữ liệu trang chi tiết sản phẩm
│   ├── useOrders.ts               # Lịch sử và chi tiết đơn hàng
│   ├── useAiChat.ts               # Quản lý state AI chat (gợi ý điện thoại)
│   ├── useNotifications.ts        # WebSocket notifications
│   ├── useSettings.ts             # Cài đặt tài khoản
│   └── ...
│
├── services/                      # API Service clients
│   ├── ai.service.ts              # /ai/* — Chat, Recommend, Compare
│   ├── auth.service.ts            # /auth/* — Login, Register, Logout, OTP
│   ├── product.service.ts         # /products/* — Tìm kiếm, chi tiết, danh sách
│   ├── cart.service.ts            # /cart/* — Thêm, xóa, cập nhật giỏ hàng
│   ├── order.service.ts           # /orders/* — Tạo đơn, lịch sử, trạng thái
│   ├── voucher.service.ts         # /vouchers/* — Mã giảm giá
│   ├── review.service.ts          # /reviews/* — Đánh giá sản phẩm
│   ├── user.service.ts            # /users/* — Hồ sơ người dùng
│   ├── payment.service.ts         # /payments/* — Thanh toán
│   └── media.service.ts           # /media/* — Upload ảnh
│
├── data/
│   └── products.ts                # Mock data điện thoại (ít nhất 12 sản phẩm)
│
├── store/                         # Zustand global state
│   ├── useAuthStore.ts            # User session (persist localStorage)
│   ├── useCartStore.ts            # Giỏ hàng global state (persist localStorage)
│   └── useToastStore.ts           # Toast notifications
│
├── lib/
│   └── api-client.ts              # HTTP Client (fetch wrapper, auto refresh token, error handling)
│
├── types/                         # TypeScript interfaces
│   ├── user.ts                    # User, UserRole enum
│   ├── product.ts                 # Product, ProductVariant, Brand, Category, CartItem
│   ├── order.ts                   # Order, OrderItem, OrderStatus
│   └── ...
│
├── providers/
│   └── socket-provider.tsx        # WebSocket context (Socket.io client)
│
├── utils/
│   ├── formatters.ts              # formatCurrency, formatDate, formatNumber
│   └── helpers.ts                 # getValidImageUrl, truncate...
│
└── index.css                      # ~16KB — Design system toàn cục
                                   # CSS Variables, Typography, Components, Dark Mode
```

---

## DESIGN SYSTEM (Vanilla CSS — Apple-Inspired Premium Indigo)

File chính: `src/index.css`

### Bảng màu chính

| Token CSS Variable | Giá trị | Mô tả |
|---|---|---|
| `--color-primary` | `#5E5CE6` | **Indigo-Violet** — accent chính (khác Apple blue `#0071e3`, khác orange cũ) |
| `--color-primary-hover` | `#4B4ACA` | Hover state của nút primary |
| `--color-primary-tint` | `rgba(94,92,230,0.10)` | Nền nhạt cho section highlight |
| `--color-primary-glow` | `rgba(94,92,230,0.25)` | Box-shadow glow cho button CTA |
| `--color-success` | `#34C759` | Apple Green — “Còn hàng” |
| `--color-warning` | `#FF9F0A` | Apple Amber — “Sắp hết” |
| `--color-danger` | `#FF3B30` | Apple Red — Hết hàng / Xóa |

### Nền trang (Light / Dark)

| Token | Light | Dark | Mô tả |
|---|---|---|---|
| `--bg-primary` | `#ffffff` | `#000000` | Nền trang chính (Apple pure) |
| `--bg-secondary` | `#f5f5f9` | `#111114` | Nền section xử màu | 
| `--bg-tertiary` | `#ebebf0` | `#1c1c1f` | Nền phụ sâu hơn |
| `--bg-card` | `#ffffff` | `#1c1c1f` | Nền Card sản phẩm |
| `--bg-elevated` | `#f5f5f9` | `#2c2c2e` | Nền nổi (Modal, Dropdown) |

### Typography

| Token | Light | Dark | Mô tả |
|---|---|---|---|
| `--text-primary` | `#1d1d1f` | `#f5f5f7` | Apple’s exact heading color |
| `--text-secondary` | `#6e6e73` | `#ababaf` | Apple body text |
| `--text-muted` | `#86868b` | `#98989d` | Apple footnote / caption |

### Border & Shadow

| Token | Giá trị | Mô tả |
|---|---|---|
| `--border-color` | `rgba(0,0,0,0.08)` | Biên Apple ultra-subtle |
| `--border-dark` | `rgba(255,255,255,0.10)` | Biên dark mode |
| `--shadow-sm` | `0 4px 16px rgba(0,0,0,0.06)` | Shadow nhẹ như Apple |
| `--shadow-primary` | `0 4px 20px rgba(94,92,230,0.25)` | Glow nút indigo |

### Radius & Spacing

| Token | Giá trị | Áp dụng |
|---|---|---|
| `--radius-3xl` | `24px` | Container lớn, Section |
| `--radius-2xl` | `20px` | Card, Modal (Apple-style) |
| `--radius-xl` | `14px` | Button, Input |
| `--radius-lg` | `8px` | Badge |
| `--radius-full` | `9999px` | Pill / Tag chip |

**Font stack:** `'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`

**Triết lý thiết kế:**
- Tất cả shadow phải cucực nhẹ (Apple không dùng shadow to)
- Viền dùng `rgba` semi-transparent thay vì màu cứng
- Animation cực kỳ tinh tế: `transition: all 0.2s cubic-bezier(0.25,0.46,0.45,0.94)` (Apple easing)
- Hạn chế dùng gradient — Apple 2024+ devolve về flat + subtle depth
- Hover scale tối đa `scale(1.02)`, không scale lớn hơn

**Convention đặt tên class:**
- `.card-container` — Card lớn (radius-2xl, border `--border-color`, shadow-sm)
- `.btn-primary` — Nút chính màu indigo + glow shadow
- `.btn-secondary` — Nút phụ `bg-secondary` + border nhẹ
- `.text-primary` — Văn bản màu `--color-primary` (indigo)
- `.badge-success` — Badge “Còn hàng” Apple Green
- `.badge-warning` — Badge “Sắp hết” Apple Amber
- `.badge-danger` — Badge “Hết hàng” Apple Red
- `.accent-bar` — Thanh dọc 6px `--color-primary` cạnh trái card
- `.pill` — Tag/chip dạng pill (radius-full)
- `.custom-scrollbar` — Scrollbar tùy chỉnh

---
**Design patterns đặc trưng (từ PROMPT_Phone_Store_UI.md):**
| Pattern | Mô tả |
|---------|-------|
| **Accent bar** | Thanh dọc 6px màu primary/emerald ở cạnh trái mỗi card |
| **Rounded 3XL containers** | Container lớn nhất dùng `border-radius: 24px` |
| **Font-black headings** | Tiêu đề luôn dùng `font-weight: 900` |
| **Badge uppercase** | Badge trạng thái luôn UPPERCASE + letter-spacing |
| **Primary/10 bg tints** | Nền tint nhẹ dùng `rgba(primary, 0.1)` cho section highlight |
| **Scale hover** | Hover card dùng `scale(1.01)` thay vì shadow to |

---

## QUY TẮC CODE QUAN TRỌNG

1. **Không hardcode string** — Tất cả text UI phải dùng `LABELS.xxx` từ `constants/labels.ts`
2. **Không dùng `any`** — TypeScript strict mode
3. **Tất cả ảnh qua `SafeImage`** — Không dùng `next/image` trực tiếp
4. **Comment block đầu file** — Mô tả mục đích, file liên quan, design pattern
5. **Localization** — labels.ts (tiếng Việt) + labels.en.ts (tiếng Anh) luôn đồng bộ
6. **Magic values** → constants file
7. **Role check** → dùng `UserRole` enum, không hardcode string `'ADMIN'`
8. **Auth** → `useAuth()` hook, không import store trực tiếp trong components
9. **Cart state** → `useCart()` hook, persist vào localStorage

---

## CÁC FILE QUAN TRỌNG NHẤT

| File | Vai trò |
|------|---------|
| `backend/prisma/schema.prisma` | Toàn bộ DB schema (Phone Shop domain) |
| `backend/src/modules/ai/ai.service.ts` | AI pipeline orchestrator (gợi ý, so sánh điện thoại) |
| `frontend/src/constants/labels.ts` | Toàn bộ UI strings tiếng Việt |
| `frontend/src/lib/api-client.ts` | HTTP client, auto refresh token, error handling |
| `frontend/src/index.css` | Design system toàn cục |
| `frontend/src/components/features/Navbar.tsx` | Navbar chính (logo, search, cart badge, dark mode) |
| `frontend/src/hooks/useCart.ts` | Giỏ hàng state management (persist localStorage) |
| `frontend/src/hooks/useProducts.ts` | Load & filter sản phẩm |
| `frontend/src/data/products.ts` | Mock data 12+ điện thoại mẫu |
| `backend/src/common/guards/custom-throttler.guard.ts` | Rate limiter toàn cục |
| `backend/src/common/redis/redis.service.ts` | Cache/Lock/Rate Limit service |
| `backend/src/modules/product/product.service.ts` | Nghiệp vụ sản phẩm điện thoại |
