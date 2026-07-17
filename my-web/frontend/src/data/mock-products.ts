/**
 * Mock Featured Products
 * Automatically generated from Thế Giới Di Động Crawled V2 Dataset.
 *
 * Related: src/app/page.tsx, src/components/features/product/ProductCard.tsx
 */

export interface ProductVariant {
  storage: string;
  price: number;
  oldPrice: number;
}

export interface ProductSpecs {
  screen: string;
  chip: string;
  ram: string;
}

export interface MockProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  badge: string;
  badgeType: 'success' | 'warning' | 'danger' | 'info';
  image: string;
  brand: string;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  soldCount: string;
  promotionText: string;
  installment: boolean;
  fastDelivery: boolean;
  specs: ProductSpecs;
  variants: ProductVariant[];
}

export const FEATURED_PRODUCTS: MockProduct[] = [
  {
    "id": 361311,
    "name": "Laptop HP 15 fc0023AU - D0BH1PA (R5 7520U, 16GB, 512GB, Full HD, Win11)",
    "slug": "laptop-hp-15-fc0023au---d0bh1pa-r5-7520u-16gb-512gb-full-hd-win11",
    "description": "Sản phẩm Laptop HP 15 fc0023AU - D0BH1PA (R5 7520U, 16GB, 512GB, Full HD, Win11) chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 19990000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/361311/hp-15-fc0023au-r5-7520u-d0bh1pa-thumb-639030592238863081-600x600.jpg",
    "brand": "HP",
    "category": "Laptop",
    "tags": [
      "featured",
      "hp",
      "laptop"
    ],
    "rating": 4.9,
    "reviewCount": 600,
    "soldCount": "4, 5k",
    "promotionText": "Tặng balo cao cấp & Chuột không dây chính hãng. Giảm thêm 500k cho Học sinh - Sinh viên",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "RAM 16 GB",
      "chip": "SSD 512 GB",
      "ram": "16GB RAM"
    },
    "variants": [
      {
        "storage": "512GB SSD",
        "price": 19990000,
        "oldPrice": 23990000
      },
      {
        "storage": "1TB SSD",
        "price": 22988500,
        "oldPrice": 27588499
      }
    ]
  },
  {
    "id": 365217,
    "name": "Xiaomi Redmi Watch 6",
    "slug": "xiaomi-redmi-watch-6",
    "description": "Sản phẩm Xiaomi Redmi Watch 6 chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 2690000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/Products/Images/7077/365217/xiaomi-redmi-watch-6-den-600x600.jpg",
    "brand": "Xiaomi",
    "category": "Đồng hồ thông minh",
    "tags": [
      "featured",
      "xiaomi",
      "đồng hồ thông minh"
    ],
    "rating": 5,
    "reviewCount": 1050,
    "soldCount": "7, 2k",
    "promotionText": "Ưu đãi thanh toán quét mã QR & Miễn phí giao hàng hỏa tốc trong 2 giờ",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "OLED Screen",
      "chip": "Octa-Core CPU",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "Tiêu chuẩn",
        "price": 2690000,
        "oldPrice": 3190000
      }
    ]
  },
  {
    "id": 341804,
    "name": "Điện thoại Samsung Galaxy A07 6GB/128GB",
    "slug": "dien-thoai-samsung-galaxy-a07-6gb128gb",
    "description": "Sản phẩm Điện thoại Samsung Galaxy A07 6GB/128GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 3990000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/Products/Images/42/341804/samsung-galaxy-a07-black-thumbnew-600x600.jpg",
    "brand": "Samsung",
    "category": "Điện thoại",
    "tags": [
      "featured",
      "samsung",
      "điện thoại"
    ],
    "rating": 4.9,
    "reviewCount": 14550,
    "soldCount": "97, 4k",
    "promotionText": "Thu cũ đổi mới trợ giá lên đến 2 triệu đồng & Tặng gói bảo hành VIP 12 tháng 1 đổi 1",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "HD+",
      "chip": "6.7\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 3990000,
        "oldPrice": 4490000
      },
      {
        "storage": "256GB",
        "price": 4468800,
        "oldPrice": 5028800
      }
    ]
  },
  {
    "id": 363474,
    "name": "Laptop MacBook Air 13 inch M5 16GB/512GB/8GPU 30W",
    "slug": "laptop-macbook-air-13-inch-m5-16gb512gb8gpu-30w",
    "description": "Sản phẩm Laptop MacBook Air 13 inch M5 16GB/512GB/8GPU 30W chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 35290000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/Products/Images/44/363474/macbook-air-13-inch-m5-16gb-512gb-vang-600x600.jpg",
    "brand": "MacBook",
    "category": "Laptop",
    "tags": [
      "featured",
      "macbook",
      "laptop"
    ],
    "rating": 5,
    "reviewCount": 300,
    "soldCount": "2, 9k",
    "promotionText": "Tặng balo cao cấp & Chuột không dây chính hãng. Giảm thêm 500k cho Học sinh - Sinh viên",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "RAM 16 GB",
      "chip": "SSD 512 GB",
      "ram": "16GB RAM"
    },
    "variants": [
      {
        "storage": "512GB SSD",
        "price": 35290000,
        "oldPrice": 35990000
      },
      {
        "storage": "1TB SSD",
        "price": 40583500,
        "oldPrice": 41388500
      }
    ]
  },
  {
    "id": 335308,
    "name": "Máy tính bảng iPad A16 WiFi 128GB",
    "slug": "may-tinh-bang-ipad-a16-wifi-128gb",
    "description": "Sản phẩm Máy tính bảng iPad A16 WiFi 128GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 12490000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/Products/Images/522/335308/ipad-11-wifi-yellow-thumb-600x600.jpg",
    "brand": "iPad (Apple)",
    "category": "Máy tính bảng",
    "tags": [
      "featured",
      "ipad (apple)",
      "máy tính bảng"
    ],
    "rating": 4.9,
    "reviewCount": 7500,
    "soldCount": "50, 3k",
    "promotionText": "Tặng cường lực bao da thời trang & Giảm 30% khi mua kèm bút cảm ứng stylus",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "Retina IPS LCD",
      "chip": "11\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 12490000,
        "oldPrice": 12790000
      },
      {
        "storage": "256GB",
        "price": 13988800,
        "oldPrice": 14324800
      }
    ]
  },
  {
    "id": 344750,
    "name": "Apple Watch Series 11 GPS 42mm viền nhôm dây thể thao",
    "slug": "apple-watch-series-11-gps-42mm-vien-nhom-day-the-thao",
    "description": "Sản phẩm Apple Watch Series 11 GPS 42mm viền nhôm dây thể thao chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 9190000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/Products/Images/7077/344750/apple-watch-series-11-42mm-vien-nhom-day-the-thao-xam-600x600.jpg",
    "brand": "Apple",
    "category": "Đồng hồ thông minh",
    "tags": [
      "featured",
      "apple",
      "đồng hồ thông minh"
    ],
    "rating": 4.9,
    "reviewCount": 750,
    "soldCount": "5, 2k",
    "promotionText": "Ưu đãi thanh toán quét mã QR & Miễn phí giao hàng hỏa tốc trong 2 giờ",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "OLED Screen",
      "chip": "Octa-Core CPU",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "Tiêu chuẩn",
        "price": 9190000,
        "oldPrice": 11490000
      }
    ]
  },
  {
    "id": 343061,
    "name": "Máy tính bảng Samsung Galaxy Tab S10 Lite 5G 6GB/128GB",
    "slug": "may-tinh-bang-samsung-galaxy-tab-s10-lite-5g-6gb128gb",
    "description": "Sản phẩm Máy tính bảng Samsung Galaxy Tab S10 Lite 5G 6GB/128GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 9790000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/2026/07/timerseo/343061-600x600-1.jpg",
    "brand": "Samsung",
    "category": "Máy tính bảng",
    "tags": [
      "featured",
      "samsung",
      "máy tính bảng"
    ],
    "rating": 4.9,
    "reviewCount": 1350,
    "soldCount": "9, 6k",
    "promotionText": "Tặng cường lực bao da thời trang & Giảm 30% khi mua kèm bút cảm ứng stylus",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "TFT LCD",
      "chip": "10.9\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 9790000,
        "oldPrice": 11490000
      },
      {
        "storage": "256GB",
        "price": 10964800,
        "oldPrice": 12868800
      }
    ]
  },
  {
    "id": 356854,
    "name": "Máy tính bảng Xiaomi Redmi Pad 2 Pro WiFi 6GB/128GB",
    "slug": "may-tinh-bang-xiaomi-redmi-pad-2-pro-wifi-6gb128gb",
    "description": "Sản phẩm Máy tính bảng Xiaomi Redmi Pad 2 Pro WiFi 6GB/128GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 7590000,
    "badge": "Giảm 5%",
    "badgeType": "danger",
    "image": "https://cdn.tgdd.vn/2026/07/timerseo/356854-600x600-1.jpg",
    "brand": "Xiaomi",
    "category": "Máy tính bảng",
    "tags": [
      "featured",
      "xiaomi",
      "máy tính bảng"
    ],
    "rating": 4.9,
    "reviewCount": 900,
    "soldCount": "6k",
    "promotionText": "Tặng cường lực bao da thời trang & Giảm 30% khi mua kèm bút cảm ứng stylus",
    "installment": false,
    "fastDelivery": true,
    "specs": {
      "screen": "IPS LCD",
      "chip": "12.1\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 7590000,
        "oldPrice": 7990000
      },
      {
        "storage": "256GB",
        "price": 8500800,
        "oldPrice": 8948800
      }
    ]
  },
  {
    "id": 342755,
    "name": "Laptop Dell 15 DC15255 - DC5R5802W1 (R5 7530U, 16GB, 512GB, Full HD 120Hz, OfficeH24+365, Win11)",
    "slug": "laptop-dell-15-dc15255---dc5r5802w1-r5-7530u-16gb-512gb-full-hd-120hz-officeh24365-win11",
    "description": "Sản phẩm Laptop Dell 15 DC15255 - DC5R5802W1 (R5 7530U, 16GB, 512GB, Full HD 120Hz, OfficeH24+365, Win11) chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 19990000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/342755/dell-15-dc15255-r5-7530u-dc5r5802w1-thumb-638920698565049808-600x600.jpg",
    "brand": "Dell",
    "category": "Laptop",
    "tags": [
      "featured",
      "dell",
      "laptop"
    ],
    "rating": 5,
    "reviewCount": 450,
    "soldCount": "3, 1k",
    "promotionText": "Tặng balo cao cấp & Chuột không dây chính hãng. Giảm thêm 500k cho Học sinh - Sinh viên",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "RAM 16 GB",
      "chip": "SSD 512 GB",
      "ram": "16GB RAM"
    },
    "variants": [
      {
        "storage": "512GB SSD",
        "price": 19990000,
        "oldPrice": 20990000
      },
      {
        "storage": "1TB SSD",
        "price": 22988500,
        "oldPrice": 24138499
      }
    ]
  },
  {
    "id": 342679,
    "name": "Điện thoại iPhone 17 Pro Max 256GB",
    "slug": "dien-thoai-iphone-17-pro-max-256gb",
    "description": "Sản phẩm Điện thoại iPhone 17 Pro Max 256GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 35990000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/Products/Images/42/342679/iphone-17-pro-max-cam-thumb-600x600.jpg",
    "brand": "iPhone (Apple)",
    "category": "Điện thoại",
    "tags": [
      "featured",
      "iphone (apple)",
      "điện thoại"
    ],
    "rating": 4.9,
    "reviewCount": 42150,
    "soldCount": "281, 2k",
    "promotionText": "Thu cũ đổi mới trợ giá lên đến 2 triệu đồng & Tặng gói bảo hành VIP 12 tháng 1 đổi 1",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "Super Retina XDR",
      "chip": "6.9\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 35990000,
        "oldPrice": 37990000
      },
      {
        "storage": "256GB",
        "price": 40308800,
        "oldPrice": 42548800
      }
    ]
  },
  {
    "id": 339204,
    "name": "Máy tính bảng Xiaomi Redmi Pad 2 WiFi 4GB/128GB",
    "slug": "may-tinh-bang-xiaomi-redmi-pad-2-wifi-4gb128gb",
    "description": "Sản phẩm Máy tính bảng Xiaomi Redmi Pad 2 WiFi 4GB/128GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 5280000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/2026/07/timerseo/339204-600x600-1.jpg",
    "brand": "Xiaomi",
    "category": "Máy tính bảng",
    "tags": [
      "featured",
      "xiaomi",
      "máy tính bảng"
    ],
    "rating": 4.9,
    "reviewCount": 1500,
    "soldCount": "10, 5k",
    "promotionText": "Tặng cường lực bao da thời trang & Giảm 30% khi mua kèm bút cảm ứng stylus",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "IPS LCD",
      "chip": "11\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 5280000,
        "oldPrice": 6190000
      },
      {
        "storage": "256GB",
        "price": 5913600,
        "oldPrice": 6932800
      }
    ]
  },
  {
    "id": 360303,
    "name": "Điện thoại Xiaomi Redmi Note 15 8GB/128GB",
    "slug": "dien-thoai-xiaomi-redmi-note-15-8gb128gb",
    "description": "Sản phẩm Điện thoại Xiaomi Redmi Note 15 8GB/128GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 5790000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/2026/07/timerseo/360303.jpg",
    "brand": "Xiaomi",
    "category": "Điện thoại",
    "tags": [
      "featured",
      "xiaomi",
      "điện thoại"
    ],
    "rating": 4.9,
    "reviewCount": 8700,
    "soldCount": "58, 6k",
    "promotionText": "Thu cũ đổi mới trợ giá lên đến 2 triệu đồng & Tặng gói bảo hành VIP 12 tháng 1 đổi 1",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "Full HD+",
      "chip": "6.77\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 5790000,
        "oldPrice": 6490000
      },
      {
        "storage": "256GB",
        "price": 6484800,
        "oldPrice": 7268800
      }
    ]
  },
  {
    "id": 336899,
    "name": "Vòng đeo tay thông minh Mi Band 10 viền nhôm",
    "slug": "vong-deo-tay-thong-minh-mi-band-10-vien-nhom",
    "description": "Sản phẩm Vòng đeo tay thông minh Mi Band 10 viền nhôm chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 990000,
    "badge": "Giảm 15%",
    "badgeType": "danger",
    "image": "https://cdn.tgdd.vn/Products/Images/7077/336899/mi-band-10-den-600x600.jpg",
    "brand": "Xiaomi",
    "category": "Đồng hồ thông minh",
    "tags": [
      "featured",
      "xiaomi",
      "đồng hồ thông minh"
    ],
    "rating": 4.9,
    "reviewCount": 3600,
    "soldCount": "24, 2k",
    "promotionText": "Ưu đãi thanh toán quét mã QR & Miễn phí giao hàng hỏa tốc trong 2 giờ",
    "installment": false,
    "fastDelivery": true,
    "specs": {
      "screen": "OLED Screen",
      "chip": "Octa-Core CPU",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "Tiêu chuẩn",
        "price": 990000,
        "oldPrice": 1170000
      }
    ]
  },
  {
    "id": 337420,
    "name": "Laptop HP 245 G10 - B8PF9AT (R5 7530U, 8GB, 512GB, Full HD, Win11)",
    "slug": "laptop-hp-245-g10---b8pf9at-r5-7530u-8gb-512gb-full-hd-win11",
    "description": "Sản phẩm Laptop HP 245 G10 - B8PF9AT (R5 7530U, 8GB, 512GB, Full HD, Win11) chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 18990000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/337420/hp-245-g10-r5-b8pf9at-638828180409840419-600x600.jpg",
    "brand": "HP",
    "category": "Laptop",
    "tags": [
      "featured",
      "hp",
      "laptop"
    ],
    "rating": 4.9,
    "reviewCount": 750,
    "soldCount": "5, 8k",
    "promotionText": "Tặng balo cao cấp & Chuột không dây chính hãng. Giảm thêm 500k cho Học sinh - Sinh viên",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "RAM 8 GB",
      "chip": "SSD 512 GB",
      "ram": "16GB RAM"
    },
    "variants": [
      {
        "storage": "512GB SSD",
        "price": 18990000,
        "oldPrice": 21390000
      },
      {
        "storage": "1TB SSD",
        "price": 21838500,
        "oldPrice": 24598499
      }
    ]
  },
  {
    "id": 334436,
    "name": "Huawei Watch Fit 4 43mm dây silicone",
    "slug": "huawei-watch-fit-4-43mm-day-silicone",
    "description": "Sản phẩm Huawei Watch Fit 4 43mm dây silicone chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 2540000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/Products/Images/7077/334436/huawei-watch-fit-4-den-tb-600x600.jpg",
    "brand": "Huawei",
    "category": "Đồng hồ thông minh",
    "tags": [
      "featured",
      "huawei",
      "đồng hồ thông minh"
    ],
    "rating": 4.9,
    "reviewCount": 3000,
    "soldCount": "20, 6k",
    "promotionText": "Ưu đãi thanh toán quét mã QR & Miễn phí giao hàng hỏa tốc trong 2 giờ",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "OLED Screen",
      "chip": "Octa-Core CPU",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "Tiêu chuẩn",
        "price": 2540000,
        "oldPrice": 3030000
      }
    ]
  },
  {
    "id": 339207,
    "name": "Máy tính bảng Xiaomi Redmi Pad 2 4G 4GB/128GB",
    "slug": "may-tinh-bang-xiaomi-redmi-pad-2-4g-4gb128gb",
    "description": "Sản phẩm Máy tính bảng Xiaomi Redmi Pad 2 4G 4GB/128GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 6040000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/2026/07/timerseo/339207-600x600-1.jpg",
    "brand": "Xiaomi",
    "category": "Máy tính bảng",
    "tags": [
      "featured",
      "xiaomi",
      "máy tính bảng"
    ],
    "rating": 5,
    "reviewCount": 1650,
    "soldCount": "11, 3k",
    "promotionText": "Tặng cường lực bao da thời trang & Giảm 30% khi mua kèm bút cảm ứng stylus",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "IPS LCD",
      "chip": "11\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 6040000,
        "oldPrice": 6990000
      },
      {
        "storage": "256GB",
        "price": 6764800,
        "oldPrice": 7828800
      }
    ]
  },
  {
    "id": 354744,
    "name": "Laptop Acer Aspire Lite 15 AL15 42P R50R - NX.D34SV.004 (R5 7430U, 16GB, 512GB, Full HD, Win11)",
    "slug": "laptop-acer-aspire-lite-15-al15-42p-r50r---nxd34sv004-r5-7430u-16gb-512gb-full-hd-win11",
    "description": "Sản phẩm Laptop Acer Aspire Lite 15 AL15 42P R50R - NX.D34SV.004 (R5 7430U, 16GB, 512GB, Full HD, Win11) chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 15290000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/354744/acer-aspire-lite-15-al15-42p-r50r-r5-7430u-nxd34sv004-bac-thumb-638942356970285880-600x600.jpg",
    "brand": "Acer",
    "category": "Laptop",
    "tags": [
      "featured",
      "acer",
      "laptop"
    ],
    "rating": 4.9,
    "reviewCount": 150,
    "soldCount": "1, 8k",
    "promotionText": "Tặng balo cao cấp & Chuột không dây chính hãng. Giảm thêm 500k cho Học sinh - Sinh viên",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "RAM 16 GB",
      "chip": "SSD 512 GB",
      "ram": "16GB RAM"
    },
    "variants": [
      {
        "storage": "512GB SSD",
        "price": 15290000,
        "oldPrice": 16190000
      },
      {
        "storage": "1TB SSD",
        "price": 17583500,
        "oldPrice": 18618500
      }
    ]
  },
  {
    "id": 359086,
    "name": "Máy tính bảng Samsung Galaxy Tab A11+ WiFi 6GB/128GB",
    "slug": "may-tinh-bang-samsung-galaxy-tab-a11-wifi-6gb128gb",
    "description": "Sản phẩm Máy tính bảng Samsung Galaxy Tab A11+ WiFi 6GB/128GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 6790000,
    "badge": "Giảm 10%",
    "badgeType": "danger",
    "image": "https://cdn.tgdd.vn/2026/07/timerseo/359086-600x600-1.jpg",
    "brand": "Samsung",
    "category": "Máy tính bảng",
    "tags": [
      "featured",
      "samsung",
      "máy tính bảng"
    ],
    "rating": 5,
    "reviewCount": 750,
    "soldCount": "5, 2k",
    "promotionText": "Tặng cường lực bao da thời trang & Giảm 30% khi mua kèm bút cảm ứng stylus",
    "installment": false,
    "fastDelivery": true,
    "specs": {
      "screen": "TFT LCD",
      "chip": "11\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 6790000,
        "oldPrice": 7590000
      },
      {
        "storage": "256GB",
        "price": 7604800,
        "oldPrice": 8500800
      }
    ]
  },
  {
    "id": 334999,
    "name": "Laptop Acer Aspire Lite 15 AL15 41P R3QL - NX.J54SV.001 (R7 5700U, 8GB, 512GB, Full HD, Win11)",
    "slug": "laptop-acer-aspire-lite-15-al15-41p-r3ql---nxj54sv001-r7-5700u-8gb-512gb-full-hd-win11",
    "description": "Sản phẩm Laptop Acer Aspire Lite 15 AL15 41P R3QL - NX.J54SV.001 (R7 5700U, 8GB, 512GB, Full HD, Win11) chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 14490000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/334999/acer-aspire-lite-15-al15-41p-r3ql-r7-nxj54sv001-thumb-638828183898800384-600x600.jpg",
    "brand": "Acer",
    "category": "Laptop",
    "tags": [
      "featured",
      "acer",
      "laptop"
    ],
    "rating": 5,
    "reviewCount": 450,
    "soldCount": "3, 6k",
    "promotionText": "Tặng balo cao cấp & Chuột không dây chính hãng. Giảm thêm 500k cho Học sinh - Sinh viên",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "RAM 8 GB",
      "chip": "SSD 512 GB",
      "ram": "16GB RAM"
    },
    "variants": [
      {
        "storage": "512GB SSD",
        "price": 14490000,
        "oldPrice": 15490000
      },
      {
        "storage": "1TB SSD",
        "price": 16663499,
        "oldPrice": 17813500
      }
    ]
  },
  {
    "id": 336899,
    "name": "Vòng đeo tay thông minh Mi Band 10 viền nhôm",
    "slug": "vong-deo-tay-thong-minh-mi-band-10-vien-nhom",
    "description": "Sản phẩm Vòng đeo tay thông minh Mi Band 10 viền nhôm chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 990000,
    "badge": "Giảm 15%",
    "badgeType": "danger",
    "image": "https://cdn.tgdd.vn/Products/Images/7077/336899/mi-band-10-den-600x600.jpg",
    "brand": "Xiaomi",
    "category": "Đồng hồ thông minh",
    "tags": [
      "featured",
      "xiaomi",
      "đồng hồ thông minh"
    ],
    "rating": 4.9,
    "reviewCount": 3600,
    "soldCount": "24, 2k",
    "promotionText": "Ưu đãi thanh toán quét mã QR & Miễn phí giao hàng hỏa tốc trong 2 giờ",
    "installment": false,
    "fastDelivery": true,
    "specs": {
      "screen": "OLED Screen",
      "chip": "Octa-Core CPU",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "Tiêu chuẩn",
        "price": 990000,
        "oldPrice": 1170000
      }
    ]
  },
  {
    "id": 303891,
    "name": "Điện thoại iPhone 15 Plus 128GB",
    "slug": "dien-thoai-iphone-15-plus-128gb",
    "description": "Sản phẩm Điện thoại iPhone 15 Plus 128GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 19990000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/Products/Images/42/303891/iphone-15-plus-128gb-den-thumb-600x600.jpg",
    "brand": "iPhone (Apple)",
    "category": "Điện thoại",
    "tags": [
      "featured",
      "iphone (apple)",
      "điện thoại"
    ],
    "rating": 4.9,
    "reviewCount": 15900,
    "soldCount": "106k",
    "promotionText": "Thu cũ đổi mới trợ giá lên đến 2 triệu đồng & Tặng gói bảo hành VIP 12 tháng 1 đổi 1",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "Super Retina XDR",
      "chip": "6.7\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 19990000,
        "oldPrice": 21990000
      },
      {
        "storage": "256GB",
        "price": 22388800,
        "oldPrice": 24628800
      }
    ]
  },
  {
    "id": 329832,
    "name": "Xiaomi Redmi Watch 5 Lite 48.2mm dây TPU",
    "slug": "xiaomi-redmi-watch-5-lite-482mm-day-tpu",
    "description": "Sản phẩm Xiaomi Redmi Watch 5 Lite 48.2mm dây TPU chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 1190000,
    "badge": "Giảm 13%",
    "badgeType": "danger",
    "image": "https://cdn.tgdd.vn/Products/Images/7077/329832/redmi-watch-5-lite-den-tb-600x600.jpg",
    "brand": "Xiaomi",
    "category": "Đồng hồ thông minh",
    "tags": [
      "featured",
      "xiaomi",
      "đồng hồ thông minh"
    ],
    "rating": 4.9,
    "reviewCount": 3150,
    "soldCount": "21, 3k",
    "promotionText": "Ưu đãi thanh toán quét mã QR & Miễn phí giao hàng hỏa tốc trong 2 giờ",
    "installment": false,
    "fastDelivery": true,
    "specs": {
      "screen": "OLED Screen",
      "chip": "Octa-Core CPU",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "Tiêu chuẩn",
        "price": 1190000,
        "oldPrice": 1370000
      }
    ]
  },
  {
    "id": 341690,
    "name": "Điện thoại Samsung Galaxy A17 5G 8GB/256GB",
    "slug": "dien-thoai-samsung-galaxy-a17-5g-8gb256gb",
    "description": "Sản phẩm Điện thoại Samsung Galaxy A17 5G 8GB/256GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 7220000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/2026/07/timerseo/341690.jpg",
    "brand": "Samsung",
    "category": "Điện thoại",
    "tags": [
      "featured",
      "samsung",
      "điện thoại"
    ],
    "rating": 4.9,
    "reviewCount": 16500,
    "soldCount": "110k",
    "promotionText": "Thu cũ đổi mới trợ giá lên đến 2 triệu đồng & Tặng gói bảo hành VIP 12 tháng 1 đổi 1",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "Full HD+",
      "chip": "6.7\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 7220000,
        "oldPrice": 7990000
      },
      {
        "storage": "256GB",
        "price": 8086400,
        "oldPrice": 8948800
      }
    ]
  },
  {
    "id": 360246,
    "name": "Điện thoại OPPO A6x 4GB/128GB",
    "slug": "dien-thoai-oppo-a6x-4gb128gb",
    "description": "Sản phẩm Điện thoại OPPO A6x 4GB/128GB chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.",
    "price": 5390000,
    "badge": "Trả góp 0%",
    "badgeType": "success",
    "image": "https://cdn.tgdd.vn/2026/07/timerseo/360246.jpg",
    "brand": "OPPO",
    "category": "Điện thoại",
    "tags": [
      "featured",
      "oppo",
      "điện thoại"
    ],
    "rating": 4.9,
    "reviewCount": 8400,
    "soldCount": "56, 2k",
    "promotionText": "Thu cũ đổi mới trợ giá lên đến 2 triệu đồng & Tặng gói bảo hành VIP 12 tháng 1 đổi 1",
    "installment": true,
    "fastDelivery": true,
    "specs": {
      "screen": "HD+",
      "chip": "6.75\"",
      "ram": "8GB RAM"
    },
    "variants": [
      {
        "storage": "128GB",
        "price": 5390000,
        "oldPrice": 5990000
      },
      {
        "storage": "256GB",
        "price": 6036800,
        "oldPrice": 6708800
      }
    ]
  }
];
