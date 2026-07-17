# Skill: Authentication & Authorization (NestJS JWT)

## 1. Overview
Kỹ năng này triển khai hệ thống xác thực và phân quyền (RBAC) an toàn cho dự án Food AI, đảm bảo đúng người dùng mới được truy cập vào đúng tài nguyên của họ.

## 2. Core Architecture
- **Password Hashing:** Sử dụng `bcrypt` với salt rounds 10-12.
- **JWT Strategy:** Sử dụng `passport-jwt` để giải mã và xác thực Token.
- **RBAC:** Phân tầng quyền hạn: `ADMIN` | `RESTAURANT` | `CUSTOMER`.

## 3. Implementation Steps

### 3.1. Login Flow
1. Verify email & password.
2. Generate JWT (payload chứa `userId`, `role`, `email`).
3. Trả về Token (Khuyên dùng HttpOnly Cookie cho Production).

### 3.2. Protection Layer
- **JwtAuthGuard:** Chặn các request không có Token.
- **RolesGuard:** Chặn các user không đúng vai trò (ví dụ: Customer không được vào Admin Panel).

### 3.3. Usage in Controller
Sử dụng Custom Decorator để giữ code sạch:
```typescript
@Get('me')
@UseGuards(JwtAuthGuard)
getProfile(@GetUser() user: User) {
  return user;
}
```

## 4. Best Practices
- **Token Expiry:** Đặt thời gian hết hạn hợp lý (ví dụ: 15m cho Access Token, 7d cho Refresh Token).
- **Security Headers:** Luôn trả về thông tin tối thiểu trong Payload (Tránh lộ thông tin nhạy cảm).
- **Ownership Verification:** Luôn kiểm tra `ownerId` trong Service ngay cả khi đã qua Guard (Chống IDOR).

## 5. References
- NestJS Authentication: https://docs.nestjs.com/security/authentication
- Passport.js: http://www.passportjs.org/

## Checklist
- [ ] Mật khẩu có được lưu dưới dạng Plaintext không? (CẤM).
- [ ] Đã có `@Roles()` decorator cho các API nhạy cảm chưa?
- [ ] Token có được truyền qua Header `Authorization: Bearer <token>` chưa?
- [ ] Đã xử lý trường hợp Token hết hạn chưa?
