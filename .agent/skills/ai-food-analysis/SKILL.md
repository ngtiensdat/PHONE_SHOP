# Skill: AI Food Analysis (Deep Data Enrichment)

## 1. Overview
Kỹ năng này sử dụng LLM để "đọc hiểu" món ăn, chuyển đổi các mô tả văn bản thô (unstructured data) thành dữ liệu có cấu trúc (structured metadata) và dữ liệu giàu ngữ nghĩa để tối ưu hóa bộ máy tìm kiếm Vector (RAG).

## 2. Core Strategy: The RAG Fuel
Kết quả của quá trình phân tích này được dùng cho 2 mục đích:
1.  **Metadata Filtering (Lọc cứng):** Lưu vào DB (Calo, Protein, Carbs, Fats, HealthScore) để thực hiện các câu lệnh `WHERE` chính xác.
2.  **Semantic Enrichment (Làm giàu vector):** Kết quả phân tích được nối vào chuỗi văn bản trước khi nhúng (Embed) để Vector "biết nhiều hơn" về món ăn.

## 3. Capabilities
- **Ingredient Fingerprinting:** Trích xuất danh sách nguyên liệu để lọc món cho người bị dị ứng hoặc theo chế độ ăn (ví dụ: No-Peanuts, No-Gluten).
- **Macro-Nutrient Profiling:** Ước tính calo và các chỉ số dinh dưỡng để phục vụ người dùng quan tâm đến sức khỏe.
- **Categorical Tagging:** Tự động gắn tag dựa trên "Vibe" của món ăn (ví dụ: `#comfort-food`, `#low-carb`, `#night-snack`).
- **Standardized Output:** Ép buộc kết quả trả về khớp với các hằng số (Enums) trong dự án.

## 4. Master Prompt Pattern (RAG Optimized)
```text
Bạn là một trợ lý dữ liệu thực phẩm. Hãy phân tích món ăn "[Tên món]" với mô tả "[Mô tả]".
Hãy trả về JSON theo cấu trúc sau:
{
  "summary": "Tóm tắt ngắn gọn đặc điểm món ăn",
  "ingredients": ["danh sách nguyên liệu chính"],
  "nutrition": { "calories": number, "protein": number, "carbs": number, "fats": number },
  "tags": ["tag1", "tag2"], // Sử dụng tag ngắn, dễ tìm kiếm
  "aiAnalysisNote": "Ghi chú đặc biệt về sức khỏe hoặc vùng miền"
}
```

## 5. Implementation Workflow
1.  **Analysis:** Chạy AI Food Analysis khi món ăn mới được tạo hoặc cập nhật.
2.  **Store:** Lưu kết quả vào bảng `Food` (các cột tương ứng).
3.  **Sync Vector:** Nối `name + description + ingredients + tags` thành một đoạn văn bản dài và gửi đến OpenAI Embedding.
4.  **Ready for RAG:** Giờ đây, khi tìm "món gì giàu đạm", Vector search sẽ tìm thấy món này vì từ khóa "giàu đạm" (hoặc nguyên liệu thịt) đã được AI phân tích và đưa vào dữ liệu nhúng.

## Checklist
- [ ] Dữ liệu AI trả về đã được làm tròn số (Calo, Protein) để dễ quản lý chưa?
- [ ] Các tag do AI tạo ra có trùng lặp với tag có sẵn không?
- [ ] Đã nối thêm kết quả phân tích vào chuỗi nhúng (Embedding string) chưa?
- [ ] Đã có cơ chế xử lý khi AI trả về dữ liệu không hợp lệ (NaN, null) chưa?
