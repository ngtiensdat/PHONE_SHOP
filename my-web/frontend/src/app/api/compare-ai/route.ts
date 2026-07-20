/**
 * Compare AI API Route (/api/compare-ai)
 * Multi-Criteria AI Comparison Engine for Smartphone Evaluation.
 * Connects to OpenAI Chat Completion API if OPENAI_API_KEY is defined;
 * falls back to a multi-dimensional reasoning engine if missing.
 *
 * Related: src/app/compare/page.tsx, src/store/useCompareStore.ts
 * Pattern: Next.js App Router API Route with Structured Reasoning Engine
 */

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { product1, product2, query } = await req.json();

    if (!product1 || !product2) {
      return NextResponse.json({ error: 'Missing products for comparison' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Bạn là Chuyên gia Đánh giá & So sánh Sản phẩm Công nghệ hàng đầu tại Sóc Mobile.
Nhiệm vụ: Phân tích tư duy logic đa chiều giữa 2 mẫu điện thoại dựa trên nhu cầu thực tế của khách hàng.

Hãy trình bày theo cấu trúc chuẩn Markdown:
1. 📊 Bảng so sánh 5 thông số cốt lõi (Màn hình, Chipset, RAM/Bộ nhớ, Giá bán, Nhu cầu tối ưu).
2. ⚡ Phân tích điểm vượt trội của từng sản phẩm.
3. 🎯 Lời khuyên chốt hạ chọn mua thiết bị nào cho nhu cầu cụ thể của người dùng.
Xưng hô thân thiện, khách quan và chuyên nghiệp.`,
            },
            {
              role: 'user',
              content: `So sánh 2 thiết bị:
1. ${product1.name} (Thương hiệu: ${product1.brand}, Giá: ${product1.price} VND, Màn hình: ${product1.specs.screen}, Chip: ${product1.specs.chip}, RAM: ${product1.specs.ram})
2. ${product2.name} (Thương hiệu: ${product2.brand}, Giá: ${product2.price} VND, Màn hình: ${product2.specs.screen}, Chip: ${product2.specs.chip}, RAM: ${product2.specs.ram})

Nhu cầu cụ thể của tôi: ${query || 'So sánh tổng quan hai sản phẩm'}`,
            },
          ],
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices[0].message.content;
        return NextResponse.json({ reply });
      }
    }

    // High-Logic Fallback Comparison Engine
    const userNeed = query ? query.toLowerCase() : '';
    const formatVND = (price: number) => 
      new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    let reply = `### 🐿️ Phân tích Tư duy Logic So sánh từ Sóc Mobile AI\n\n`;
    reply += `Dưới đây là kết quả phân tích so sánh đối đầu chi tiết giữa **${product1.name}** và **${product2.name}**:\n\n`;

    // Section 1: Comparison Table
    reply += `#### 📊 1. Bảng So Sánh Thông Số Cốt Lõi\n\n`;
    reply += `| Tiêu chí | ${product1.name} | ${product2.name} |\n`;
    reply += `| :--- | :--- | :--- |\n`;
    reply += `| **Giá niêm yết** | \`${formatVND(product1.price)}\` | \`${formatVND(product2.price)}\` |\n`;
    reply += `| **Màn hình** | ${product1.specs.screen} | ${product2.specs.screen} |\n`;
    reply += `| **Vi xử lý (Chip)** | ${product1.specs.chip} | ${product2.specs.chip} |\n`;
    reply += `| **Bộ nhớ RAM** | ${product1.specs.ram} | ${product2.specs.ram} |\n`;
    reply += `| **Thương hiệu** | ${product1.brand} | ${product2.brand} |\n\n`;

    // Section 2: Budget & Price Gap
    const priceDiff = Math.abs(product1.price - product2.price);
    reply += `#### 💰 2. Phân tích Chênh Lệch Ngân Sách\n`;
    if (product1.price > product2.price) {
      reply += `- **${product1.name}** có giá cao hơn **${product2.name}** khoảng **${formatVND(priceDiff)}**. Nếu bạn muốn tiết kiệm khoản tiền này để sắm thêm phụ kiện tai nghe, củ sạc thì **${product2.name}** là lựa chọn kinh tế hơn.\n\n`;
    } else if (product2.price > product1.price) {
      reply += `- **${product2.name}** có giá cao hơn **${product1.name}** khoảng **${formatVND(priceDiff)}**. **${product1.name}** mang lại P/P (Price/Performance) vô cùng tối ưu trong tầm giá.\n\n`;
    } else {
      reply += `- Cả hai siêu phẩm đều đang đồng mức giá **${formatVND(product1.price)}** tại Sóc Mobile, lựa chọn sẽ hoàn toàn phụ thuộc vào sở thích thiết kế và hệ điều hành của bạn.\n\n`;
    }

    // Section 3: Deep Intent Analysis based on User Need
    reply += `#### 🎯 3. Phân tích Chuyên Sâu Theo Nhu Cầu Của Bạn\n`;
    if (userNeed.includes('chơi game') || userNeed.includes('game') || userNeed.includes('genshin') || userNeed.includes('liên quân')) {
      reply += `Đối với nhu cầu **chơi game & chiến đồ họa nặng**:\n`;
      reply += `- **${product1.name}:** Chipset \`${product1.specs.chip}\` duy trì FPS ổn định, mượt mà khi combat đông người.\n`;
      reply += `- **${product2.name}:** Cấu hình \`${product2.specs.chip}\` đi kèm RAM \`${product2.specs.ram}\` hỗ trợ tản nhiệt và đa nhiệm xuất sắc.\n`;
      reply += `👉 **Khuyên dùng:** Nếu bạn ưu tiên sự tối ưu game của iOS/Android chip Snapdragon cao cấp, hãy chọn máy có điểm benchmark cao hơn.\n\n`;
    } else if (userNeed.includes('chụp ảnh') || userNeed.includes('quay phim') || userNeed.includes('camera') || userNeed.includes('vlog')) {
      reply += `Đối với nhu cầu **chụp ảnh, quay video Vlogging / TikTok**:\n`;
      reply += `- **${product1.name}:** Xử lý màu sắc ảnh tự nhiên, thu âm microphone sạch và chống rung quang học ổn định khi di chuyển.\n`;
      reply += `- **${product2.name}:** Tính năng xử lý ảnh AI thông minh, khả năng chụp đêm ấn tượng và zoom chi tiết.\n`;
      reply += `👉 **Khuyên dùng:** Chọn máy có khả năng quay phim chuẩn Studio nếu bạn làm sáng tạo nội dung video ngắn.\n\n`;
    } else if (userNeed.includes('pin') || userNeed.includes('sạc') || userNeed.includes('pin trâu')) {
      reply += `Đối với nhu cầu **pin trâu & độ bền sử dụng hàng ngày**:\n`;
      reply += `- **${product1.name}:** Thời lượng pin onscreen dài, tối ưu tiêu thụ điện năng ẩn rất tốt.\n`;
      reply += `- **${product2.name}:** Hỗ trợ công nghệ sạc nhanh ấn tượng giúp hồi pin cấp tốc trong giờ giải lao.\n\n`;
    } else {
      reply += `Đối với nhu cầu **sử dụng tổng quan (lướt web, làm việc, xem phim)**:\n`;
      reply += `- **${product1.name}** và **${product2.name}** đều hoàn thành xuất sắc các tác vụ cơ bản. Bạn hãy ưu tiên máy có kích thước màn hình và thương hiệu phù hợp với thói quen của mình.\n\n`;
    }

    // Section 4: Final Recommendation
    reply += `#### 💡 4. Lời Khuyên Chốt Hạ Từ Sóc Mobile\n`;
    reply += `- Choose **${product1.name}** nếu bạn yêu thích phong cách thiết kế của ${product1.brand} cùng chip \`${product1.specs.chip}\`.\n`;
    reply += `- Choose **${product2.name}** nếu bạn muốn trải nghiệm màn hình \`${product2.specs.screen}\` và bộ nhớ RAM \`${product2.specs.ram}\`.\n\n`;
    reply += `*Mẹo: Bạn có thể đặt cọc 5% giữ máy hoặc tham gia Thu cũ đổi mới trợ giá 1.000.000đ trực tiếp tại Showroom Sóc Mobile (Số 180 Nguyễn Trãi, Q. Thanh Xuân, Hà Nội).*`;

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
