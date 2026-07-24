'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartStore, useBookingStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { CreditCard, Smartphone, ShieldCheck, DollarSign } from 'lucide-react';
import { StripePayment } from './StripePayment';
import { CashAppPayment } from './CashAppPayment';
import { ZellePayment } from './ZellePayment';

export function CheckoutFlow() {
  const searchParams = useSearchParams();
  const isBookingPayment = searchParams.get('booking') === 'true';

  const { items: cartItems, getTotal: getCartTotal } = useCartStore();
  const { selectedService, customerName, customerEmail } = useBookingStore();

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cashapp' | 'zelle'>('stripe');

  // Calculate pricing based on item checkout category
  const amount = isBookingPayment && selectedService ? selectedService.price : getCartTotal();
  const title = isBookingPayment ? 'Styling Booking Deposit' : 'Boutique Shopping Order';

  const methodsList = [
    { id: 'stripe' as const, name: 'Card / Apple Pay', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'cashapp' as const, name: 'Cash App Pay', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'zelle' as const, name: 'Zelle Manual', icon: <DollarSign className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {/* Checkout Form Content */}
      <div className="md:col-span-2 flex flex-col gap-6">
        <div className="glass-panel p-6">
          <h2 className="text-2xl font-[family-name:var(--font-display)] font-bold text-espresso mb-4">
            Select Payment Method
          </h2>
          
          {/* Method tabs selection bar */}
          <div className="flex items-center gap-2 border-b border-espresso/5 pb-4 mb-6">
            {methodsList.map((m) => {
              const isSelected = paymentMethod === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-gold text-espresso border-gold shadow-sm font-bold'
                      : 'hover:bg-cream/40 border-transparent text-espresso/60'
                  }`}
                >
                  {m.icon}
                  <span>{m.name}</span>
                </button>
              );
            })}
          </div>

          {/* Payment Method UI Switch */}
          <div className="mt-4">
            {paymentMethod === 'stripe' && <StripePayment amount={amount} />}
            {paymentMethod === 'cashapp' && <CashAppPayment amount={amount} />}
            {paymentMethod === 'zelle' && (
              <ZellePayment
                amount={amount}
                customerName={customerName || 'Boutique Customer'}
                customerEmail={customerEmail || 'hello@example.com'}
              />
            )}
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-2 justify-center text-charcoal/40 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>SSL Secured & encrypted checkout transaction gateway.</span>
        </div>
      </div>

      {/* Order Summary details */}
      <div className="glass-panel p-6 flex flex-col gap-4 bg-cream/10">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso border-b border-espresso/5 pb-2">
          {title}
        </h3>
        
        <div className="flex flex-col gap-3">
          {isBookingPayment && selectedService ? (
            <div className="flex justify-between items-center text-sm text-espresso/80">
              <span>{selectedService.name}</span>
              <span className="font-semibold">{formatPrice(selectedService.price)}</span>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.product_id}-${item.size}-${item.color}`} className="flex justify-between items-center text-sm text-espresso/80">
                <span className="line-clamp-1">{item.name} <strong className="text-xs text-charcoal/40">x{item.quantity}</strong></span>
                <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))
          )}

          <div className="h-[1px] bg-espresso/5 my-2" />
          
          <div className="flex justify-between items-center text-espresso font-bold">
            <span className="text-sm uppercase tracking-wider text-espresso/50">Total Amount</span>
            <span className="text-xl text-gold-dark">{formatPrice(amount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CheckoutFlow;
