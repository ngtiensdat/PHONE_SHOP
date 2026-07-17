# Skill: Enterprise Frontend Architecture (Next.js & Scalable UI Engineering)

# 1. Overview

Kỹ năng này giúp Agent xây dựng frontend Next.js theo tiêu chuẩn production-level:
- scalable
- maintainable
- performant
- accessible
- reusable
- premium UX

Agent phải suy nghĩ như:
- Senior Frontend Engineer
- Frontend Architect
- UI System Designer

Không chỉ tạo UI đẹp.
Mà phải tạo frontend sống sót lâu dài khi dự án scale lớn.

---

# 2. Core Technical Stack

- Framework: Next.js 14+ App Router
- Styling: Tailwind CSS
- Animation: Framer Motion
- State Management: Zustand
- Forms: React Hook Form + Zod
- Data Fetching: Server Actions / API Layer
- Icons: Lucide React
- UI Architecture: Feature-Based Structure

---

# 3. Frontend Architecture Principles

## 3.1. Separation of Concerns

UI components KHÔNG được chứa:
- business logic phức tạp
- API logic lớn
- data transformation nặng
- validation logic

---

## 3.2. Component Responsibility

### Presentational Component
Chỉ render UI.

### Container/Feature Component
Quản lý state và orchestration.

---

## 3.3. Feature-Based Architecture

Preferred Structure:

```txt
src/
 ├── app/
 ├── components/
 │    ├── base/
 │    ├── layout/
 │    └── ui/
 │
 ├── features/
 │    ├── auth/
 │    ├── restaurant/
 │    ├── ai/
 │    └── review/
 │
 ├── services/
 ├── hooks/
 ├── stores/
 ├── lib/
 └── constants/
```

---

# 4. Server vs Client Components

## Prefer Server Components by default

Use Client Components ONLY for:
- forms
- modal
- animation interaction
- browser APIs
- local interactive state

---

## Forbidden
```tsx
'use client'
```

ở toàn bộ page nếu không cần thiết.

---

# 5. State Management Rules

## Zustand
Dùng cho:
- auth state
- modal state
- global UI state

---

## Local State
Ưu tiên:
```tsx
useState()
```

nếu state chỉ local.

---

## Forbidden
- globalizing everything
- prop drilling sâu
- duplicated state

---

# 6. API Layer Rules

## Forbidden
```tsx
fetch('/api')
```

rải khắp components.

---

## Required

Centralized API layer:

```txt
services/
 ├── api-client.ts
 ├── auth.service.ts
 └── food.service.ts
```

---

# 7. Forms & Validation

## Required
- React Hook Form
- Zod schema validation

---

## Forbidden
- manual validation everywhere
- giant form handlers

---

# 8. Performance Optimization

## Required
- next/image
- dynamic imports
- Suspense
- memoization when necessary
- server-side fetching first
- lazy loading
- pagination/infinite scroll

---

## Detect & Avoid
- unnecessary re-renders
- huge client bundles
- oversized animations
- duplicated fetch calls

---

# 9. Premium UI Principles

## UI should feel:
- smooth
- clean
- responsive
- modern

NOT:
- overloaded
- flashy
- distracting

---

## Animation Rules

Animation must:
- improve UX
- guide attention
- feel natural

---

## Forbidden
- excessive motion
- animation spam
- laggy transitions
- heavy blur abuse

---

# 10. Accessibility (A11Y)

## Required
- semantic HTML
- keyboard navigation
- aria-label
- focus states
- contrast readability

---

# 11. Security

## Detect
- unsafe dangerouslySetInnerHTML
- token leakage
- localStorage abuse
- exposed secrets
- unsafe client auth logic

---

# 12. Reusability Rules

## If UI appears >2 times:
Move to reusable component.

---

## Shared UI goes into:
```txt
components/base/
```

---

# 13. Clean Code Rules

## Detect
- giant component
- nested JSX hell
- inline business logic
- duplicated hooks
- magic strings
- hardcoded values
- poor naming

---

## Preferred
Small readable components.

---

# 14. Mobile-First Rules

UI must:
- scale well on mobile
- avoid overflow
- maintain touch usability
- avoid tiny clickable areas

---

# 15. Frontend Production Checklist

## Architecture
- [ ] Feature-based structure
- [ ] Clear separation of concerns
- [ ] Reusable components
- [ ] API layer centralized

---

## Performance
- [ ] next/image optimized
- [ ] Dynamic imports used
- [ ] No excessive rerenders
- [ ] Bundle size optimized

---

## Code Quality
- [ ] No giant components
- [ ] No business logic inside UI
- [ ] No duplicated fetch logic
- [ ] Proper naming

---

## UX
- [ ] Responsive
- [ ] Smooth interactions
- [ ] Accessible
- [ ] Loading states
- [ ] Error states

---

## Security
- [ ] Safe auth handling
- [ ] No exposed secrets
- [ ] No unsafe HTML rendering

---

# 16. Final Engineering Goal

Frontend must:
- scale to large teams
- survive long-term maintenance
- remain predictable
- stay performant
- deliver premium UX without sacrificing maintainability