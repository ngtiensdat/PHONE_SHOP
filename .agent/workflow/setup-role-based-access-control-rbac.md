---
description: Hướng dẫn phân quyền vai trò người dùng (RBAC) trong dự án PHONE_SHOP
---

Tài liệu này hướng dẫn cách phân quyền người dùng (Role-Based Access Control) trên cả Backend (NestJS) và Frontend (Next.js) khớp với cấu trúc thực tế của hệ thống.

## 1. Định nghĩa vai trò (Database Schema)

Các vai trò được định nghĩa thông qua enum `UserRole` trong [schema.prisma](file:///e:/PHONE_SHOP_code/my-web/backend/prisma/schema.prisma):

```prisma
enum UserRole {
  CUSTOMER  // Khách hàng mua điện thoại
  STAFF     // Nhân viên quản lý đơn hàng, tồn kho
  ADMIN     // Quản trị viên hệ thống
}
```

---

## 2. Phân quyền trên Backend (NestJS)

Backend sử dụng kết hợp `JwtAuthGuard` để xác thực token và `RolesGuard` để kiểm tra phân quyền.

### Sử dụng Decorator `@Roles` và `@UseGuards`

Để bảo vệ một Controller hoặc Endpoint cụ thể, sử dụng decorator `@Roles` và chỉ định các vai trò được phép truy cập:

```typescript
import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.STAFF, UserRole.ADMIN) // Chỉ STAFF và ADMIN được phép truy cập
export class AdminController {
  @Post('product')
  async createProduct() {
    // Xử lý tạo sản phẩm điện thoại
  }
}
```

### Cơ chế hoạt động của RolesGuard

[RolesGuard.ts](file:///e:/PHONE_SHOP_code/my-web/backend/src/common/guards/roles.guard.ts) sẽ sử dụng `Reflector` để đọc metadata vai trò cần có và đối chiếu với `request.user.role` được giải mã từ JWT:

```typescript
const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
  context.getHandler(),
  context.getClass(),
]);
if (!requiredRoles) return true;

const request = context.switchToHttp().getRequest();
const user = request.user;
return requiredRoles.some((role) => user?.role === role);
```

---

## 3. Kiểm tra vai trò trên Frontend (Next.js)

Frontend sử dụng Hook `useAuth` để quản lý trạng thái đăng nhập và truy xuất thông tin phân quyền của người dùng hiện tại.

### Kiểm tra bằng Hook `useAuth`

```typescript
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/user'; // 'CUSTOMER' | 'STAFF' | 'ADMIN'

const MyComponent = () => {
  const { user, isCustomer, isAdmin, isStaff } = useAuth();

  return (
    <div>
      {/* Hiển thị UI có điều kiện */}
      {isStaff && <p>Xin chào Nhân viên!</p>}
      {isAdmin && <button>Vào trang Quản trị viên</button>}
      
      {/* Kiểm tra trực tiếp bằng user.role */}
      {user?.role === 'CUSTOMER' && <p>Bạn có thể mua hàng và đánh giá sản phẩm</p>}
    </div>
  );
};
```

### Chuyển hướng trang dựa theo vai trò (Routing Protection)

Khi cần điều hướng người dùng sau khi đăng nhập hoặc bảo vệ các trang dashboard:

```typescript
import { useRouter } from 'next/navigation';

// ... trong component ...
const router = useRouter();

const handleRedirect = (role: string) => {
  if (role === 'ADMIN') {
    router.push('/admin');
  } else if (role === 'STAFF') {
    router.push('/admin/orders'); // Staff quản lý đơn hàng
  } else {
    router.push('/dashboard'); // Customer mặc định
  }
};
```