# Skill: Prisma Schema Mastery (Food AI Foundation)

## 1. Overview
Kỹ năng này giúp Agent thiết kế Database Schema chuẩn mực, hỗ trợ tốt nhất cho cả tìm kiếm Vector (RAG) và các tính năng mạng xã hội phức tạp.

## 2. Best Practices
- **Strict Typing:** Luôn sử dụng `Enum` cho các trường trạng thái (Status, Role, Category).
- **Vector Integration:** Sử dụng `Unsupported("vector(1536)")` để hỗ trợ 
PostgreSQL.
- **Relational Integrity:** Thiết lập `onDelete: Cascade` hoặc `onDelete: SetNull` một cách có tính toán.
- **Indexes:** Luôn thêm `@index` cho các cột thường xuyên được tìm kiếm (slug, name, restaurantId).

## 3. Social Engineering in Schema
- **Counters:** Lưu trữ các biến đếm (`likeCount`, `followerCount`) trực tiếp trong Model cha để tối ưu tốc độ đọc (như Facebook).
- **Idempotency:** Sử dụng `@@unique([userId, foodId])` cho bảng Like/Follow để tránh dữ liệu trùng lặp.

## 4. Advanced Patterns

### 4.1. Soft Delete Pattern
Sử dụng trường `deletedAt DateTime?` thay vì xóa thật dữ liệu để bảo vệ tính toàn vẹn của Graph.

### 4.2. PGVector Field (Prisma 7+)
```prisma
model Food {
  id        Int      @id @default(autoincrement())
  name      String
  embedding Unsupported("vector(1536)")? // Cột lưu trữ vector nhúng
  
  @@index([embedding], map: "food_embedding_idx")
}
```

## 5. Migration Strategy
- Luôn kiểm tra file `migration.sql` sau khi chạy `prisma migrate dev` để đảm bảo các thay đổi đặc biệt (như vector) được áp dụng đúng.

## Checklist
- [ ] Các trạng thái đã được dùng Enum chưa?
- [ ] Đã có Unique constraint cho các bảng liên kết (Like/Follow) chưa?
- [ ] Các cột thường xuyên Search đã được đánh Index chưa?
- [ ] Cấu trúc Schema có dễ dàng mở rộng cho các tính năng AI sau này không?
