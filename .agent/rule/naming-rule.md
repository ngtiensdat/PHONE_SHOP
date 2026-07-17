# Rule: Naming & Constants Standard (Perfect Version)

## 1. Eliminate Magic Values
- Mọi giá trị có ý nghĩa nghiệp vụ PHẢI là hằng số `UPPER_SNAKE_CASE`.
- Lưu trữ tập trung tại `src/common/constants/` (BE) hoặc `src/constants/` (FE).

## 2. Advanced Naming (DTO, Interface, Types)
- **DTOs:** Kết thúc bằng `.dto.ts`. Ví dụ: `CreateFoodDto`, `UpdateRestaurantDto`.
- **Interfaces:** Bắt đầu bằng chữ `I` (Tùy chọn, nhưng nên nhất quán) hoặc kết thúc bằng `.interface.ts`. 
- **Types:** Kết thúc bằng `.type.ts`.
- **Enums:** Sử dụng PascalCase cho tên Enum và UPPER_CASE cho giá trị (Nếu không dùng Prisma Enum).

## 3. Method Naming (Tên hàm)
- Sử dụng động từ đi đầu: `get...`, `create...`, `handle...`, `validate...`.
- Tên hàm phải nói lên hành động (ví dụ: `calculateTotalPrice` thay vì `total`).

## 4. File Structure Naming
- Folder: `kebab-case` (ví dụ: `food-management`).
- Component: `PascalCase` (ví dụ: `FoodCard.tsx`).
- Hook: `camelCase` và bắt đầu bằng `use` (ví dụ: `useAuth.ts`).

## Checklist
- [ ] Tên DTO có hậu tố `.dto` chưa?
- [ ] Hằng số đã nằm đúng folder `constants` chưa?
- [ ] Tên hàm có bắt đầu bằng động từ không?
- [ ] Có `Interface` nào bị đặt tên trùng với `Class` không?
