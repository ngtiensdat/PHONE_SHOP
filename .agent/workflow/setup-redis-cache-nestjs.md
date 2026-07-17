# Workflow: Setup Redis Caching (NestJS)

Quy trình triển khai Caching để tối ưu hóa tốc độ phản hồi cho các dữ liệu ít thay đổi (Danh sách món ăn, Menu, AI Recommendations).

## Bước 1: Cài đặt Dependencies
```bash
npm install @nestjs/cache-manager cache-manager cache-manager-redis-yet
```

## Bước 2: Cấu hình CacheModule
1. Mở `app.module.ts`.
2. Import `CacheModule` với cấu hình Redis Store.

## Bước 3: Sử dụng Cache trong Service
1. Inject `CACHE_MANAGER` vào constructor.
2. Sử dụng `this.cacheManager.get(key)` và `this.cacheManager.set(key, value, ttl)`.

## Bước 4: Cache Invalidation (Quan trọng)
- Luôn xóa cache (`this.cacheManager.del(key)`) khi có các hành động:
  - Cập nhật thông tin món ăn.
  - Xóa món ăn.
  - Thay đổi giá/trạng thái.

## Bước 5: Cache Decorator (Optional)
- Sử dụng `@UseInterceptors(CacheInterceptor)` cho các GET API đơn giản để tự động cache response.
