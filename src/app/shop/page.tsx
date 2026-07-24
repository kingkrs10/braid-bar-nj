'use client';

import React from 'react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { ProductGrid } from '@/components/shop/ProductGrid';
import CartDrawer from '@/components/shop/CartDrawer';

export default function ShopPage() {
  return (
    <div className="relative min-h-screen bg-cream flex flex-col justify-between">
      <Navigation />
      <CartDrawer />

      <main className="flex-grow pt-28 pb-16 relative">
        {/* 90's decorative header area */}
        <div className="text-center mb-10 max-w-2xl mx-auto px-4">
          <span className="text-terracotta font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.4em] font-semibold mb-2 block">
            Braid Care &amp; Accessories
          </span>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-espresso mb-3">
            Shop Our Collection
          </h1>
          <p className="text-charcoal/60 text-sm leading-relaxed font-semibold">
            Carefully curated styles designed for beauty, luxury, and empowerment. Find your next statement piece.
          </p>
        </div>

        <ProductGrid />
      </main>

      <Footer />
    </div>
  );
}
