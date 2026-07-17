# Rule: Clean Architecture & NestJS Standard (The Master Ultimate Version)

## 1. Core Philosophy
Dự án Food AI tuân thủ nghiêm ngặt kiến trúc phân lớp (Layered Architecture). Mục tiêu là tách biệt logic nghiệp vụ khỏi các yếu tố kỹ thuật (DB, Web Framework) để dễ dàng kiểm thử, bảo trì và mở rộng.

## 2. Layered Responsibilities (Trách nhiệm các lớp)

### 2.1. Controller Layer (Cửa ngõ)
- **Nhiệm vụ:** Tiếp nhận request, trích xuất dữ liệu (params, body, query) và trả về response.
- **Quy tắc:** 
    - Tuyệt đối KHÔNG chứa logic nghiệp vụ hay câu lệnh Prisma.
    - Phải sử dụng DTO để validate dữ liệu đầu vào.
    - Chỉ được phép gọi đến Service tương ứng.
    - Sử dụng `@GetUser()` decorator chuyên dụng để lấy thông tin user từ JWT. CẤM parse thủ công.

### 2.2. Service Layer (Bộ não - The Brain)
- **Nhiệm vụ:** Chứa toàn bộ "linh hồn" của ứng dụng (Business Logic, Tính toán, Xử lý dữ liệu phức tạp).
- **Quy tắc:** 
    - Có thể gọi nhiều Repository hoặc các Service khác.
    - KHÔNG được biết về các đối tượng HTTP (Request, Response).
    - Phải ném ra (throw) các Exception chuẩn của NestJS (`BadRequestException`, `ForbiddenException`, `NotFoundException`...) khi có lỗi.
    - Mọi logic tính toán (ví dụ: tính khoảng cách, lọc dữ liệu AI) PHẢI nằm ở đây.

### 2.3. Repository / Database Layer (Prisma)
- **Nhiệm vụ:** Tương tác trực tiếp với Database qua Prisma Client.
- **Quy tắc:** 
    - Tập trung vào các thao tác CRUD và các câu Query tối ưu.
    - Sử dụng `select` hoặc `include` để chỉ lấy đúng những trường cần thiết (Tránh Over-fetching).
    - Trả về dữ liệu "sạch" cho Service.

## 3. Module Encapsulation & Dependency Injection
- **Encapsulation (Đóng gói):** Mỗi Module (User, Food, Restaurant) phải là một "hộp đen" độc lập. Chỉ `export` những Service thực sự cần thiết cho Module khác sử dụng.
- **Dependency Injection (DI):** CẤM khởi tạo Service thủ công bằng từ khóa `new`. Phải sử dụng cơ chế DI qua `constructor` của NestJS.
- **Circular Dependency:** Tuyệt đối không để xảy ra tình trạng Module A import B và B lại import A. Nếu gặp trường hợp này, hãy tách phần chung ra một `SharedModule`.

## 4. DTO & Validation Standard (BẮT BUỘC)
- Mọi dữ liệu đi vào hệ thống PHẢI qua "cửa khẩu" DTO.
- Sử dụng đầy đủ các Decorator từ `class-validator` (`@IsString()`, `@IsNumber()`, `@IsOptional()`, `@Min()`, `@Max()`).
- Cấu hình `ValidationPipe` toàn cục để tự động loại bỏ các trường không khai báo (Whitelisting).

## 5. Security & Ownership
- Luôn kiểm tra quyền sở hữu (Ownership) trong Service trước khi thực hiện các hành động UPDATE/DELETE (Đã quy định trong `security-rule`).

## 6. Examples (Do vs Don't)

### ❌ Cấm (Don't)
```typescript
// Controller chứa logic DB và xử lý dữ liệu - QUÁ XẤU
@Post()
async create(@Body() body: any) {
  if (body.price < 0) throw new Error('Price invalid');
  return this.prisma.food.create({ data: body });
}
```

### ✅ Nên làm (Do)
```typescript
// 1. Controller sạch sẽ (chỉ routing và gọi service)
@Post()
@UseGuards(JwtAuthGuard)
create(@Body() createFoodDto: CreateFoodDto, @GetUser() user: User) {
  return this.foodService.create(user.id, createFoodDto);
}

// 2. Service chứa logic nghiệp vụ và xử lý DB
async create(userId: number, dto: CreateFoodDto) {
  if (dto.price < 0) throw new BadRequestException('Price must be positive');
  return this.foodRepository.create(userId, dto);
}
```

## Checklist
- [ ] Logic nghiệp vụ/DB có đang nằm ở Controller không? (Nếu có -> Chuyển vào Service).
- [ ] Đã sử dụng DTO kèm Validation cho mọi API đầu vào chưa?
- [ ] Đã sử dụng `@GetUser()` thay vì parse JWT thủ công chưa?
- [ ] Query Prisma đã sử dụng `select` để tối ưu dữ liệu chưa?
- [ ] Module có đang vi phạm Circular Dependency (Import chéo) không?
