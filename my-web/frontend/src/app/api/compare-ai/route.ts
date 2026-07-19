/**
 * Compare AI API Route
 * Handles comparison requests for two products matching a user need.
 * Connects to OpenAI Chat Completion API if OPENAI_API_KEY is defined;
 * falls back to a smart, rich custom comparison engine if the key is missing.
 *
 * Related: src/app/compare/page.tsx, src/store/useCompareStore.ts
 * Pattern: Next.js App Router API Route with dynamic OpenAI fallback
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
              content:
                'Bạn là chuyên gia tư vấn công nghệ tại hệ thống bán lẻ Sóc Mobile. Hãy trả lời bằng tiếng Việt thân thiện, chuyên nghiệp, so sánh khách quan và đưa ra lời khuyên thiết thực nhất cho nhu cầu của khách hàng.',
            },
            {
              role: 'user',
              content: `So sánh 2 thiết bị:
1. ${product1.name} (Thương hiệu: ${product1.brand}, Giá: ${product1.price} VND, Màn hình: ${product1.specs.screen}, Vi xử lý: ${product1.specs.chip}, RAM: ${product1.specs.ram})
2. ${product2.name} (Thương hiệu: ${product2.brand}, Giá: ${product2.price} VND, Màn hình: ${product2.specs.screen}, Vi xử lý: ${product2.specs.chip}, RAM: ${product2.specs.ram})

Nhu cầu sử dụng của tôi: ${query || 'So sánh tổng quan hai máy'}

Hãy phân tích chi tiết xem máy nào đáp ứng tốt hơn nhu cầu trên và đưa ra kết luận khuyên dùng.`,
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

    // Fallback: Smart, detailed mock comparison generator based on product names & query
    const userNeed = query ? query.toLowerCase() : '';
    let reply = '';

    const formatVND = (price: number) => 
      new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    reply += `### Phân tích Tư vấn từ Sóc Mobile AI 🐿️\n\n`;
    reply += `Chào bạn! Dưới đây là phân tích chi tiết so sánh giữa **${product1.name}** và **${product2.name}** dựa trên nhu cầu của bạn:\n\n`;

    // 1. Price comparison
    const priceDiff = Math.abs(product1.price - product2.price);
    if (product1.price > product2.price) {
      reply += `- **Về ngân sách:** ${product1.name} (${formatVND(product1.price)}) có giá cao hơn ${product2.name} (${formatVND(product2.price)}) khoảng **${formatVND(priceDiff)}**. Đây là một điểm đáng cân nhắc nếu bạn muốn tiết kiệm chi phí.\n`;
    } else if (product2.price > product1.price) {
      reply += `- **Về ngân sách:** ${product2.name} (${formatVND(product2.price)}) có mức giá cao hơn ${product1.name} (${formatVND(product1.price)}) khoảng **${formatVND(priceDiff)}**.\n`;
    } else {
      reply += `- **Về ngân sách:** Cả hai máy đều đang có mức giá bằng nhau tại Sóc Mobile (${formatVND(product1.price)}).\n`;
    }

    // 2. Hardware specs comparison
    reply += `- **Cấu hình phần cứng:** \n`;
    reply += `  + **${product1.name}** sở hữu vi xử lý \`${product1.specs.chip}\` đi kèm \`${product1.specs.ram}\` RAM cùng màn hình \`${product1.specs.screen}\`.\n`;
    reply += `  + **${product2.name}** sở hữu vi xử lý \`${product2.specs.chip}\` đi kèm \`${product2.specs.ram}\` RAM cùng màn hình \`${product2.specs.screen}\`.\n\n`;

    // 3. User need analysis
    reply += `#### Đánh giá theo nhu cầu sử dụng của bạn:\n`;
    if (userNeed.includes('chơi game') || userNeed.includes('game') || userNeed.includes('genshin') || userNeed.includes('liên quân')) {
      reply += `Đối với nhu cầu **chơi game**, hiệu năng thô và khả năng tản nhiệt là cực kỳ quan trọng:\n`;
      if (product1.specs.chip.toLowerCase().includes('a19') || product1.specs.chip.toLowerCase().includes('snapdragon')) {
        reply += `- **${product1.name}** dùng chip \`${product1.specs.chip}\` tối ưu game cực kỳ ổn định, fps cao và mượt mà trong thời gian dài. Màn hình \`${product1.specs.screen}\` sắc nét sẽ đem lại trải nghiệm đồ họa tuyệt vời.\n`;
      } else {
        reply += `- **${product1.name}** đáp ứng tốt các tựa game phổ biến (Liên Quân, Tốc Chiến) ở mức đồ họa cao.\n`;
      }
      if (product2.specs.chip.toLowerCase().includes('s26') || product2.specs.chip.toLowerCase().includes('ultra') || product2.specs.chip.toLowerCase().includes('snapdragon')) {
        reply += `- **${product2.name}** sở hữu cấu hình mạnh mẽ hàng đầu, đặc biệt là RAM \`${product2.specs.ram}\` giúp bạn chiến mượt các game nặng mà không lo tràn RAM.\n`;
      }
      reply += `\n👉 **Lời khuyên chơi game:** Cả hai máy đều là quái thú gaming, nhưng nếu bạn thích hệ sinh thái tối ưu tốt hãy chọn dòng chip cao cấp hơn.`;
    } else if (userNeed.includes('chụp ảnh') || userNeed.includes('quay phim') || userNeed.includes('camera') || userNeed.includes('quay video')) {
      reply += `Đối với nhu cầu **chụp ảnh và quay video**:\n`;
      reply += `- **${product1.name}** nổi bật với cảm biến xử lý hình ảnh chân thực, dải nhạy sáng rộng và hỗ trợ chống rung rất tốt khi quay vlog.\n`;
      reply += `- **${product2.name}** lại chiếm ưu thế với khả năng zoom quang học xa và bộ lọc màu nghệ thuật thời thượng.\n\n`;
      reply += `👉 **Lời khuyên nhiếp ảnh:** Chọn máy có khả năng quay video ổn định nếu bạn làm sáng tạo nội dung, hoặc chọn dòng máy có khả năng zoom chi tiết nếu hay chụp ngoại cảnh.`;
    } else if (userNeed.includes('pin') || userNeed.includes('sạc') || userNeed.includes('pin trâu') || userNeed.includes('grab')) {
      reply += `Đối với nhu cầu **pin trâu và sạc nhanh** để di chuyển cả ngày:\n`;
      reply += `- **${product1.name}** được tối ưu hóa phần mềm xuất sắc giúp kéo dài thời gian sử dụng thực tế.\n`;
      reply += `- **${product2.name}** hỗ trợ công nghệ sạc siêu nhanh giúp bạn sạc đầy lại năng lượng chỉ trong thời gian ngắn.\n\n`;
      reply += `👉 **Lời khuyên thời lượng pin:** Hãy cân nhắc giữa việc dùng lâu dài hay việc sạc lại năng tốc độ cao.`;
    } else {
      // General response
      reply += `Đối với nhu cầu chung hàng ngày (lướt web, làm việc, xem phim):\n`;
      reply += `- **${product1.name}** mang lại trải nghiệm vô cùng cân bằng, thiết kế sang trọng và cầm nắm đầm tay.\n`;
      reply += `- **${product2.name}** lại có màn hình lớn \`${product2.specs.screen}\` giúp xem nội dung đã mắt hơn.\n\n`;
      reply += `👉 **Lời khuyên tổng quan:** Nếu bạn thích màn hình lớn phục vụ giải trí đa phương tiện hãy chọn sản phẩm có kích thước lớn hơn, còn nếu ưu tiên sự gọn nhẹ hãy chọn sản phẩm còn lại.`;
    }

    reply += `\n\n*Lưu ý: Bạn có thể liên hệ hotline 1800.2097 hoặc trò chuyện với Trợ lý Sóc AI ở góc phải màn hình để nhận thêm ưu đãi độc quyền hôm nay!*`;

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
