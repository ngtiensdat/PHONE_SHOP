/**
 * HomeBanners Component
 * Renders the top hero slider and promotional sidebar blocks.
 * Encapsulates slide state management and auto-play interval effects.
 *
 * Related: src/app/page.tsx, src/constants/labels.ts
 * Pattern: Self-Contained UI Component
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { LABELS } from '@/constants/labels';

// Mock banners
const HERO_BANNERS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop',
    title: 'Galaxy S26 Ultra - Siêu Phẩm AI',
    sub: 'Đăng ký sớm nhận voucher 500k',
    link: '/products/samsung-galaxy-s26-ultra'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop',
    title: 'iPhone 17 Pro Max - Titanium',
    sub: 'Sở hữu ngay với trả góp 0%',
    link: '/products/iphone-17-pro-max'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
    title: 'Xiaomi 17T Pro - Vua Hiệu Năng',
    sub: 'Sạc nhanh 120W, đầy pin trong 19 phút',
    link: '/products/xiaomi-17t-pro-5g'
  }
];

const PROMO_SIDE_BANNERS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=400&auto=format&fit=crop',
    title: 'MacBook Pro M5',
    sub: 'Nay chỉ từ 35.990.000đ',
    link: '#'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop',
    title: 'Phụ kiện Apple',
    sub: 'Giảm đến 30% khi mua kèm',
    link: '#'
  }
];

export default function HomeBanners() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide Auto Play Effect
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_BANNERS.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  return (
    <section className="banner-grid-section">
      <div className="banner-grid-container">
        
        {/* Main Carousel Slider */}
        <div className="main-carousel">
          {HERO_BANNERS.map((banner, index) => (
            <div 
              key={banner.id} 
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 30%, transparent), url(${banner.image})` }}
            >
              <div className="slide-content">
                <span className="slide-tag">{LABELS.HOMEPAGE.EXCLUSIVE_TAG}</span>
                <h2>{banner.title}</h2>
                <p>{banner.sub}</p>
                <Link href={banner.link} className="btn btn-primary btn-sm">
                  {LABELS.HOMEPAGE.SEE_DETAILS} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
          
          {/* Slider Controls */}
          <button type="button" className="carousel-control prev" onClick={handlePrevSlide}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="carousel-control next" onClick={handleNextSlide}>
            <ChevronRight size={20} />
          </button>
          
          {/* Slider Indicators */}
          <div className="carousel-indicators">
            {HERO_BANNERS.map((_, index) => (
              <button 
                key={index} 
                type="button" 
                className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Side Static Banners */}
        <div className="side-banners">
          {PROMO_SIDE_BANNERS.map((banner) => (
            <div 
              key={banner.id} 
              className="side-banner-card"
              style={{ backgroundImage: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85)), url(${banner.image})` }}
            >
              <div className="side-banner-content">
                <h3>{banner.title}</h3>
                <p>{banner.sub}</p>
                <Link href={banner.link} className="side-banner-link">{LABELS.HOMEPAGE.BUY_NOW_PROMO} &rarr;</Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
