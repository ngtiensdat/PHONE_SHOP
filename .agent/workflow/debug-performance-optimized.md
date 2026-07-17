# Workflow: Debug & Optimize Performance (Fullstack)

Quy trình tìm kiếm và xử lý các vấn đề về hiệu năng trong dự án FOOD AI.

## 1. Backend: Slow API Detection
1. **Prisma Logging:** Bật `log: ['query']` trong Prisma Service để xem câu lệnh nào chạy chậm.
2. **N+1 Query Check:** Kiểm tra xem có đang gọi query trong vòng lặp không. Nếu có, chuyển sang `findMany` với `in` hoặc `include`.
3. **Database Index:** Đảm bảo các cột hay dùng để `where` hoặc `orderBy` đã được đánh Index (đặc biệt là cột `embedding`).

## 2. Frontend: React Re-render & Hydration
1. **React DevTools:** Sử dụng tab "Profiler" để tìm các Component bị re-render không cần thiết.
2. **Memoization:** Sử dụng `useMemo` cho các tính toán nặng và `useCallback` cho các hàm truyền xuống con.
3. **Optimistic Updates:** Sử dụng `useOptimistic` hoặc thư viện state management để cập nhật UI ngay lập tức trước khi API trả về.

## 3. Next.js Optimization
1. **Streaming:** Tách các phần chậm (như AI Consult) vào `Suspense` boundary.
2. **Image Optimization:** Luôn sử dụng component `next/image` với `priority` cho ảnh banner món ăn.
3. **Dynamic Imports:** Sử dụng `next/dynamic` cho các component nặng (như Chart, Map) để giảm kích thước bundle ban đầu.
