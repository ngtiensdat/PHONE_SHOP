/**
 * SafeImage Component
 * Base component that wraps next/image to prevent runtime crashes caused by loading images from non-whitelisted domains.
 * Automatically falls back to standard <img> tag if the domain is not whitelisted, and to a vector placeholder on error.
 *
 * Related: next.config.ts, src/app/globals.css
 * Pattern: Wrapper component with validation and fallback
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

const WHITELISTED_DOMAINS = [
  'localhost',
  'res.cloudinary.com',
  'picsum.photos',
  'images.unsplash.com',
];

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = '/placeholder-phone.svg',
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [useHtmlImg, setUseHtmlImg] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!src) {
      setImgSrc(fallbackSrc);
      return;
    }

    const srcStr = typeof src === 'string' ? src : '';

    if (srcStr.startsWith('http://') || srcStr.startsWith('https://')) {
      try {
        const url = new URL(srcStr);
        const domain = url.hostname;

        // Check if the domain is in our whitelist
        const isWhitelisted = WHITELISTED_DOMAINS.some(
          (allowed) => domain === allowed || domain.endsWith(`.${allowed}`)
        );

        if (!isWhitelisted) {
          // If not whitelisted, fall back to standard HTML <img> to avoid Next.js Image Optimization limits
          setUseHtmlImg(true);
        }
      } catch {
        setUseHtmlImg(true);
      }
    }

    setImgSrc(srcStr);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      setUseHtmlImg(true); // Switch to HTML img just in case the fallback is external too
    }
  };

  if (useHtmlImg || !imgSrc) {
    // Standard HTML Image tag fallback
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={imgSrc || fallbackSrc}
        alt={alt || 'Phone image'}
        onError={handleError}
        style={{
          objectFit: (props.style?.objectFit as any) || 'cover',
          width: props.fill ? '100%' : props.width,
          height: props.fill ? '100%' : props.height,
        }}
        className={props.className}
      />
    );
  }

  // Next.js Optimized Image
  return (
    <Image
      src={imgSrc}
      alt={alt || 'Phone image'}
      onError={handleError}
      {...props}
    />
  );
}
