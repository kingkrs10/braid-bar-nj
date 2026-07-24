'use client';

import React, { useState } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface StripePaymentProps {
  amount: number;
}

export function StripePayment({ amount }: StripePaymentProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock API processing timeout
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6 flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-espresso">Payment Completed</h3>
          <p className="text-xs text-charcoal/50 mt-1">Transaction processed successfully via Stripe.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePay} className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-espresso/70 text-sm font-semibold border-b border-espresso/5 pb-2 mb-2">
        <CreditCard className="w-4 h-4 text-gold-dark" />
        <span>Pay with Credit / Debit Card</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="stripe-card-num" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
          Card Number
        </label>
        <input
          id="stripe-card-num"
          type="text"
          required
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
          placeholder="4242 4242 4242 4242"
          maxLength={19}
          className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="stripe-expiry" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
            Expiration Date
          </label>
          <input
            id="stripe-expiry"
            type="text"
            required
            value={expiry}
            onChange={(e) => setExpiry(e.target.value.replace(/\s?/g, '').replace(/(\d{2})/g, '$1/').replace(/\/$/, '').trim())}
            placeholder="MM/YY"
            maxLength={5}
            className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="stripe-cvc" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
            CVC Code
          </label>
          <input
            id="stripe-cvc"
            type="password"
            required
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
            placeholder="•••"
            maxLength={3}
            className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <button
        type="submit"
        id="stripe-pay-btn"
        disabled={isProcessing}
        className="mt-4 bg-espresso hover:bg-espresso-light text-cream font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer text-center text-sm disabled:opacity-50"
      >
        {isProcessing ? 'Processing Payment...' : `Pay ${formatPrice(amount)}`}
      </button>
    </form>
  );
}
export default StripePayment;
