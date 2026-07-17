# Rule: Prisma Usage Standard

## 1. Mandatory Enum Usage
- **NO String Literals:** You are FORBIDDEN from using raw strings for Enum fields (e.g., `status: 'PENDING'`).
- **Import from Client:** Always import the Enum type from `@prisma/client`.
- **Why?** It ensures 100% type safety and enables IDE autocompletion, preventing typos that cause runtime bugs.

## 2. Schema-First Logic
- All database-level constraints (Unique, Index, Default values) must be defined in `schema.prisma` first.
- Do not manually validate uniqueness in Service logic if it can be handled by Prisma constraints.

## 3. Advanced Query Rules
- **Selection:** Always use `select` or `include` to fetch only the data you need. NEVER fetch the entire object if 90% of fields are unused (Prevents Over-fetching).
- **Pagination:** Always implement pagination using `take` and `skip` (or cursor-based) for any list queries.

## 4. Error Handling
- Use Prisma's built-in error codes (e.g., `P2002` for unique constraint violation) to return precise error messages.

## Examples

### ❌ Cấm (Don't)
```typescript
// Dùng string thủ công và fetch toàn bộ data
const users = await prisma.user.findMany({
  where: { role: 'ADMIN' } 
});
```

### ✅ Nên (Do)
```typescript
import { UserRole } from '@prisma/client';

const users = await prisma.user.findMany({
  where: { role: UserRole.ADMIN },
  select: { id: true, email: true, name: true }, // Chỉ lấy 3 trường cần thiết
  take: 10,
  skip: 0
});
```

## Checklist
- [ ] Đã dùng Enum từ `@prisma/client` chưa?
- [ ] Query có đang `select` đúng các trường cần dùng không?
- [ ] Đã xử lý các mã lỗi của Prisma (P2002, P2025...) chưa?
