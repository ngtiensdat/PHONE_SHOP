# Rule: Quy chuẩn quản lý nhánh Git & Commit (Git Branching & Commit Standard)

> [!IMPORTANT]
> **CHỈ THỊ CHO TRỢ LÝ AI:**
> Bạn phải tuân thủ nghiêm ngặt quy trình làm việc Git Flow và định dạng commit đã được thống nhất tại tài liệu quy chuẩn của dự án:
> 👉 **[docs/](file:///e:/PHONE_SHOP_code/docs)** — Tài liệu quy chuẩn Git của dự án.

---

## 1. Đặt tên nhánh (Branch Naming)
- Sử dụng các loại tiền tố sau: `feature/` (tính năng mới), `bugfix/` (sửa lỗi), `hotfix/` (lỗi khẩn cấp), `refactor/` (đổi cấu trúc code), `docs/` (tài liệu).
- Tên nhánh phải viết thường, ngắn gọn, phân cách bằng dấu gạch ngang `-`.
- *Ví dụ:* `feature/auth-google`, `bugfix/fix-image-crash`.

---

## 2. Viết Commit Message (Conventional Commits)
Mọi commit của bạn hoặc do bạn gợi ý cho lập trình viên PHẢI bắt đầu bằng một trong các tiền tố chuẩn sau (có thể viết bằng Tiếng Việt):
- **`feat:`** Thêm tính năng mới (ví dụ: `feat: thêm API đăng ký tài khoản`)
- **`fix:`** Sửa bug (ví dụ: `fix: chữa lỗi crash hiển thị avatar`)
- **`refactor:`** Tách cấu trúc code, tối ưu hóa (ví dụ: `refactor: chuyển Image sang SafeImage`)
- **`docs:`** Sửa comment, README (ví dụ: `docs: cập nhật hướng dẫn setup database`)
- **`chore:`** Đổi cấu trúc build, cài thư viện (ví dụ: `chore: nâng cấp prisma lên v7`)
- **`style:`** Định dạng code, chạy Prettier (ví dụ: `style: format lại code frontend`)

*Cú pháp chuẩn:* `<tiền tố>: <mô tả ngắn gọn bằng tiếng Việt hoặc tiếng Anh>`

---

## 3. Pull Request & Hợp nhất (Pull Request & Merge)
- **PR Cơ sở:** Tất cả các Pull Request của nhánh feature phải được so sánh và merge vào nhánh `develop` trước khi đưa lên `main`.
- **Squash Merge:** Khi merge nhánh từ `develop` vào `main`, sử dụng tính năng Squash Merge để biến nhiều commit nhỏ thành 1 commit duy nhất mang tính cột mốc, giúp giữ nhánh `main` luôn sạch.

---

## 4. Tự động hóa & An toàn (Automation & Safety)
- **CẤM:** Không bao giờ tự ý sử dụng tham số Force Push (`--force` hoặc `-f`) lên bất kỳ nhánh nào.
- **Duyệt trước:** Phải liệt kê danh sách tệp thay đổi và nội dung diff tóm tắt cho lập trình viên duyệt trước khi thực hiện commit/push.

---

## AI Checklist kiểm tra trước khi kết thúc
- [ ] Tên nhánh hiện tại đã tuân thủ định dạng `feature/` hay `bugfix/` chưa?
- [ ] Commit message đã có prefix chuẩn (`feat:`, `fix:`, `refactor:`,...) chưa?
- [ ] Đã kiểm tra trạng thái file bằng `git status` trước khi push chưa?
- [ ] PR đã được mô tả chi tiết các phần thay đổi để reviewer dễ theo dõi chưa?
