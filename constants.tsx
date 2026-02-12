
import React from 'react';

export const COLORS = {
  NAVY: '#00205B', // FEN Navy
  BLUE: '#00A3E0', // FEN Blue
  GOLD: '#C5A059', // Aged Gold
  WHITE: '#FFFFFF',
  CHECKER_LIGHT: '#f3f4f6',
  CHECKER_DARK: '#e5e7eb',
};

export const MasonicIcons = {
  // The Square and Compasses - Universal symbol
  SquareAndCompass: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 4L4 20h16L12 4z" />
      <circle cx="12" cy="13" r="2" />
      <path d="M7 16l5-5 5 5" />
    </svg>
  ),
  // The Pillars Jachin and Boaz
  Pillars: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="4" y="6" width="3" height="14" rx="0.5" />
      <circle cx="5.5" cy="4.5" r="1.5" />
      <rect x="17" y="6" width="3" height="14" rx="0.5" />
      <circle cx="18.5" cy="4.5" r="1.5" />
      <line x1="2" y1="20" x2="22" y2="20" strokeWidth="2" />
    </svg>
  ),
  // The Owl (Wisdom/FEN)
  Owl: ({ size = 40, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2c-4 0-6 2-6 6 0 2 1 4 3 5-2 3-3 7-3 7h12s-1-4-3-7c2-1 3-3 3-5 0-4-2-6-6-6z" />
      <circle cx="9" cy="8" r="1.5" />
      <circle cx="15" cy="8" r="1.5" />
      <path d="M11 11l1 1 1-1" />
      <path d="M9 18h6" />
    </svg>
  ),
  // Three Dots (∴) - Often used in masonic abbreviations
  ThreeDots: ({ className = "" }) => (
    <span className={`inline-flex flex-col items-center leading-none ${className}`} style={{ fontSize: '1.2em', verticalAlign: 'middle' }}>
      <span>.</span>
      <span className="flex gap-1 -mt-2"><span>.</span><span>.</span></span>
    </span>
  ),
  // The All-Seeing Eye (Subtle)
  Eye: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5V3M12 21v-2M5 5l1.5 1.5M19 19l-1.5-1.5M5 19l1.5-1.5M19 5l-1.5 1.5M2 12h2M22 12h-2" />
    </svg>
  )
};
