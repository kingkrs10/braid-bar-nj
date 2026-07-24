'use client';

import React, { Suspense } from 'react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';
import CartDrawer from '@/components/shop/CartDrawer';

export default function CheckoutPage() {
  return (
    <div className="relative min-h-screen bg-cream flex flex-col justify-between">
      <Navigation />
      <CartDrawer />

      <main className="flex-grow pt-28 pb-16">
         <div className="text-center mb-10 max-w-2xl mx-auto px-4">
          <span className="text-terracotta font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.3em] mb-2 block">
            Secure Payment Gateway
          </span>
          <h1 className="text-4xl font-[family-name:var(--font-display)] font-bold text-espresso mb-3">
            Secure Checkout
          </h1>
          <p className="text-charcoal/60 text-sm leading-relaxed">
            Please finalize order selections and complete purchase.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm text-espresso/60 font-semibold">Initializing checkout details...</p>
            </div>
          }
        >
          <CheckoutFlow />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
