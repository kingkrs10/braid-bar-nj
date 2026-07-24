'use client';

import React from 'react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import PopUpApplicationForm from '@/components/shop/PopUpApplicationForm';
import CartDrawer from '@/components/shop/CartDrawer';

export default function PopUpApplyPage() {
  return (
    <div className="relative min-h-screen bg-cream flex flex-col justify-between">
      <Navigation />
      <CartDrawer />

      <main className="flex-grow pt-28 pb-16">
        <div className="text-center mb-6 max-w-2xl mx-auto px-4">
          <span className="text-terracotta font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.3em] mb-2 block">
            Makers &amp; Designers
          </span>
          <h1 className="text-4xl font-[family-name:var(--font-display)] font-bold text-espresso mb-3">
            Pop-Up Space Application
          </h1>
          <p className="text-espresso/60 text-sm leading-relaxed font-light">
            Partner with Braid Bar NJ. Apply to display your hair care products, accessories, or cosmetics brand in our West Orange retail space.
          </p>
        </div>

        <PopUpApplicationForm />
      </main>

      <Footer />
    </div>
  );
}
