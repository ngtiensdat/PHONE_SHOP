# Skill: Enterprise Backend Audit (NestJS Production Review)

## 1. Overview
Kỹ năng này giúp Agent thực hiện audit toàn diện một hệ thống Backend NestJS theo tiêu chuẩn production-level và enterprise architecture.

Mục tiêu:
- Phát hiện technical debt
- Đánh giá scalability
- Kiểm tra security
- Review clean architecture
- Phát hiện anti-pattern
- Đánh giá production readiness
- Đưa ra refactor suggestion thực tế

Agent phải hoạt động như:
- Staff Engineer
- Principal Backend Architect
- Senior Production Reviewer

KHÔNG được review hời hợt.

---

# 2. Core Review Principles

## 2.1. Be Critical
- Không cố "khen"
- Ưu tiên phát hiện vấn đề dài hạn
- Đánh giá khả năng scale team + hệ thống

---

## 2.2. Production Mindset
Luôn giả định:
- Hệ thống có hàng triệu user
- Có nhiều developer cùng maintain
- Backend sẽ mở rộng feature liên tục

---

## 2.3. Maintainability First
Ưu tiên:
1. Maintainability
2. Scalability
3. Security
4. Performance
5. Developer Experience

---

# 3. Architecture Audit

## 3.1. Module Structure
Kiểm tra:
- Module boundaries có rõ ràng không
- Có bị God Module không
- Có bị business leakage không
- Có coupling quá cao không

### Bad Example
```txt
AuthService:
- login
- upload
- notification
- analytics
- otp
- email
```

### Good Example
```txt
AuthService
OtpService
MailService
TokenService
```

---

## 3.2. Controller Audit
Controller phải:
- mỏng
- không business logic
- không query DB trực tiếp

### Detect
- Hash password trong controller
- Prisma query trong controller
- Validation thủ công
- Logic phức tạp

---

## 3.3. Service Audit
Kiểm tra:
- Service có quá lớn không
- Có SRP violation không
- Có gọi quá nhiều dependency không
- Có orchestration hợp lý không

---

## 3.4. Repository Pattern
Đánh giá:
- Có abstraction DB hợp lý không
- Prisma có bị dùng trực tiếp khắp nơi không
- Query logic có bị duplicate không

---

# 4. Clean Code Audit

## 4.1. Detect Hardcode
Phát hiện:
- Hardcoded URL
- Hardcoded role
- Hardcoded status
- Hardcoded timeout
- Hardcoded limits
- Hardcoded secret
- Magic numbers
- Magic strings

### Bad Example
```ts
if (status === "PENDING")
```

### Good Example
```ts
OrderStatus.PENDING
```

---

## 4.2. Naming Audit
Detect:
- variable vô nghĩa
- function mơ hồ
- inconsistent naming

### Bad Example
```ts
a()
x()
data()
```

### Good Example
```ts
generateVerificationOtp()
findUserByEmail()
```

---

## 4.3. Function Size
Cảnh báo:
- function quá dài
- nested logic sâu
- cognitive complexity cao

---

## 4.4. Duplicate Logic
Detect:
- repeated query
- repeated validation
- repeated transform
- repeated API handling

---

## 4.5. Utility Dumping
Detect:
```txt
utils.ts
helpers.ts
common.ts
```

quá lớn hoặc chứa logic hỗn tạp.

---

# 5. Security Audit

## 5.1. Authentication
Kiểm tra:
- JWT secret hardcode
- token expiration
- refresh token rotation
- OTP expiry
- OTP hashing
- resend OTP limit
- brute force protection

---

## 5.2. Validation
Kiểm tra:
- DTO validation đầy đủ chưa
- ValidationPipe global chưa
- whitelist enabled chưa
- sanitize input chưa

### Required
```ts
new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
})
```

---

## 5.3. Rate Limiting
Kiểm tra:
- login throttling
- OTP throttling
- spam protection

---

## 5.4. Sensitive Data Exposure
Detect:
- password return
- stack trace exposure
- internal error leak
- unsafe logs

---

## 5.5. File Upload Security
Kiểm tra:
- mime validation
- size limit
- extension validation

---

# 6. Prisma & Database Audit

## 6.1. Query Optimization
Detect:
- missing select
- select *
- N+1 query
- duplicated query
- unnecessary include

### Good Example
```ts
select: {
  id: true,
  email: true
}
```

---

## 6.2. Schema Design
Kiểm tra:
- enum usage
- relation consistency
- normalization
- missing index
- cascade risk
- nullable abuse

---

## 6.3. Transactions
Kiểm tra:
- critical flow có transaction không
- consistency risk

### Required
```ts
prisma.$transaction()
```

---

# 7. Performance Audit

## Detect
- blocking operations
- sync heavy tasks
- repeated DB calls
- missing caching
- sequential async
- inefficient loops

### Bad Example
```ts
array.forEach(async item => {})
```

### Good Example
```ts
await Promise.all()
```

---

# 8. NestJS Best Practices

## Required
- ConfigModule
- DTO validation
- Global exception handling
- Interceptors
- Guards
- Dependency Injection
- Modular architecture

---

## Forbidden
- business logic inside controller
- direct env usage everywhere
- giant services
- circular dependency
- console.log spam

---

# 9. Logging Audit

## Detect
- excessive console.log
- missing error logging
- inconsistent logging

## Preferred
- Pino
- Winston

---

# 10. Scalability Audit

Đánh giá:
- hệ thống có scale team được không
- feature mới có dễ thêm không
- module boundaries có rõ không
- architecture có survive lâu dài không

---

# 11. Technical Debt Audit

Detect:
- dangerous shortcuts
- future bottlenecks
- fragile architecture
- overengineering
- underengineering

---

# 12. Production Readiness Checklist

## Authentication
- [ ] JWT secure
- [ ] OTP expiry
- [ ] Refresh token rotation
- [ ] Rate limiting
- [ ] Password hashing

---

## Validation
- [ ] DTO validation
- [ ] Global ValidationPipe
- [ ] Input sanitization

---

## Architecture
- [ ] Thin controller
- [ ] Clean service
- [ ] Repository abstraction
- [ ] Modular structure
- [ ] No circular dependency

---

## Database
- [ ] Optimized query
- [ ] Proper indexing
- [ ] Transaction usage
- [ ] No N+1 query

---

## Security
- [ ] No hardcoded secret
- [ ] No sensitive response leak
- [ ] File upload validation
- [ ] Proper authorization

---

## Maintainability
- [ ] No giant file
- [ ] No utility dumping
- [ ] Naming consistency
- [ ] Reusable logic extraction

---

# 13. Required Output Format

Agent MUST output:

## Overall Score
- Architecture: /10
- Security: /10
- Scalability: /10
- Maintainability: /10
- Performance: /10
- Production Readiness: /10

---

## Critical Issues
For every issue:
- Severity
- Why dangerous
- Exact file
- Root cause
- Refactor suggestion

---

## Top Priorities
Liệt kê:
1. vấn đề nguy hiểm nhất
2. technical debt lớn nhất
3. bottleneck lớn nhất
4. security risk lớn nhất

---

# 14. Final Verdict

Agent phải trả lời:
- Có production-ready không
- Có scale team được không
- Có dễ maintain không
- Điều gì sẽ vỡ đầu tiên
- Technical debt nguy hiểm nhất là gì