# Rule: E-Commerce Data Consistency (Cart & Order Integrity Standards)

You are an e-commerce data specialist. Apply industry best practices to ensure cart-order integrity, inventory accuracy, and idempotent transaction processing.

## 1. Objects & Associations (Thực thể & Liên kết)
- **Objects:** Mọi thực thể (User, Product, ProductVariant, Order, Cart) là một Object với ID duy nhất.
- **Associations:** Các hành động (AddToCart, PlaceOrder, ApplyVoucher) là các liên kết (Edges) giữa các Objects.
- **Inventory Lock:** Khi tạo đơn hàng, hệ thống PHẢI lock tồn kho từng `ProductVariant` trong cùng một Transaction để tránh oversell.

## 2. Cart-to-Order Consistency
- **Rule:** Dữ liệu giỏ hàng (giá, tên, hình ảnh) phải được **snapshot lại tại thời điểm đặt hàng**, không dùng lại giá từ cart để tránh sai lệch khi giá sản phẩm thay đổi.
- **Action:** Khi `Order` được tạo, copy `price` từ `Product` vào `OrderItem.unitPrice` — không reference back về `Product.price`.

## 3. Idempotency & Conflict Resolution
- **Idempotency:** Hành động thêm giỏ hàng được thực hiện nhiều lần chỉ cộng dồn số lượng (không tạo duplicate row).
- **Constraint:** Sử dụng Unique Constraint trên `(cartId, productVariantId)`. Dùng `upsert` thay vì `create` để thêm/cập nhật CartItem.

## 4. Inventory Counter Integrity
Để đảm bảo tồn kho chính xác:
- **Stock Deduction:** Luôn trừ tồn kho (`stock - quantity`) bên trong transaction khi confirm order.
- **Stock Restoration:** Khi đơn hàng bị hủy hoặc thanh toán thất bại, phải cộng lại tồn kho ngay lập tức.
- **Race Condition Prevention:** Sử dụng `WHERE stock >= quantity` trong câu UPDATE để tránh âm tồn kho.

## 5. Cascading & Cleanup
- **Cascade Cleanup:** Khi `Cart` bị xóa hoặc đơn hàng đã đặt xong, `CartItem` liên quan phải được xóa sạch.
- **Soft Delete:** `Product` bị ẩn (soft delete) vẫn giữ nguyên trong `OrderItem` để lịch sử không bị mất.

## Examples

### ✅ Place Order Transaction (Inventory-Safe)
```typescript
await prisma.$transaction(async (tx) => {
  // 1. Lock & validate stock cho từng variant
  for (const item of cartItems) {
    const updated = await tx.productVariant.updateMany({
      where: { id: item.variantId, stock: { gte: item.quantity } },
      data: { stock: { decrement: item.quantity } },
    });
    if (updated.count === 0) throw new Error(`Hết hàng: ${item.variantId}`);
  }

  // 2. Snapshot giá tại thời điểm đặt hàng
  const order = await tx.order.create({
    data: {
      userId,
      items: {
        create: cartItems.map(item => ({
          productVariantId: item.variantId,
          quantity: item.quantity,
          unitPrice: item.currentPrice, // snapshot
          productName: item.name,       // snapshot
        })),
      },
    },
  });

  // 3. Xóa giỏ hàng sau khi đặt thành công
  await tx.cartItem.deleteMany({ where: { cartId } });

  return order;
});
```

### ✅ Add to Cart (Idempotent via Upsert)
```typescript
await prisma.cartItem.upsert({
  where: { cartId_productVariantId: { cartId, productVariantId } },
  create: { cartId, productVariantId, quantity },
  update: { quantity: { increment: quantity } },
});
```

## Checklist
- [ ] Tồn kho được lock trong transaction khi tạo đơn hàng chưa?
- [ ] Giá sản phẩm đã được snapshot vào `OrderItem.unitPrice` chưa?
- [ ] `CartItem` có dùng `upsert` để tránh duplicate không?
- [ ] Khi hủy đơn, tồn kho có được cộng lại không?
- [ ] Race condition (âm tồn kho) đã được xử lý bằng `WHERE stock >= quantity` chưa?
