'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Scissors, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ShopNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="shop-navigation"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none max-w-7xl mx-auto mt-4 px-4',
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md px-6 py-3.5 border border-espresso/15 rounded-full shadow-md'
          : 'bg-cream/90 backdrop-blur-md px-6 py-3 border border-espresso/10 rounded-full shadow-sm'
      )}
    >
      <div className="flex items-center justify-between">
        {/* Brand Logo with Storefront indicator */}
        <div className="flex items-center gap-3">
          <Link href="/shop" className="flex items-center select-none group py-0.5">
            <img
              src="/images/branding/logo-monogram-bb.png"
              alt="Braid Bar Logo"
              className="h-8 md:h-9 w-auto object-contain filter drop-shadow-sm transition-transform group-hover:scale-105"
            />
          </Link>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-terracotta leading-tight">
              Curated Storefront
            </span>
            <span className="text-[9px] text-espresso/50 font-light">
              Client-Chosen Amazon Hair &amp; Care
            </span>
          </div>
        </div>

        {/* Center / Stylist assurance */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-espresso/70 font-medium bg-white/70 px-3.5 py-1.5 rounded-full border border-espresso/10">
          <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
          <span>Sharon French’s Approved Products Only</span>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3">
          {/* Back to Salon link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-espresso/70 hover:text-espresso font-[family-name:var(--font-body)] text-[11px] tracking-wider uppercase transition-colors px-3 py-1.5 rounded-full hover:bg-white/60 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-terracotta" />
            <span className="hidden sm:inline">Back to</span> Salon Site
          </Link>

          {/* Book Appointment CTA */}
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 bg-terracotta hover:bg-espresso text-cream font-medium px-4 py-2 rounded-full transition-all text-[10px] uppercase tracking-[0.2em] border border-transparent shadow-sm"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default ShopNavigation;
