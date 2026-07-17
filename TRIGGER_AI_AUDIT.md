# Kích Hoạt Quy Trình Rà Soát Chất Lượng & Bảo Mật Codebase — PHONE_SHOP (AI Code Audit Trigger)

> [!IMPORTANT]
> **CHỈ THỊ CHO TRỢ LÝ AI (AGENT INSTRUCTION):**
> Khi người dùng gửi hoặc tham chiếu tệp tin này, bạn (AI) phải dừng tất cả các công việc khác lại và tiến hành một đợt kiểm toán (Audit) toàn diện {toàn bộ dự án hoặc 1 phần nào đó được yêu cầu} theo đúng các bước dưới đây. Không được bỏ qua bất kỳ bước nào.
>Những lỗi vi phạm cần check kỹ từng file: 
- Vi phạm nghiêm trọng phân tách Logic
- Vi phạm Nguyên lý Đơn trách nhiệm
- Mất an toàn kiểu dữ liệu
- Sử dụng Magic Values & Vi phạm Design System
- Vi phạm khả năng tiếp cận
- Hardcode dữ liệu 
- Thiếu hoặc sai lệch Context
---

## Quy Trình Rà Soát 5 Bước Của AI

### Bước 1: Đọc và nạp toàn bộ cấu hình quy tắc (System Rules)
Bạn bắt buộc phải đọc các file quy tắc và quy ước dưới đây để làm chuẩn đối chiếu:
1. **Quy chuẩn AI:** Tất cả các tệp trong thư mục [.agent/rule/](file:///e:/PHONE_SHOP_code/.agent/rule) và [.agent/workflow/](file:///e:/PHONE_SHOP_code/.agent/workflow).
2. **Quy chuẩn Lập trình viên:** Tất cả các tệp quy ước viết code và git trong [docs/](file:///e:/PHONE_SHOP_code/docs).
3. **Các prompt review mẫu:** Các file review trong thư mục [.check-prompt/](file:///e:/PHONE_SHOP_code/.check-prompt).

### Bước 2: Quét mã nguồn lõi của dự án (Core Codebase Scan)
Bạn cần đọc và phân tích cấu hình cũng như mã nguồn then chốt của cả Frontend và Backend để hiểu kiến trúc hiện tại:
1. **Database Schema:** [schema.prisma](file:///e:/PHONE_SHOP_code/my-web/backend/prisma/schema.prisma) để kiểm tra các Enums, quan hệ và kiểu dữ liệu.
2. **Cấu hình dự án:**
   - [next.config.ts](file:///e:/PHONE_SHOP_code/my-web/frontend/next.config.ts) (Kiểm tra Hostname Whitelist).
   - [package.json](file:///e:/PHONE_SHOP_code/my-web/frontend/package.json) và [package.json](file:///e:/PHONE_SHOP_code/my-web/backend/package.json) (Kiểm tra các phiên bản thư viện dùng).
3. **Lớp bảo mật & Base components:**
   - [SafeImage.tsx](file:///e:/PHONE_SHOP_code/my-web/frontend/src/components/base/SafeImage.tsx)
   - Lớp Router Guard / Auth Guard ở Backend (ví dụ các guard trong `src/common/guards/`).

### Bước 3: Rà soát lỗi (Security & Quality Audit)
Tiến hành đối chiếu mã nguồn để phát hiện:
1. **Lỗi bảo mật (OWASP Top 10):** Lỗi SQL Injection, Broken Access Control, IDOR (kiểm tra quyền sở hữu resource), rò rỉ JWT, cấu hình CORS chưa an toàn.
2. **Lỗi Next.js Image Optimizer:** Bất kỳ file nào sử dụng `next/image` mà chưa chuyển qua `SafeImage` hoặc chưa có cơ chế fallback `onError` khi load ảnh bị 404.
3. **Hardcode & Magic Values:** Các chuỗi vai trò (`role`), địa chỉ URL, cổng kết nối, hoặc các giá trị số cố định chưa được đưa vào constants/config.
4. **Code trùng lặp hoặc vi phạm SOLID/DRY:** Lớp Controller chứa logic nghiệp vụ, service quá lớn, hoặc trùng lặp xử lý logic giữa frontend và backend.
5. **Domain-specific checks:** Logic liên quan đến sản phẩm điện thoại (tồn kho, biến thể màu/dung lượng), giỏ hàng, đơn hàng phải nằm đúng module tương ứng.

### Bước 4: Chấm điểm Codebase (Codebase Scoring)
Dựa theo tiêu chí trong [.check-prompt/](file:///e:/PHONE_SHOP_code/.check-prompt), hãy chấm điểm dự án trên thang điểm 10 ở các mặt:
- Tính Bảo mật (Security)
- Kiến trúc Clean Architecture (Architecture)
- Khả năng mở rộng & Bảo trì (Maintainability)
- Độ hoàn thiện & Trơn tru (Production Readiness)

### Bước 5: Xuất Báo Cáo Rà Soát (Audit Report Output)
Hãy trả về một báo cáo chi tiết bằng **Tiếng Việt** bao gồm:
1. **Danh sách các lỗi phát hiện (phân loại từ Thấp/Trung bình/Cao/Nghiêm trọng):** Ghi rõ tên file, số dòng, nguyên nhân và giải pháp sửa đổi cụ thể.
2. **Điểm số chất lượng codebase hiện tại:** Kèm nhận xét ngắn gọn.
3. **Đề xuất nâng cấp (Action Items):** Các công việc cụ thể cần làm tiếp theo để nâng chất lượng code lên tối đa.
4. **Báo cáo sẽ được viết trong folder .todo ở ngoài cùng:** tạo file mới, ghi ngày tạo chính xác và ghi nội dung audit vào đó
