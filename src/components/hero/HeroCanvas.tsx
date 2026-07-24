'use client';

import React from 'react';

/**
 * HeroCanvas
 * ==========
 * A beautiful, lightweight CSS-animated hero background
 * replacing the WebGL canvas. Uses floating soft gradient
 * orbs for a premium, modern aesthetic without 3D overhead.
 */

export default function HeroCanvas({ transparent = false }: { transparent?: boolean }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-10">
      {/* Soft gradient background */}
      {!transparent && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#F5F0E8] to-[#E5D3C8]/30" />
      )}

      {/* Floating ambient orbs */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full opacity-40 blur-3xl mix-blend-color"
        style={{
          background: 'radial-gradient(circle, #F4CFDD 0%, transparent 70%)',
          top: '5%',
          right: '-8%',
          animation: 'float-slow 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[450px] h-[450px] rounded-full opacity-30 blur-3xl mix-blend-color-burn"
        style={{
          background: 'radial-gradient(circle, #F2912E 0%, transparent 70%)',
          bottom: '10%',
          left: '-5%',
          animation: 'float-slow 25s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-25 blur-3xl mix-blend-color"
        style={{
          background: 'radial-gradient(circle, #E56139 0%, transparent 70%)',
          top: '35%',
          left: '25%',
          animation: 'float-slow 18s ease-in-out infinite',
        }}
      />

      {/* Subtle decorative lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0 400 Q 300 200, 600 400 T 1200 400"
          stroke="#3C2415"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 420 Q 300 220, 600 420 T 1200 420"
          stroke="#C9A96E"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0 440 Q 300 240, 600 440 T 1200 440"
          stroke="#C67B5C"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
export { HeroCanvas };
