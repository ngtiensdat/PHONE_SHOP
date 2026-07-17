backend/
├── src/
│   ├── main.ts                       # Entry point (Khởi tạo app, setup Global Pipes/Filters/Swagger)
│   ├── app.module.ts                 # Root Module (Gắn kết mọi thứ lại với nhau)
│   │
│   ├── common/                       # [TẦNG DÙNG CHUNG] (Cross-cutting concerns)
│   │   ├── base/                     # Các class chung để tái sử dụng
│   │   │   ├── base.dto.ts           # PaginationDto, ApiResponseDto
│   │   │   ├── base.service.ts       # Abstract Class định nghĩa sẵn CRUD bằng Generics
│   │   │   └── base.controller.ts    # Abstract Controller định nghĩa sẵn GET, POST, PUT, DELETE
│   │   ├── constants/                # Hằng số (Messages, ErrorCodes, Enums)
│   │   ├── decorators/               # Custom Decorators (VD: @CurrentUser(), @Roles())
│   │   ├── exceptions/               # Custom Exceptions (Business exceptions)
│   │   ├── filters/                  # Bắt lỗi toàn cục (AllExceptionsFilter)
│   │   ├── guards/                   # Chắn cổng bảo mật (JwtAuthGuard, RolesGuard, CustomThrottlerGuard)
│   │   ├── interceptors/             # Ghi log request, biến đổi Response cho đồng nhất
│   │   ├── i18n/                     # Chứa các text đa ngôn ngữ (vi/en)
│   │   ├── redis/                    # RedisService (Cache, Lock, Rate Limit)
│   │   └── utils/                    # Các hàm tiện ích (BcryptHelper, DateHelper)
│   │
│   ├── config/                       # Cấu hình môi trường (Load từ .env)
│   │   └── app.config.ts             # JWT, DB, Redis, OpenAI, Cloudinary, Payment config
│   │
│   ├── database/                     # Cấu hình kết nối DB
│   │   └── prisma.service.ts         # Khởi tạo Prisma Client để chọc xuống DB
│   │
│   └── modules/                      # [TẦNG NGHIỆP VỤ LÕI] - Gói theo Feature
│       │
│       ├── auth/                     # Module Đăng nhập / Phân quyền
│       │   ├── dto/                  # login.dto.ts, register.dto.ts
│       │   ├── strategies/           # jwt.strategy.ts (Xác thực token)
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   └── auth.module.ts
│       │
│       ├── user/                     # Module Quản lý Người dùng
│       │   ├── dto/                  # update-profile.dto.ts
│       │   ├── user.controller.ts    # [Kế thừa BaseController]
│       │   ├── user.service.ts       # [Kế thừa BaseService]
│       │   └── user.module.ts
│       │
│       ├── product/                  # Module Quản lý Điện thoại
│       │   ├── dto/                  # create-product.dto.ts, update-product.dto.ts, filter-product.dto.ts
│       │   ├── product.controller.ts # Endpoints: /products (list, detail, search)
│       │   ├── product.service.ts    # Logic sản phẩm (search, filter, sort, pagination)
│       │   └── product.module.ts
│       │
│       ├── category/                 # Module Quản lý Danh mục & Thương hiệu
│       │   ├── dto/                  # create-category.dto.ts, create-brand.dto.ts
│       │   ├── category.controller.ts
│       │   ├── category.service.ts
│       │   └── category.module.ts
│       │
│       ├── inventory/                # Module Quản lý Tồn kho & Biến thể
│       │   ├── dto/                  # update-inventory.dto.ts, create-variant.dto.ts
│       │   ├── inventory.controller.ts
│       │   ├── inventory.service.ts  # Theo dõi tồn kho từng biến thể (màu + dung lượng)
│       │   └── inventory.module.ts
│       │
│       ├── cart/                     # Module Giỏ hàng
│       │   ├── dto/                  # add-to-cart.dto.ts, update-cart-item.dto.ts
│       │   ├── cart.controller.ts    # Endpoints: /cart (get, add, update, remove)
│       │   ├── cart.service.ts
│       │   └── cart.module.ts
│       │
│       ├── order/                    # Module Đơn hàng
│       │   ├── dto/                  # create-order.dto.ts, update-order-status.dto.ts
│       │   ├── order.controller.ts   # Endpoints: /orders (create, list, detail, cancel)
│       │   ├── order.service.ts      # Logic tạo đơn, trừ tồn kho, gửi mail xác nhận
│       │   └── order.module.ts
│       │
│       ├── voucher/                  # Module Mã giảm giá & Điểm thưởng
│       │   ├── dto/                  # apply-voucher.dto.ts
│       │   ├── voucher.controller.ts
│       │   ├── voucher.service.ts
│       │   └── voucher.module.ts
│       │
│       ├── review/                   # Module Đánh giá Sản phẩm
│       │   ├── dto/                  # create-review.dto.ts
│       │   ├── review.controller.ts  # Endpoints: /reviews (CRUD, rating summary)
│       │   ├── review.service.ts
│       │   └── review.module.ts
│       │
│       ├── payment/                  # Module Thanh toán (VNPay, Momo)
│       │   ├── dto/                  # create-payment.dto.ts
│       │   ├── payment.controller.ts # Endpoints: /payments, /payments/callback
│       │   ├── payment.service.ts    # Tích hợp cổng thanh toán
│       │   └── payment.module.ts
│       │
│       ├── ai/                       # Module AI Engine
│       │   ├── ai.controller.ts      # Endpoints: /ai/chat, /ai/recommend, /ai/compare
│       │   ├── ai.service.ts         # Orchestrator pipeline AI
│       │   ├── vector.repository.ts  # pgvector cosine distance queries
│       │   ├── dto/                  # ChatDto, RecommendDto, CompareDto
│       │   ├── prompts/              # Prompt templates cho LangChain
│       │   └── services/             # Sub-services:
│       │       ├── intent-detector.service.ts      # Nhận diện ý định người dùng
│       │       ├── product-retrieval.service.ts    # Hybrid search (vector + SQL)
│       │       ├── recommendation.service.ts       # Gợi ý điện thoại phù hợp
│       │       ├── compare.service.ts              # So sánh thông số kỹ thuật
│       │       ├── response-generator.service.ts   # Tạo phản hồi LLM structured output
│       │       ├── langchain.service.ts            # LangChain model instances
│       │       ├── openai.service.ts               # Embedding + Circuit Breaker
│       │       └── vector-sync.service.ts          # Đồng bộ embeddings lên pgvector
│       │
│       ├── mail/                     # Module Gửi Email (OTP, xác nhận đơn, thông báo)
│       ├── media/                    # Module Upload Ảnh (Cloudinary)
│       ├── notification/             # Module Thông báo + WebSocket Gateway
│       ├── bug-report/               # Module Báo cáo lỗi
│       └── admin/                    # Module Quản trị (Dashboard, thống kê doanh thu)
│
├── prisma/                           # TẦNG DATABASE (Prisma ORM)
│   ├── schema.prisma                 # Khai báo cấu trúc bảng CSDL (Phone Shop Domain)
│   └── migrations/                   # Lịch sử thay đổi DB
│
├── .env                              # Biến môi trường (DB, JWT, Redis, OpenAI, Cloudinary)
├── nest-cli.json                     # Cấu hình của Nest CLI
├── package.json
├── eslint.config.mjs                 # ESLint config (strict mode)
├── .prettierrc
├── .gitignore
└── tsconfig.json                     # (Bật strict mode)