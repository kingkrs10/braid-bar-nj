'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { CreditCard, ShieldCheck, Calendar, Info } from 'lucide-react';

export function Checkout() {
  const {
    selectedService,
    getBookingTotal,
    getDepositAmount,
    cancellationPolicyAgreed,
    setCancellationPolicyAgreed,
    setStep,
    setSubmitting,
    isSubmitting,
    customerName,
  } = useBookingStore();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const deposit = getDepositAmount();
  const total = getBookingTotal();

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancellationPolicyAgreed) {
      setErrorMsg('You must agree to the cancellation and late fees policy.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    // Mocking Stripe Elements payment gateway token verification
    setTimeout(() => {
      setSubmitting(false);
      setStep('confirmation');
    }, 1800);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      {/* Invoice Details card */}
      <div className="glass-panel p-6 bg-cream/10 border-gold/15">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso border-b border-espresso/5 pb-2 mb-3">
          Deposit Summary
        </h3>
        <div className="flex flex-col gap-2.5 text-sm text-espresso/80">
          <div className="flex justify-between">
            <span>Base Service</span>
            <span className="font-semibold">{selectedService ? formatPrice(selectedService.price) : '$0.00'}</span>
          </div>
          <div className="flex justify-between text-xs text-charcoal/50">
            <span>Mandatory Non-Refundable Booking Deposit</span>
            <span className="font-semibold text-espresso">{formatPrice(deposit)}</span>
          </div>
          <div className="h-[1px] bg-espresso/5 my-1" />
          <div className="flex justify-between text-espresso font-bold">
            <span>Total Value</span>
            <span className="text-gold-dark">{formatPrice(total)}</span>
          </div>
          <p className="text-[10px] text-charcoal/45 flex items-start gap-1.5 mt-2 bg-gold/5 p-2.5 rounded-lg border border-gold/10 leading-normal">
            <Info className="w-3.5 h-3.5 text-gold-dark flex-shrink-0 mt-0.5" />
            <span>
              Your non-refundable deposit of **{formatPrice(deposit)}** is charged immediately. The remaining balance of **{formatPrice(total - deposit)}** will be paid at the salon after styling completion.
            </span>
          </p>
        </div>
      </div>

      {/* Stripe Payment Form */}
      <form onSubmit={handlePay} className="glass-panel p-6 flex flex-col gap-4 border-espresso/10">
        <div className="flex items-center gap-2 text-espresso/70 text-xs font-semibold uppercase tracking-wider border-b border-espresso/5 pb-2 mb-2">
          <CreditCard className="w-4 h-4 text-gold-dark" />
          <span>Secured Credit Card Gateway</span>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="card-num" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
            Card Number
          </label>
          <input
            id="card-num"
            type="text"
            required
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/10 text-espresso text-sm focus:outline-none focus:border-gold"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="card-expiry" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
              Expiration Date
            </label>
            <input
              id="card-expiry"
              type="text"
              required
              value={expiry}
              onChange={(e) => setExpiry(e.target.value.replace(/\s?/g, '').replace(/(\d{2})/g, '$1/').replace(/\/$/, '').trim())}
              placeholder="MM/YY"
              maxLength={5}
              className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/10 text-espresso text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="card-cvc" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
              CVC Security Code
            </label>
            <input
              id="card-cvc"
              type="password"
              required
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
              placeholder="•••"
              maxLength={3}
              className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/10 text-espresso text-sm focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Cancellation Agreement Checkbox */}
        <div className="flex items-start gap-2.5 mt-2">
          <input
            id="policy-checkbox"
            type="checkbox"
            checked={cancellationPolicyAgreed}
            onChange={(e) => setCancellationPolicyAgreed(e.target.checked)}
            className="w-4 h-4 rounded border-espresso/10 text-gold focus:ring-gold accent-gold flex-shrink-0 mt-0.5 cursor-pointer"
          />
          <label htmlFor="policy-checkbox" className="text-[11px] text-charcoal/70 leading-normal cursor-pointer select-none">
            I agree to the non-refundable deposit terms, the 24-hour cancellation policy, and understand that late appointments exceeding 15 minutes may incur fee penalties.
          </label>
        </div>

        <button
          type="submit"
          id="checkout-pay-btn"
          disabled={isSubmitting || !cancellationPolicyAgreed}
          className="mt-4 bg-gold hover:bg-gold-dark text-espresso font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer text-center text-xs uppercase tracking-widest shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{isSubmitting ? 'Securing Slot...' : `Pay Deposit ${formatPrice(deposit)}`}</span>
        </button>
      </form>
    </div>
  );
}
export default Checkout;
