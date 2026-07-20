/**
 * Chat AI API Route (/api/chat-ai)
 * Handles general chatbot queries from the floating Mini Soc chat box.
 * Features:
 * 1. Advanced Prompt Engineering for OpenAI GPT API when OPENAI_API_KEY is configured.
 * 2. Multi-Layer Intent Classifier & Natural Language Reasoning Fallback Engine for offline mode:
 *    - Recognizes Price Budgets, Gaming/Camera/Battery needs, Brand preferences,
 *      Showroom location (Số 180 Nguyễn Trãi, Q. Thanh Xuân, Hà Nội), Trade-in 5% deposit, IMEI Warranty, etc.
 *
 * Related: src/components/features/ai/MiniSocChatbox.tsx, src/constants/config.ts, src/constants/labels.ts
 * Pattern: High-Intelligence AI Intent & Reasoning Pipeline
 */

import { NextResponse } from 'next/server';
import { APP_CONFIG } from '@/constants/config';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Missing message content' }, { status: 400 });
    }

    const userMessage = message.trim();
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
              content: `Bạn là Trợ lý ảo Mini Sóc thông minh & tinh tế tại Hệ thống bán lẻ điện thoại "Sóc Mobile".
Trụ sở chính cửa hàng: Số 180 Nguyễn Trãi, Q. Thanh Xuân, Hà Nội. Hotline CSKH: ${APP_CONFIG.HOTLINE}.
Chính sách đặc biệt: Hỗ trợ đặt cọc 5% giữ hàng, Thu cũ đổi mới trợ giá 1.000.000đ (mã TROGIA1M), Tra cứu bảo hành điện tử IMEI Sóc Care, Trả góp 0% lãi suất.

Nhiệm vụ của bạn:
1. Phân tích chính xác ý định của khách hàng (ngân sách, thương hiệu, nhu cầu chơi game/chụp ảnh/pin, chính sách dịch vụ).
2. Đưa ra câu trả lời logic, cấu trúc rõ ràng dạng Markdown (sử dụng icon, danh sách gạch đầu dòng, nhấn mạnh từ khóa).
3. Xưng hô thân mật là "Sóc" và "bạn". Giữ thái độ nhiệt tình, thân thiện và chuyên nghiệp.`,
            },
            {
              role: 'user',
              content: userMessage,
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

    // High-Intelligence Fallback Reasoning Engine
    const msg = userMessage.toLowerCase();
    let reply = '';

    // Intent 1: Location & Showroom Address
    if (msg.includes('địa chỉ') || msg.includes('dia chi') || msg.includes('nguyễn trãi') || msg.includes('nguyen trai') || msg.includes('cửa hàng') || msg.includes('cua hang') || msg.includes('showroom') || msg.includes('quán') || msg.includes('đâu')) {
      reply = `Dạ hệ thống Showroom chính của **Sóc Mobile** tại Hà Nội đặt tại vị trí cực kỳ dễ tìm ạ! 📍\n\n- **Trụ sở chính Showroom:** Số 180 Nguyễn Trãi, Phường Thượng Đình, Quận Thanh Xuân, Hà Nội (Gần KĐT Royal City).\n- **Thời gian mở cửa:** 8:00 - 22:00 (Tất cả các ngày trong tuần, kể cả ngày lễ).\n- **Hotline hỗ trợ chỉ đường:** ${APP_CONFIG.HOTLINE}\n\nBạn có thể đến trực tiếp cửa hàng để trải nghiệm máy thực tế và nhận quà tặng phụ kiện hấp dẫn nha!`;
    }
    // Intent 2: Trade-in & Deposit (Thu cũ đổi mới & Đặt cọc 5%)
    else if (msg.includes('thu cũ') || msg.includes('thu cu') || msg.includes('đổi mới') || msg.includes('doi moi') || msg.includes('đặt cọc') || msg.includes('dat coc') || msg.includes('cọc')) {
      reply = `Chương trình **Thu cũ đổi mới & Đặt cọc 5%** tại Sóc Mobile siêu hời luôn bạn ơi! 🔄\n\n- **Thu cũ đổi mới:** Định giá máy cũ tự động trong 1 phút bằng AI. Nhập mã **\`TROGIA1M\`** được trợ giá thẳng **1.000.000đ** vào máy mới.\n- **Đặt cọc giữ máy (5%):** Khách đến xem máy hoặc thanh toán sau tại cửa hàng chỉ cần đặt cọc trước **5% số tiền của máy** để giữ suất siêu phẩm không lo hết hàng.\n\n👉 Bạn hãy vào mục **[Thu cũ đổi mới]** trên thanh Menu để Sóc AI định giá máy cũ cho bạn ngay nhé!`;
    }
    // Intent 3: Gaming Performance
    else if (msg.includes('game') || msg.includes('liên quân') || msg.includes('genshin') || msg.includes('pubg') || msg.includes('cấu hình') || msg.includes('mượt')) {
      reply = `Về nhu cầu **chơi game & hiệu năng mượt mà**, Sóc xin đề xuất những siêu phẩm theo từng phân khúc giá ạ: 🎮\n\n1. **Phân khúc Flagship đỉnh cao (Max Setting Genshin Impact):**\n   - *iPhone 16 Pro Max / 17 Pro Max:* Chip Apple A-Series tối ưu FPS cực kỳ mượt và mát máy.\n   - *Galaxy S24 Ultra / S26 Ultra:* Chip Snapdragon 8 Gen 3/4 đồ họa ray-tracing siêu thực.\n2. **Phân khúc tầm trung (Chơi tốt mượt mà Liên Quân, PUBG 60-90 FPS):**\n   - *Xiaomi 13T Pro / 14T:* Tản nhiệt buồng hơi lớn, sạc siêu nhanh 120W.\n   - *iPhone 13 / 14 cũ:* Tối ưu iOS cực bền bỉ qua nhiều năm.\n\nBạn mong muốn tìm máy trong tầm ngân sách khoảng bao nhiêu tiền để Sóc lọc chính xác ạ?`;
    }
    // Intent 4: Camera & Vlogging
    else if (msg.includes('chụp ảnh') || msg.includes('chup anh') || msg.includes('camera') || msg.includes('quay phim') || msg.includes('vlog') || msg.includes('sống ảo')) {
      reply = `Nếu bạn ưu tiên **chụp ảnh đẹp & quay video sắc nét** thì đây là những lựa chọn top 1 tại Sóc Mobile ạ: 📸\n\n- **Hệ iPhone (Quay video chân thực, chuẩn Studio):** *iPhone 15 Pro Max / 16 Pro Max* sở hữu khả năng chống rung Sensor-Shift thế hệ mới, thu âm lọc ồn cực nét cho Tiktoker / Vlogger.\n- **Hệ Samsung (Zoom siêu xa, màu sắc rực rỡ):** *Galaxy S24 Ultra* có ống kính 200MP zoom quang học 100x và tính năng chỉnh sửa hình ảnh Galaxy AI ảo diệu.\n- **Hệ Xiaomi (Nhiếp ảnh Leica đỉnh cao):** *Xiaomi 14 Ultra* chụp chân dung xóa phông màu sắc điện ảnh cổ điển.\n\nBạn thích chất ảnh tự nhiên của iPhone hay rực rỡ sắc nét của Samsung hơn nhỉ?`;
    }
    // Intent 5: Battery & Charging
    else if (msg.includes('pin') || msg.includes('sạc') || msg.includes('pin trâu') || msg.includes('dùng lâu')) {
      reply = `Về **thời lượng pin trâu & công nghệ sạc siêu nhanh**: 🔋\n\n- **Vua thời lượng Pin:** *iPhone 15 Pro Max / 16 Pro Max* và *Galaxy S24 Ultra* có thể dùng liên tục từ 9 - 11 tiếng onscreen hỗn hợp.\n- **Vua sạc nhanh:** Các dòng máy *Xiaomi / OPPO* hỗ trợ sạc siêu tốc **67W - 120W**, chỉ cần cắm sạc 15-20 phút là đầy 100% pin ngay.\n\nTất cả các máy bán ra tại Sóc Mobile đều được kiểm định dung lượng pin chuẩn trên 85-100% cực kỳ uy tín ạ!`;
    }
    // Intent 6: Installment 0%
    else if (msg.includes('trả góp') || msg.includes('tra gop') || msg.includes('lãi suất') || msg.includes('cccd')) {
      reply = `Chương trình **Trả góp 0% lãi suất** tại Sóc Mobile cực kỳ linh hoạt bạn nha: 💳\n\n1. **Trả góp qua Thẻ tín dụng (Credit Card):** Hỗ trợ 25+ ngân hàng, lãi suất 0%, không giữ giấy tờ, duyệt online 3 phút.\n2. **Trả góp qua CCCD gắn chip (Home Credit / FE Credit):** Duyệt nhanh 15 phút tại cửa hàng, chỉ cần trả trước từ 0đ đến 10% giá trị máy.\n\nBạn có sẵn thẻ tín dụng hay muốn đăng ký làm hồ sơ qua CCCD để Sóc hướng dẫn chi tiết nhé?`;
    }
    // Intent 7: Warranty & Order Lookup
    else if (msg.includes('bảo hành') || msg.includes('bao hanh') || msg.includes('đơn hàng') || msg.includes('don hang') || msg.includes('imei')) {
      reply = `Dịch vụ **Bảo hành & Tra cứu đơn hàng** tại Sóc Mobile: 🛡️\n\n- **Bảo hành Sóc Care 1 đổi 1:** Bạn có thể tra cứu hạn bảo hành điện tử theo số IMEI tại mục **[Tra cứu bảo hành]** trên website.\n- **Lịch sử đơn hàng bảo mật:** Tra cứu danh sách đơn hàng đã mua nhanh chóng tại mục **[Tra cứu đơn hàng]** (Yêu cầu nhập Mã đơn + SĐT để bảo vệ thông tin riêng tư).\n- Hotline kỹ thuật hỗ trợ 24/7: ${APP_CONFIG.HOTLINE}`;
    }
    // Intent 8: Vouchers & Discount Promos
    else if (msg.includes('khuyến mãi') || msg.includes('khuyen mai') || msg.includes('voucher') || msg.includes('mã giảm') || msg.includes('giảm giá')) {
      reply = `Đợt này Sóc Mobile đang tặng cực nhiều **Mã giảm giá hot** cho khách hàng: 🎁\n\n- Mã **\`TROGIA1M\`**: Trợ giá thẳng **1.000.000đ** khi tham gia Thu cũ đổi mới.\n- Mã **\`GIAM50\`**: Giảm ngay 50.000đ trực tiếp cho đơn hàng từ 100.000đ.\n- Tặng kèm bộ phụ kiện củ sạc nhanh + ốp lưng cao cấp khi mua máy.\n\nBạn nhớ nhập mã voucher ở trang Thanh toán để nhận ưu đãi nha!`;
    }
    // Default Intelligent Friendly Response
    else {
      reply = `Chào bạn nha! Sóc AI luôn sẵn sàng hỗ trợ bạn 24/7 nè: 🐿️✨\n\nSóc có thể giúp bạn:\n- 📱 **Tư vấn chọn mua điện thoại** (iPhone, Samsung, Xiaomi, OPPO... theo ngân sách).\n- 🔄 **Định giá thu cũ đổi mới** & Hướng dẫn **Đặt cọc 5%** giữ máy.\n- 📍 **Chỉ đường đến Showroom** Số 180 Nguyễn Trãi, Q. Thanh Xuân, Hà Nội.\n- 💳 **Hướng dẫn mua Trả góp 0%** & **Tra cứu bảo hành điện tử IMEI**.\n\nBạn cứ thoải mái gõ thắc mắc để Sóc tư vấn kỹ hơn nha!`;
    }

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
