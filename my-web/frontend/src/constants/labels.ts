/**
 * UI Labels Constants
 * Centralized registry for all user interface text strings.
 * Prevents hardcoding text directly in JSX files for clean structure and easy future i18n translation.
 *
 * Related: src/app/page.tsx, src/components/base/Header.tsx
 * Pattern: Unified constants file (Zero Hardcoding standard)
 */

export const LABELS = {
  COMMON: {
    HOME: 'Trang Chủ',
    PRODUCTS: 'Sản Phẩm',
    PROMOTIONS: 'Khuyến Mãi',
    CART: 'Giỏ Hàng',
    LOGIN: 'Đăng Nhập',
    LOGOUT: 'Đăng Xuất',
    REGISTER: 'Đăng Ký',
    DETAILS: 'Chi Tiết',
    BUY_NOW: 'Mua Ngay',
    ADD_TO_CART: 'Thêm vào giỏ',
    WARRANTY_POLICY: 'Chính Sách Bảo Hành',
    TERMS_OF_USE: 'Điều khoản sử dụng',
    PRIVACY_POLICY: 'Chính sách bảo mật',
    COPYRIGHT: 'Tất cả quyền được bảo lưu.',
    NO_DATA: 'Không có dữ liệu',
  },
  HERO: {
    BADGE_TEXT: 'Nâng tầm trải nghiệm!',
    TITLE_LINE_1: 'Thiết Kế Đột Phá.',
    TITLE_LINE_2: 'Công Nghệ Dẫn Đầu.',
    DESC: 'Trải nghiệm các dòng smartphone chính hãng mới nhất tích hợp công nghệ AI tối tân cùng chế độ hậu mãi cực kỳ đẳng cấp từ Sóc Mobile.',
    CTA_EXPLORE: 'Khám Phá Ngay',
  },
  SHOWCASE: {
    SHIPPING_TITLE: 'Giao Hàng Hỏa Tốc',
    SHIPPING_DESC: 'Nhận hàng chỉ trong 2 giờ tại các khu vực nội thành. Miễn phí vận chuyển cho hóa đơn từ 15 triệu.',
    GENUINE_TITLE: '100% Chính Hãng',
    GENUINE_DESC: 'Sản phẩm phân phối chính thức, nguyên seal. Đền tiền gấp 10 lần nếu phát hiện hàng giả, hàng nhái.',
    AI_TITLE: 'Trợ Lý AI So Sánh',
    AI_DESC: 'Hệ thống so sánh thông số cấu hình và tính năng vượt trội độc quyền hỗ trợ bởi trí tuệ nhân tạo.',
  },
  PRODUCTS: {
    SECTION_TITLE: 'SẢN PHẨM NỔI BẬT',
    OUT_OF_STOCK: 'Hết Hàng',
    IN_STOCK: 'Còn Hàng',
    LOW_STOCK: 'Sắp Hết',
  },
  AUTH: {
    LOGIN_TITLE: 'Chào mừng trở lại!',
    LOGIN_SUBTITLE: 'Đăng nhập tài khoản Sóc Mobile của bạn',
    LOGIN_BTN: 'Đăng Nhập',
    LOGGING_IN: 'Đang xử lý...',
    REGISTER_TITLE: 'Đăng ký thành viên',
    REGISTER_SUBTITLE: 'Trở thành thành viên Sóc Mobile để nhận nhiều ưu đãi',
    REGISTER_BTN: 'Đăng Ký Tài Khoản',
    REGISTERING: 'Đang đăng ký...',
    FULL_NAME: 'Họ và Tên *',
    EMAIL: 'Địa chỉ Email *',
    EMAIL_LOGIN: 'Địa chỉ Email',
    PHONE: 'Số điện thoại (10 chữ số)',
    PASSWORD: 'Mật khẩu *',
    PASSWORD_LOGIN: 'Mật khẩu',
    CONFIRM_PASSWORD: 'Nhập lại mật khẩu *',
    NO_ACCOUNT: 'Chưa có tài khoản?',
    ALREADY_ACCOUNT: 'Đã có tài khoản?',
    SIGNUP_NOW: 'Đăng ký ngay',
    SIGNIN_NOW: 'Đăng nhập ngay',
    BACK_TO_HOME: 'Quay về Trang chủ',
    ERROR_FILL_ALL: 'Vui lòng điền đầy đủ thông tin',
    ERROR_FILL_REQUIRED: 'Vui lòng điền đầy đủ các thông tin bắt buộc',
    ERROR_PASSWORD_MISMATCH: 'Mật khẩu nhập lại không trùng khớp',
    ERROR_PASSWORD_LENGTH: 'Mật khẩu phải chứa ít nhất 6 ký tự',
  },
};
