# Workflow: Scaffold New Feature (Clean Architecture)

Dùng quy trình này để tạo một Module hoặc Feature mới trong dự án **PHONE_SHOP**, đảm bảo tuân thủ nghiêm ngặt Clean Architecture.

## Bước 1: Khởi tạo Module (Backend)
1. Tạo folder module tại `src/modules/<feature-name>`.
2. Tạo các file cơ bản:
   - `<feature-name>.module.ts`
   - `<feature-name>.controller.ts`
   - `<feature-name>.service.ts`
   - `dto/create-<feature-name>.dto.ts`
   - `repositories/<feature-name>.repository.ts`

## Bước 2: Định nghĩa DTO & Schema
1. Cập nhật `prisma.schema` (nếu cần) và chạy `npx prisma generate`.
2. Viết Validation trong DTO bằng `class-validator`.

## Bước 3: Triển khai Repository
- Chỉ chứa các câu lệnh `this.prisma.<entity>.findUnique`, `create`, v.v.
- Luôn sử dụng `select` để tối ưu dữ liệu.

## Bước 4: Triển khai Service (Business Logic)
- Xử lý tính toán, gọi Repository.
- Throw `HttpException` khi có lỗi nghiệp vụ.

## Bước 5: Kết nối Controller
- Chỉ routing và gọi Service.
- Sử dụng `@UseGuards(JwtAuthGuard)` nếu cần bảo mật.

## Bước 6: Frontend Integration
1. Tạo folder tại `src/app/(dashboard)/<feature-name>` (nếu là trang admin) hoặc `src/components/features/<feature-name>`.
2. Sử dụng Server Components cho data fetching.
3. Sử dụng Client Components cho interactivity.
