# Quy Trình Rà Soát Trước Khi Đẩy Code — PHONE_SHOP (Git Pre-Commit / Pre-Push Audit Trigger)

> [!IMPORTANT]
> **CHỈ THỊ CHO TRỢ LÝ AI (AGENT INSTRUCTION):**
> Khi người dùng gửi hoặc tham chiếu tệp tin này (`@TRIGGER_GIT_AUDIT.md` và `.github/ci-cd.yml`), bạn (AI) phải lập tức dừng các tác vụ khác và thực hiện quy trình kiểm tra chất lượng mã nguồn nghiêm ngặt dưới đây đối với các tệp tin đang được chỉnh sửa tại nhánh hiện tại (chỉ các file đang được thay đổi, trừ khi có lệnh đặc biệt để kiểm tra toàn bộ dự án) (staged hoặc unstaged) trước khi người dùng đẩy code lên Git.
> Tuyệt đối không tự ý add . hay commit , chỉ được gợi ý là sẽ commit gì
---

## Các Bước AI Cần Thực Hiện

### Bước 1: Quét các tệp tin có thay đổi (Git Diff Scan)
1. Thực hiện lệnh `git status` và `git diff` để xác định chính xác danh sách các tệp tin đang có thay đổi trong thư mục làm việc.
2. Tập trung phân tích nội dung code mới được thêm vào hoặc chỉnh sửa trong các tệp này.

### Bước 2: Kiểm tra các lỗi định dạng & Cú pháp (Lỗi Định dạng & ESLint)
không được để lỗi:  eslint --config my-web/backend/eslint.config.mjs --fix
Rà soát kỹ lưỡng các lỗi sau trong phần code thay đổi:
1. **Lỗi Dòng trống dư thừa (Empty Lines - eline):** 
   - Không được xuất hiện 2 dòng trống liên tiếp trở lên trong thân code.
   - Cuối mỗi tệp tin bắt buộc phải có chính xác 1 dòng trống kết thúc (newline), không được có nhiều dòng trống thừa ở cuối file.
2. **Lỗi ESLint & Type-Safety:**
   - Tìm và loại bỏ các import không sử dụng (unused imports) hoặc biến không sử dụng (unused variables).
   - Tuyệt đối không sử dụng kiểu `any` trong TypeScript. Phải định nghĩa kiểu rõ ràng cho props, state và tham số hàm.
3. **Hardcode & Magic Values:**
   - Toàn bộ chuỗi văn bản hiển thị trên giao diện (UI text) bắt buộc phải sử dụng hằng số `LABELS` từ `@/constants/labels`.
   - Các giá trị trạng thái, vai trò hệ thống phải sử dụng Enum chuẩn của hệ thống (ví dụ: `UserStatus`, `UserRole`).

### Bước 3: Kiểm tra cấu trúc & Kiến trúc mã nguồn
1. **Frontend:** Không lồng logic nghiệp vụ hoặc gọi API trực tiếp trong UI Component. Tách biệt hoàn toàn qua Custom Hooks.
2. **Backend:** Logic nghiệp vụ phải nằm trong Service, không viết logic xử lý phức tạp trong Controller. Xử lý bất đồng bộ kết nối bên thứ ba nằm ngoài Database Transaction để tránh deadlock.
3. **Header Comments:** Đảm bảo tất cả các file mã nguồn mới hoặc được sửa đổi đều có khối bình luận JSDoc ở dòng đầu tiên để giải thích mục đích, chức năng cốt lõi và các biến đặc biệt.

### Bước 4: Kiểm tra khả năng biên dịch (Build & Type Check)
1. Đảm bảo chạy thử typecheck ở thư mục có thay đổi (ví dụ `npx tsc --noEmit` ở frontend hoặc backend) để chắc chắn không có lỗi compile.

### Bước 5: Kiểm tra thông điệp Commit (Conventional Commits)
1. Đọc và đối chiếu thông điệp commit dự kiến của người dùng với tiêu chuẩn tại [docs/](file:///e:/PHONE_SHOP_code/docs).
2. Định dạng bắt buộc: `<type>(<scope>): <mô tả chi tiết bằng tiếng Việt hoặc tiếng Anh>`
   *(Ví dụ chuẩn: `feat(product): thêm trang chi tiết sản phẩm và gallery ảnh`)*

---

## Định Dạng Báo Cáo Trả Về (Audit Report Output)

Sau khi hoàn tất rà soát, trả về kết quả bằng **Tiếng Việt** theo cấu trúc sau:

### 1. Trạng thái Sẵn sàng (Push Readiness Status)
* Hiển thị: **[HOÀN TOÀN SẴN SÀNG]** hoặc **[CẦN KHẮC PHỤC TRƯỚC KHI PUSH]**.

### 2. Chi tiết kết quả rà soát
* **Lỗi định dạng (Empty Lines / Whitespace):** [Đạt / Cần sửa dòng thứ X...]
* **Lỗi Type-Safety & ESLint (any / unused):** [Đạt / Chi tiết lỗi...]
* **Lỗi Hardcode & Magic values:** [Đạt / Chi tiết...]
* **Khả năng Biên dịch (TypeScript Compile):** [Thành công / Thất bại...]
* **Thông điệp Commit:** [Hợp lệ / Gợi ý sửa đổi...]

### 3. Đề xuất Refactor nhanh (nếu có)
* Cung cấp trực tiếp các đoạn code được refactor sạch sẽ để người dùng sao chép hoặc cho phép AI tự động áp dụng.
