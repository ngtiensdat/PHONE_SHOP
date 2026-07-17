# Rule: Documentation-First (Strict Version)

## Description
Documentation is the primary output. You are FORBIDDEN from modifying any source code in `my-web/` until the corresponding documentation in `documents/` has been updated and APPROVED by the user.

## Guidelines

### 1. The "Read-First" Requirement
- Trước khi tạo mới, bạn PHẢI truy cập folder `documents/` để đọc toàn bộ tài liệu liên quan nhằm đảm bảo tính kế thừa và tránh trùng lặp.

### 2. Documentation as a Contract
- Tài liệu trong `documents/` đóng vai trò là một bản "Hợp đồng" giữa AI và Người dùng. Nếu code không giống tài liệu = Lỗi.

### 3. Immediate Synchronization
- Bất kỳ thay đổi kỹ thuật nào phát sinh trong lúc code phải được cập nhật vào tài liệu TRƯỚC KHI thực hiện lệnh `write_to_file` cho code.

## Workflow Integration (The Golden Protocol)

1. **DISCOVER:** Read existing files in `documents/` to understand context.
2. **PLAN:** Use `Core Reasoning Rule` to create a technical plan.
3. **DOCUMENT:** Write/Update the plan into `documents/`. **(Dừng lại ở đây)**
4. **APPROVAL:** Present the document changes to the user and WAIT for a "GO" signal.
5. **IMPLEMENT:** Only after approval, begin coding in `my-web/`.
6. **VERIFY & SYNC:** Re-read the code and the document to ensure 100% synchronization before finishing.

## Checklist (Strict)
- [ ] Đã đọc hết tài liệu cũ chưa?
- [ ] Developer đã gật đầu (GO) với tài liệu mới chưa?
- [ ] Có dòng code nào "đi chệch" khỏi tài liệu không?
