# Báo Cáo Rà Soát Chất Lượng & Bảo Mật Codebase — Sóc Mobile (2026-07-17)

Báo cáo được khởi chạy tự động theo chỉ thị từ [TRIGGER_AI_AUDIT.md](file:///e:/PHONE_SHOP_code/TRIGGER_AI_AUDIT.md) nhằm phân tích chất lượng mã nguồn, độ hoàn thiện kiến trúc, hiệu năng và bảo mật hệ thống.

---

## 1. Điểm Số Chất Lượng Codebase

| Tiêu chí | Điểm số (1-10) | Nhận xét ngắn gọn |
| :--- | :---: | :--- |
| **Bảo mật (Security)** | **9.5 / 10** | Password hashing (Bcrypt), JWT Auth Guard, Rate Limiting (Throttler), CORS, Helmet và Cookie HttpOnly được thiết lập tốt. Đã loại bỏ chuỗi fallback bảo mật của jwt.strategy. |
| **Kiến trúc (Architecture)** | **8.5 / 10** | Tách biệt các lớp rõ ràng (Controllers, Services, Prisma). Trích xuất tốt các UI components động (`CountdownTimer`, `ProductFilters`). |
| **Khả năng Bảo trì (Maintainability)** | **9.0 / 10** | Đã dọn dẹp các mã cứng (magic values) và đưa vào `LABELS` & `APP_CONFIG`. Đã giải quyết trùng lặp logic refresh token (DRY). |
| **Độ hoàn thiện (Production Readiness)** | **8.0 / 10** | Phần khung lõi (Core/Auth) đã hoàn thiện các sửa lỗi bảo mật & vận hành. Dự án đang tiếp tục triển khai các module nghiệp vụ. |

---

## 2. Danh Sách Lỗi Phát Hiện & Kết Quả Xử Lý

### 🟢 ĐÃ KHẮC PHỤC: Lỗi Định Dạng Lớp Ngoại Lệ (Exception Format Mismatch)
* **Vị trí:** [all-exceptions.filter.ts](file:///e:/PHONE_SHOP_code/my-web/backend/src/common/filters/all-exceptions.filter.ts)
* **Giải pháp đã thực hiện:** Phẳng hóa thông điệp lỗi trong `AllExceptionsFilter` giúp frontend nhận về dạng `string | string[]` chuẩn xác, chấm dứt hoàn toàn lỗi hiển thị `[object Object]` trên UI toast khi DTO validation thất bại.

### 🟢 ĐÃ KHẮC PHỤC: Thiếu Whitelist Hostname Của Image Optimizer
* **Vị trí:** [next.config.ts](file:///e:/PHONE_SHOP_code/my-web/frontend/next.config.ts)
* **Giải pháp đã thực hiện:** Thêm các tên miền `cdn.tgdd.vn` và `cdnv2.tgdd.vn` vào danh sách whitelist `remotePatterns` để kích hoạt Next.js Image Optimization đầy đủ, tăng hiệu năng tải trang.

### 🟢 ĐÃ KHẮC PHỤC: Rò Rỉ Kết Nối Cơ Sở Dữ Liệu (Postgres Connection Pool Leak)
* **Vị trí:** [prisma.service.ts](file:///e:/PHONE_SHOP_code/my-web/backend/src/database/prisma.service.ts)
* **Giải pháp đã thực hiện:** Gắn `Pool` thành thuộc tính của class `PrismaService` và gọi đóng pool tường minh `await this.pool.end()` trong `onModuleDestroy()` để giải phóng kết nối khi NestJS restarts.

### 🟡 LỖI TRUNG BÌNH (MEDIUM): Thiếu Logic Đồng Bộ Giỏ Hàng Khách & Tài Khoản (Guest Cart Synchronization Flaw)
* **Vị trí:** [useCart.ts](file:///e:/PHONE_SHOP_code/my-web/frontend/src/hooks/useCart.ts) kết hợp [useAuth.ts](file:///e:/PHONE_SHOP_code/my-web/frontend/src/hooks/useAuth.ts)
* **Nguyên nhân:** Giao diện mua sắm hỗ trợ khách mua hàng lưu giỏ hàng tạm thời thông qua middleware `persist` của Zustand lưu vào `localStorage`. Tuy nhiên, khi khách thực hiện Đăng nhập (`login`) thành công, hệ thống chưa tự động merge giỏ hàng local với database của User.
* **Tình trạng:** Sẽ được hiện thực hóa đồng bộ khi xây dựng module giỏ hàng đầy đủ ở backend (`CartModule` - Planned).

### 🟢 ĐÃ KHẮC PHỤC: Trùng Lặp Logic Silent Token Refresh (DRY Violation)
* **Vị trí:** [api-client.ts](file:///e:/PHONE_SHOP_code/my-web/frontend/src/lib/api-client.ts) và [useAuth.ts](file:///e:/PHONE_SHOP_code/my-web/frontend/src/hooks/useAuth.ts)
* **Giải pháp đã thực hiện:** Đã export hàm `handleRefreshToken()` tập trung từ `api-client.ts` và tái sử dụng trực tiếp trong `useAuth.ts` hook, triệt tiêu code trùng lặp.

### 🟢 ĐÃ KHẮC PHỤC: Chuỗi Fallback Bảo Mật Nhạy Cảm (Sensitive Security Fallback)
* **Vị trí:** [jwt.strategy.ts](file:///e:/PHONE_SHOP_code/my-web/backend/src/common/strategies/jwt.strategy.ts)
* **Giải pháp đã thực hiện:** Loại bỏ chuỗi mật khóa fallback cố định và cấu hình chương trình tự dừng khởi động (fail-fast) nếu không tìm thấy JWT secret trong môi trường để tránh rủi ro bảo mật.

---

## 3. Điểm Mạnh Nhất Của Codebase (Biggest Strengths)
1. **Kiến trúc phân lớp chuẩn mực:** Cấu trúc NestJS được tổ chức chuyên nghiệp. Phân tách tốt mã nguồn giữa logic nghiệp vụ (Service), database (Prisma) và giao diện điều hướng (Controller).
2. **Quy chuẩn Không Hardcode xuất sắc:** Việc chuyển đổi các nhãn thương hiệu và đường dẫn sang `LABELS` và `APP_CONFIG` giúp hệ thống dễ dàng thay đổi cấu hình mà không làm ảnh hưởng đến mã nguồn cốt lõi.
3. **Bảo mật mặc định tốt:** Sử dụng HTTP-Only cookies cho refresh token giúp ngăn chặn hoàn toàn nguy cơ tấn công XSS chiếm đoạt phiên đăng nhập.

---

## 4. Các Công Việc Cần Thực Hiện Tiếp Theo (Action Items)
1. **Scaffolding các module nghiệp vụ** (Product, Category, Cart, Order, Inventory) ở cả frontend & backend để hoàn thiện chức năng hệ thống.
2. **Hiện thực hóa logic đồng bộ giỏ hàng** khách vãng lai thành giỏ hàng tài khoản khi hoàn thiện CartModule.
