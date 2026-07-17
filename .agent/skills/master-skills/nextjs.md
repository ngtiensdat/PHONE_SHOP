---
name: nextjs
description: |
  Build Next.js 16 apps with App Router, Server Components/Actions, Cache Components ("use cache"), and async route params.
user-invocable: true
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
---

# Next.js App Router - Production Patterns

**Version**: Next.js 16.x
**React Version**: 19.x

---

## 1. Async Route Parameters (BREAKING)

`params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` are now **async** and must be awaited before accessing properties.

### Server Page Example:
```typescript
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ query: string }>
}) {
  const { slug } = await params
  const { query } = await searchParams
  return <div>{slug} - {query}</div>
}
```

### Client Component Example:
```typescript
'use client';
import { use } from 'react';

export default function ClientComponent({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params); // Unwrap Promise in client
  return <div>{id}</div>;
}
```

### Headers / Cookies Example:
```typescript
import { cookies, headers } from 'next/headers'

export async function MyComponent() {
  const cookieStore = await cookies()
  const headersList = await headers()
  const token = cookieStore.get('token')?.value
}
```

---

## 2. Parallel Routes Require `default.js` (BREAKING)

Parallel routes now **require** explicit `default.js` / `default.tsx` files. Without them, client-side navigation will error with unmatched slots.

### Structure:
```
app/
├── @modal/
│   ├── login/
│   │   └── page.tsx
│   └── default.tsx    ← REQUIRED
├── @dashboard/
│   ├── overview/
│   │   └── page.tsx
│   └── default.tsx    ← REQUIRED
└── layout.tsx
```

### Default Fallback:
```typescript
// app/@modal/default.tsx
export default function ModalDefault() {
  return null; // or <Skeleton />
}
```

---

## 3. Opt-in Caching with `"use cache"`

Next.js 16 uses **opt-in caching** via the `"use cache"` directive, replacing implicit caching.

### Component-level caching:
```typescript
'use cache'

export async function ExpensiveComponent() {
  const data = await fetch('https://api.example.com/data').then(r => r.json())
  return <div>{data.title}</div>
}
```

### Function-level caching:
```typescript
'use cache'

export async function getExpensiveData(id: string) {
  return fetch(`https://api.example.com/items/${id}`).then(r => r.json())
}
```

### Caching Defaults:
* `fetch()` requests are **not** cached by default.
* Route Handlers (GET) are **dynamic by default**.
* Start with no caching and add `"use cache"` where beneficial.

---

## 4. Revalidation APIs

* **`revalidateTag()`**: Requires a cache life profile as the second argument:
  ```typescript
  import { revalidateTag } from 'next/cache'
  
  export async function updatePost(id: string) {
    await fetch(`/api/posts/${id}`, { method: 'PATCH' })
    revalidateTag('posts', 'max') // 'max', 'hours', 'days', 'weeks'
  }
  ```
* **`updateTag()`**: Read-your-writes semantics (expires cache immediately and fetches fresh data in same request, ideal for forms).
  ```typescript
  import { updateTag } from 'next/cache'
  updateTag('user-profile')
  ```

---

## 5. Common Errors & Solutions

### 1. `params` / `searchParams` is a Promise
* **Cause**: Attempting to access properties synchronously.
* **Fix**: Use `await params` or `use(params)` (for Client Components).

### 2. Conflicting routes with Route Groups
* **Cause**: Two route groups resolve to the same path (e.g. `(marketing)/about/page.tsx` and `(shop)/about/page.tsx`).
* **Fix**: Ensure paths are unique.

### 3. Non-serializable props passed to Client Components
* **Cause**: Passing functions or class instances across Server-Client boundary.
* **Fix**: Only pass JSON-serializable props. Define helper functions within the Client Component.
