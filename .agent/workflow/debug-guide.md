---
description: Cẩm nang gỡ lỗi nhanh cho AI trong dự án PHONE_SHOP
---

Tài liệu này tổng hợp cách xử lý các lỗi hệ thống đặc thù của dự án **PHONE_SHOP** để trợ lý AI có thể tự động sửa lỗi một cách nhanh chóng và chính xác.

---

## 1. Lỗi kết nối Cơ sở dữ liệu (Prisma Client Initialization)

### Triệu chứng (Symptom)
Khi chạy các script Node/TypeScript cục bộ liên quan đến Prisma (ví dụ: gieo dữ liệu, dọn dẹp DB), gặp lỗi:
`PrismaClientInitializationError: PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions`

### Nguyên nhân (Root Cause)
Hệ thống sử dụng PostgreSQL với adapter `pgvector` và adapter Prisma (`@prisma/adapter-pg`). Khi khởi tạo Prisma Client trong các file script độc lập, không thể gọi `new PrismaClient()` trống mà bắt buộc phải cấu hình Adapter kết nối thông qua Connection Pool của thư viện `pg`.

### Giải pháp (Remediation)
Luôn khởi tạo Prisma Client đầy đủ theo cấu trúc sau trong mọi script Node.js/TypeScript:

```typescript
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
```

---

## 2. Lỗi tối ưu hóa hình ảnh Next.js (Image Optimization & 404)

### Triệu chứng 1: Crash lúc Runtime do Hostname lạ
Giao diện Next.js bị crash lúc runtime khi load ảnh món ăn từ một domain mới (như `susercontent.com`, `imgur.com`).

#### Giải pháp
- Tuyệt đối không nới lỏng whitelist trong `next.config.ts` để giữ an toàn bảo mật (chỉ cho phép host: Cloudinary, Picsum, các CDN ảnh điện thoại chính hãng).
- Thay thế việc import trực tiếp `Image` từ `next/image` sang component **[SafeImage.tsx](file:///e:/PHONE_SHOP_code/my-web/frontend/src/components/base/SafeImage.tsx)**. Component này sẽ tự động chuyển sang thẻ `<img>` HTML thông thường khi phát hiện domain lạ ngoài whitelist, ngăn chặn crash runtime.

### Triệu chứng 2: Lỗi Upstream Image 404 trong Console
Terminal liên tục in lỗi: `⨯ upstream image response failed for https://images.unsplash.com/... 404`

#### Giải pháp
- **Phía Client:** `SafeImage.tsx` đã có sự kiện `onError` tự động chuyển `src` sang ảnh vector mặc định `placeholder-phone.svg` để giao diện không bị vỡ ảnh.
- **Phía Database (Xử lý triệt để log lỗi):** Nếu log lỗi 404 xuất hiện liên tục trong terminal, đó là do database chứa các link ảnh sản phẩm điện thoại cũ đã hết hạn. Hãy viết một script cập nhật cơ sở dữ liệu để đưa các trường `image` của sản phẩm đó về `null` (khi đó client sẽ trực tiếp tải ảnh mặc định mà không cần gửi request lỗi nữa).

---

## 3. Lỗi chất lượng ảnh sản phẩm (Ảnh bị mờ / sai aspect ratio)

### Triệu chứng
Ảnh điện thoại hiển thị bị mờ hoặc sai tỉ lệ (4:3 bị crop sai).

### Nguyên nhân
URL ảnh chứa query parameter resize thu nhỏ (ví dụ: `...@resize_ss120x120!@crop_w120_h120_cT`) nên Next.js hiển thị thumbnail nhỏ bị mờ.

### Giải pháp
Sử dụng hàm helper để loại bỏ toàn bộ phần đuôi resize trước khi lưu vào DB hoặc khi render ở Frontend để lấy đường dẫn ảnh gốc chất lượng cao.
*Ví dụ logic:*
```typescript
if (url.includes('@')) {
  return url.split('@')[0]; // Lấy ảnh gốc
}
```
