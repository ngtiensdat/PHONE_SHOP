/**
 * Chat AI API Route
 * Handles general chatbot queries from the floating Mini Soc chat box.
 * Connects to OpenAI Chat Completion API if OPENAI_API_KEY is defined;
 * falls back to a smart tech-support conversational system if the key is missing.
 *
 * Related: src/components/features/ai/MiniSocChatbox.tsx, src/constants/labels.ts
 * Pattern: Next.js App Router API Route with dynamic OpenAI fallback
 */

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Missing message content' }, { status: 400 });
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
                'Bạn là Trợ lý ảo Mini Sóc thông minh tại hệ thống cửa hàng "Sóc Mobile". Nhiệm vụ của bạn là tư vấn các dòng điện thoại, phụ kiện, giải đáp thắc mắc về giá bán, khuyến mãi, chính sách mua trả góp và bảo hành của Sóc Mobile. Hãy trả lời ngắn gọn, vui vẻ, sử dụng icon phù hợp và xưng hô thân mật là "Sóc" và "bạn".',
            },
            {
              role: 'user',
              content: message,
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

    // Fallback: Smart mock response engine for typical user questions
    const msg = message.toLowerCase();
    let reply = '';

    if (msg.includes('game') || msg.includes('chơi game') || msg.includes('liên quân') || msg.includes('genshin')) {
      reply = `Dạ chơi game thì Sóc khuyên bạn tham khảo các dòng cấu hình mạnh mẽ ạ! 🎮\n\n- **Tầm giá dưới 10 triệu:** Có dòng *Xiaomi 14T* chip Dimensity cực mát hoặc *iPhone 13 cũ* tối ưu game mượt.\n- **Tầm giá cao cấp:** *Galaxy S26 Ultra* sở hữu RAM lớn hoặc *iPhone 17 Pro Max* hiệu năng siêu khủng chiến mọi tựa game Genshin Max setting không giật lag!\n\nBạn có muốn Sóc lọc danh sách các sản phẩm hỗ trợ chơi game tốt ra không ạ?`;
    } else if (msg.includes('trả góp') || msg.includes('tra gop') || msg.includes('0%')) {
      reply = `Chương trình trả góp 0% bên Sóc Mobile cực kỳ dễ dàng luôn bạn ơi! 💸\n\n- **Trả góp qua thẻ tín dụng:** Hỗ trợ hơn 25 ngân hàng liên kết, thủ tục 3 không (không giữ giấy tờ, không xét duyệt lâu, lãi suất 0%).\n- **Trả góp qua công ty tài chính (Home Credit/FE Credit):** Chỉ cần CCCD gắn chip, xét duyệt nhanh chỉ trong 15 phút tại cửa hàng.\n\nĐặc biệt, bên Sóc hỗ trợ trả trước chỉ từ **0 đồng** luôn đó nha!`;
    } else if (msg.includes('chụp ảnh') || msg.includes('camera') || msg.includes('quay phim') || msg.includes('quay video')) {
      reply = `Về camera chụp ảnh và quay phim đỉnh cao thì đây là những đề xuất tốt nhất của Sóc: 📸\n\n1. **iPhone 17 Pro / Pro Max:** Quay video Cinematic cực đỉnh, màu da tự nhiên và camera trước Center Stage mới.\n2. **Galaxy S26 Ultra:** Camera 200MP zoom siêu xa 100x và các tính năng chỉnh sửa AI cực kỳ bá đạo.\n3. **Xiaomi 14 Ultra:** Hợp tác với hãng Leica danh tiếng cho chất ảnh nghệ thuật cổ điển.\n\nKhông biết bạn thích phong cách ảnh chân thực của iPhone hay sắc nét rực rỡ của Samsung thế nhỉ?`;
    } else if (msg.includes('bảo hành') || msg.includes('bao hanh') || msg.includes('đổi trả') || msg.includes('doi tra')) {
      reply = `Chính sách bảo hành tại Sóc Mobile siêu yên tâm luôn ạ: 🛡️\n\n- Máy mới chính hãng: Bảo hành **12 tháng** theo đúng tiêu chuẩn nhà sản xuất.\n- Máy cũ/like new: Bảo hành độc quyền **6 tháng** phần cứng tại hệ thống Sóc Mobile.\n- Lỗi là đổi: 1 đổi 1 trong **30 ngày đầu** nếu có lỗi từ nhà sản xuất.\n\nSóc còn có gói Bảo hành Vàng rơi vỡ, vào nước để bảo vệ toàn diện cho dế yêu của bạn nữa đó!`;
    } else if (msg.includes('khuyến mãi') || msg.includes('khuyen mai') || msg.includes('voucher') || msg.includes('giảm giá')) {
      reply = `Đợt này Sóc Mobile đang có siêu bão khuyến mãi đó bạn ơi! 🎉\n\n- Mã **GIAM50**: Giảm ngay 50.000đ cho đơn hàng từ 100.000đ.\n- Mã **SOC2K**: Giảm ngay 2.000đ khi test mua sản phẩm cáp sạc test 2k.\n- Hỗ trợ thu cũ đổi mới trợ giá lên tới **2 triệu đồng**.\n- Tặng kèm củ sạc nhanh và ốp lưng silicon khi mua điện thoại bất kỳ.\n\nBạn hãy cho sản phẩm vào giỏ hàng và nhập mã voucher ở bước thanh toán nha!`;
    } else {
      // General greeting/chit-chat
      reply = `Chào bạn nha! Sóc Mobile AI đây ạ. 🐿️\n\nSóc có thể giúp bạn tìm kiếm điện thoại chính hãng, so sánh thông số các dòng máy, tư vấn trả góp 0%, chính sách bảo hành hoặc cung cấp các mã giảm giá hời.\n\nBạn cứ thoải mái hỏi Sóc nha!`;
    }

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
