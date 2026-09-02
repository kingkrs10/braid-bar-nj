'use client';

import React, { useState, useEffect } from 'react';
import ShopNavigation from '@/components/shop/ShopNavigation';
import Footer from '@/components/ui/Footer';
import { AmazonProductGrid } from '@/components/shop/AmazonProductGrid';
import { DEFAULT_AMAZON_SHOP_TEXT, type AmazonShopText } from '@/lib/amazon-store-data';
import { Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function ShopPage() {
  const [shopText, setShopText] = useState<AmazonShopText>(DEFAULT_AMAZON_SHOP_TEXT);

  useEffect(() => {
    const loadText = () => {
      try {
        const saved = localStorage.getItem('bb_amazon_shop_text');
        if (saved) {
          const parsed = JSON.parse(saved);
          setShopText((prev) => ({ ...prev, ...parsed }));
        }
      } catch (e) {
        console.error('Failed to load Amazon shop text', e);
      }
    };

    loadText();
    window.addEventListener('bb_amazon_shop_text_updated', loadText);
    return () => window.removeEventListener('bb_amazon_shop_text_updated', loadText);
  }, []);

  return (
    <div className="relative min-h-screen bg-cream flex flex-col justify-between">
      {/* Dedicated Storefront Header (Isolated from Braid Bar salon navigation) */}
      <ShopNavigation />

      <main className="flex-grow pt-28 md:pt-32 pb-20 relative">
        {/* Decorative 90's Vogue Editorial Header with Dynamic CMS Copy */}
        <div className="text-center mb-10 max-w-3xl mx-auto px-4 space-y-4">
          {/* Stylist Endorsement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-[10px] uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{shopText.badge}</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-display)] font-bold text-espresso tracking-tight leading-[1.1]">
            {shopText.headline} <br className="hidden sm:inline" />
            <span className="italic font-normal text-terracotta">{shopText.headlineAccent}</span>
          </h1>

          {/* Subtitle with Stylist Guarantee */}
          <p className="text-espresso/70 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
            {shopText.subtitle}
          </p>

          {/* Amazon Affiliate Transparency Pill */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-espresso/50 font-light">
            <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
            <span>{shopText.disclosure}</span>
          </div>
        </div>

        {/* The Curated Shopable Grid */}
        <AmazonProductGrid />

        {/* Salon Assurance Footer Banner with Dynamic Copy */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="bg-white border border-espresso/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-terracotta/10 flex items-center justify-center text-terracotta flex-shrink-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">
                {shopText.adviceTitle}
              </h4>
              <p className="text-xs text-espresso/70 font-light leading-relaxed">
                {shopText.adviceBody}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
