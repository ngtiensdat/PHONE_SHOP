frontend/
├── public/                 # Tài nguyên tĩnh không qua build (favicon, robots.txt, ảnh landing page)
│
├── src/
│   ├── app/                # Next.js App Router (Định nghĩa routing)
│   │   ├── page.tsx                   # Trang chủ — Danh sách điện thoại (Product Listing)
│   │   ├── layout.tsx                 # Root layout (Providers, Font, Metadata)
│   │   ├── products/[id]/
│   │   │   └── page.tsx               # Trang chi tiết sản phẩm (Product Detail)
│   │   ├── cart/
│   │   │   └── page.tsx               # Trang giỏ hàng (Cart)
│   │   ├── checkout/
│   │   │   └── page.tsx               # Trang xác nhận đơn hàng (Checkout)
│   │   ├── orders/
│   │   │   ├── page.tsx               # Lịch sử đơn hàng
│   │   │   └── [id]/page.tsx          # Chi tiết đơn hàng
│   │   ├── dashboard/                 # Hồ sơ cá nhân, đổi mật khẩu
│   │   ├── admin/                     # Quản trị hệ thống
│   │   ├── login/                     # Đăng nhập
│   │   ├── register/                  # Đăng ký
│   │   ├── verify-email/              # Xác thực email OTP
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   ├── vouchers/                  # Ví voucher của người dùng
│   │   └── policy/, terms/            # Trang pháp lý
│   │
│   ├── components/         # Chứa các component giao diện
│   │   ├── base/           # Các component base tự custom
│   │   │   ├── Button.tsx             # Nút bấm với variants (primary, secondary, danger)
│   │   │   ├── Input.tsx              # Ô nhập liệu
│   │   │   └── SafeImage.tsx          # Wrapper next/image với onError fallback
│   │   └── features/       # Component theo nghiệp vụ
│   │       ├── Navbar.tsx             # Navbar (logo, search bar, cart badge, dark mode toggle)
│   │       ├── Footer.tsx
│   │       ├── OnboardingModal.tsx
│   │       ├── SettingsSection.tsx
│   │       ├── UserDropdown.tsx
│   │       ├── admin/                 # Components Admin Dashboard (quản lý sản phẩm, đơn hàng)
│   │       ├── ai/                    # AI Chatbot UI (gợi ý & so sánh điện thoại)
│   │       ├── assistive-touch/       # Nút trợ giúp nổi
│   │       ├── product/               # Components liên quan đến sản phẩm
│   │       │   ├── ProductGrid.tsx    # Lưới sản phẩm (responsive: 1/2/3/4 cột)
│   │       │   ├── ProductCard.tsx    # Card sản phẩm (accent bar, badge, giá, nút thêm giỏ)
│   │       │   ├── ProductDetail.tsx  # Chi tiết sản phẩm (gallery, thông số, đánh giá)
│   │       │   └── ProductImages.tsx  # Gallery ảnh sản phẩm
│   │       ├── filter/                # Thanh lọc sản phẩm
│   │       │   └── FilterSidebar.tsx  # Lọc: thương hiệu, khoảng giá, RAM, màu sắc
│   │       ├── cart/                  # Components giỏ hàng
│   │       │   ├── CartPanel.tsx      # Panel giỏ hàng (tóm tắt đơn hàng)
│   │       │   ├── CartItemRow.tsx    # Hàng sản phẩm trong giỏ (ảnh, tên, số lượng, xóa)
│   │       │   └── CartSummary.tsx    # Tóm tắt giá (tạm tính, ship, voucher, tổng)
│   │       ├── review/                # Đánh giá sản phẩm (star rating, danh sách review)
│   │       ├── order/                 # Lịch sử & chi tiết đơn hàng
│   │       └── profile/               # Dashboard cá nhân
│   │
│   ├── hooks/              # Custom React Hooks
│   │   ├── useAuth.ts                 # Wrapper Zustand auth (login, logout, user info)
│   │   ├── useCart.ts                 # Quản lý giỏ hàng (thêm, xóa, cập nhật, persist localStorage)
│   │   ├── useProducts.ts             # Load & filter sản phẩm (search, brand, price, RAM, color, sort)
│   │   ├── useProductDetail.ts        # Dữ liệu trang chi tiết sản phẩm
│   │   ├── useOrders.ts               # Lịch sử và chi tiết đơn hàng
│   │   ├── useAiChat.ts               # Quản lý state AI chat (gợi ý điện thoại)
│   │   ├── useNotifications.ts        # WebSocket notifications
│   │   ├── useSettings.ts             # Cài đặt tài khoản
│   │   └── useGeolocation.ts          # Lấy vị trí GPS (gợi ý cửa hàng gần nhất)
│   │
│   ├── services/           # Các hàm gọi API đến backend
│   │   ├── ai.service.ts              # /ai/* — Chat, Recommend, Compare
│   │   ├── auth.service.ts            # /auth/* — Login, Register, Logout, OTP
│   │   ├── product.service.ts         # /products/* — Tìm kiếm, chi tiết, danh sách
│   │   ├── cart.service.ts            # /cart/* — Thêm, xóa, cập nhật giỏ hàng
│   │   ├── order.service.ts           # /orders/* — Tạo đơn, lịch sử, trạng thái
│   │   ├── voucher.service.ts         # /vouchers/* — Mã giảm giá
│   │   ├── review.service.ts          # /reviews/* — Đánh giá sản phẩm
│   │   ├── user.service.ts            # /users/* — Hồ sơ người dùng
│   │   ├── payment.service.ts         # /payments/* — Thanh toán
│   │   └── media.service.ts           # /media/* — Upload ảnh
│   │
│   ├── data/
│   │   └── products.ts                # Mock data 12+ điện thoại (Apple, Samsung, Xiaomi...)
│   │
│   ├── store/              # Global State (Zustand)
│   │   ├── useAuthStore.ts            # User session (persist localStorage)
│   │   ├── useCartStore.ts            # Giỏ hàng global (persist localStorage)
│   │   └── useToastStore.ts           # Toast notifications
│   │
│   ├── types/              # Định nghĩa TypeScript
│   │   ├── user.ts                    # User, UserRole enum (CUSTOMER | STAFF | ADMIN)
│   │   ├── product.ts                 # Product, ProductVariant, Brand, Category, CartItem
│   │   └── order.ts                   # Order, OrderItem, OrderStatus enum
│   │
│   ├── lib/
│   │   └── api-client.ts              # HTTP Client (fetch wrapper, auto refresh token, error handling)
│   │
│   ├── providers/
│   │   └── socket-provider.tsx        # WebSocket context (Socket.io client)
│   │
│   ├── utils/
│   │   ├── formatters.ts              # formatCurrency (VND), formatDate, formatNumber
│   │   └── helpers.ts                 # getValidImageUrl, truncate, calculateDiscount
│   │
│   ├── constants/
│   │   ├── labels.ts                  # TOÀN BỘ chuỗi UI tiếng Việt (không hardcode trong JSX)
│   │   ├── labels.en.ts               # Bản dịch tiếng Anh (đồng bộ với labels.ts)
│   │   ├── limits.constant.ts         # Giới hạn ký tự, số lượng
│   │   ├── location.constant.ts       # Danh sách tỉnh/thành phố Việt Nam
│   │   └── product.constant.ts        # BRANDS list, RAM_OPTIONS, STORAGE_OPTIONS, COLORS
│   │
│   ├── schemas/            # Validators frontend (Zod)
│   │   ├── auth.schema.ts             # Login, Register validation
│   │   └── checkout.schema.ts         # Checkout form validation
│   │
│   └── index.css           # Global CSS — Design system toàn cục
│                            # CSS Variables, Typography, Components, Dark Mode
│
├── eslint.config.mjs          # ESLint config (strict, no hardcode, no magic values, no any)
├── .prettierrc                # Format code chuẩn chung
├── next.config.ts             # Next.js config (hostname whitelist Cloudinary, picsum, ...)
├── tsconfig.json              # TypeScript strict mode
├── package.json
└── .env                       # Biến môi trường (NEXT_PUBLIC_API_URL, ...)