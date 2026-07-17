# Skill: Vector Search RAG (High Performance)

## 1. Overview
Kỹ năng này cho phép Agent thực hiện tìm kiếm ngữ nghĩa (Semantic Search) trên dữ liệu thực phẩm, giúp AI hiểu được các yêu cầu trừu tượng của người dùng thay vì chỉ tìm theo từ khóa chính xác.

## 2. Technical Stack
- **Embedding:** OpenAI `text-embedding-3-small` (1536 dimensions).
- **Database:** PostgreSQL with `pgvector` extension.
- **ORM:** Prisma 7 (Sử dụng `$queryRaw` để thực hiện toán tử vector).

## 3. Implementation Steps

### 3.1. Embedding Generation
- **Format:** Chuẩn hóa dữ liệu trước khi nhúng theo mẫu: `[Tên món] | [Mô tả] | [Tag]`.
- **Triggers:** Tạo/Cập nhật embedding ngay khi bản ghi Food được lưu vào Database.

### 3.2. Vector Search Logic
- Sử dụng toán tử `<=>` (Cosine Distance) để tìm các món ăn có độ tương đồng cao nhất.
- **Hybrid Search:** Kết hợp Full-text search (cho tên món khớp 100%) và Vector search (cho ngữ nghĩa).

### 3.3. RAG Pipeline
1. **Retrieve:** Lấy Top 5-10 món ăn gần nhất với vector của người dùng.
2. **Context Construction:** Biến dữ liệu món ăn thành chuỗi văn bản làm ngữ cảnh (Context) cho Prompt.
3. **LLM Consultation:** Gửi Prompt + Context để AI đưa ra lời tư vấn thuyết phục cho người dùng.

## 4. Code Pattern (Prisma 7)

```typescript
const foods: any[] = await this.prisma.$queryRaw`
  SELECT id, name, description, price, 
         (embedding <=> ${embedding}::vector) as distance
  FROM "Food"
  WHERE status = 'APPROVED' AND is_active = true
  ORDER BY distance ASC
  LIMIT 10
`;
```

## 5. Performance Tips
- **Index:** Khởi tạo `HNSW` index trên cột embedding để tăng tốc độ tìm kiếm khi dữ liệu món ăn lớn.
- **Filtering:** Luôn áp dụng `where` (status, isActive) trong câu query vector để đảm bảo an toàn dữ liệu.

## Checklist
- [ ] Cột `embedding` đã được khai báo trong Prisma Schema chưa?
- [ ] Đã cài đặt extension `pgvector` trong Postgres chưa?
- [ ] Đã có cơ chế xử lý khi OpenAI API bị Rate Limit chưa?
