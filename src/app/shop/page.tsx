'use client';

import React from 'react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { AmazonProductGrid } from '@/components/shop/AmazonProductGrid';
import { Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function ShopPage() {
  return (
    <div className="relative min-h-screen bg-cream flex flex-col justify-between">
      <Navigation />

      <main className="flex-grow pt-28 md:pt-32 pb-20 relative">
        {/* Decorative 90's Vogue Editorial Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto px-4 space-y-4">
          {/* Stylist Endorsement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-[10px] uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Braid Bar NJ • Sharon’s Curated Storefront</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-display)] font-bold text-espresso tracking-tight leading-[1.1]">
            Stylist-Approved <br className="hidden sm:inline" />
            <span className="italic font-normal text-terracotta">Amazon Hair &amp; Care</span>
          </h1>

          {/* Subtitle with Sharon's Guarantee */}
          <p className="text-espresso/70 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Skip the beauty supply store guessing game. Every product below is personally tested, approved, and recommended by <strong className="font-semibold text-espresso">Sharon French</strong> for your salon appointments, braid prep, and daily protective style health.
          </p>

          {/* Amazon Affiliate Transparency Pill */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-espresso/50 font-light">
            <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
            <span>Verified Amazon Associates Catalog • Safe &amp; Direct Prime Delivery</span>
          </div>
        </div>

        {/* The Curated Shopable Grid */}
        <AmazonProductGrid />

        {/* Salon Assurance Footer Banner */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="bg-white border border-espresso/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-terracotta/10 flex items-center justify-center text-terracotta flex-shrink-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">
                Have questions about hair color or texture matching?
              </h4>
              <p className="text-xs text-espresso/70 font-light leading-relaxed">
                Sharon and our stylists are always happy to advise. Send us a message or consultation inquiry before purchasing so you get the exact shade and length for your appointment.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
