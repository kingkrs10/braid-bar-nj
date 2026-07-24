'use client';

import React, { useState } from 'react';
import { DollarSign, ShieldAlert, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface ZellePaymentProps {
  amount: number;
  customerName: string;
  customerEmail: string;
}

export function ZellePayment({ amount, customerName, customerEmail }: ZellePaymentProps) {
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const phone = process.env.NEXT_PUBLIC_ZELLE_PHONE || '(973) 555-0199';
  const businessName = process.env.NEXT_PUBLIC_ZELLE_BUSINESS_NAME || 'Braid Bar NJ';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/checkout/zelle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zelleTransactionId: transactionId,
          customerName,
          customerEmail,
          amount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6 flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-espresso">Transaction Submitted</h3>
          <p className="text-xs text-charcoal/60 leading-relaxed max-w-sm mt-1 mx-auto">
            Your transaction ID <strong>{transactionId}</strong> has been submitted. Our admin team will verify it manually against our bank statements and notify you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Zelle visual header */}
      <div className="flex items-center gap-2 text-[#7414CA] text-sm font-semibold border-b border-[#7414CA]/10 pb-2 mb-2">
        <DollarSign className="w-4 h-4" />
        <span>Pay with Zelle (Manual Verification)</span>
      </div>

      {/* Instructions */}
      <div className="p-4 rounded-xl bg-[#7414CA]/5 border border-[#7414CA]/10 text-[#7414CA] text-xs flex flex-col gap-3">
        <p className="font-bold">Instructions to pay via Zelle:</p>
        <ol className="list-decimal list-inside flex flex-col gap-1.5 leading-relaxed pl-1 text-charcoal/80">
          <li>Open your bank app and navigate to Zelle.</li>
          <li>Send the exact total <strong>{formatPrice(amount)}</strong> to:</li>
          <div className="p-2.5 bg-warm-white/70 border border-[#7414CA]/20 rounded-lg flex flex-col gap-1 text-espresso font-semibold text-xs my-1 font-mono">
            <p>Phone: {phone}</p>
            <p>Recipient: {businessName}</p>
          </div>
          <li>Complete the transfer and copy the <strong>Transaction ID / Reference Number</strong>.</li>
          <li>Enter that ID below and submit for validation.</li>
        </ol>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl">
          {errorMsg}
        </div>
      )}

      {/* Submission ID */}
      <div className="flex flex-col gap-1.5 mt-2">
        <label htmlFor="zelle-txn-input" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
          Zelle Transaction Confirmation ID
        </label>
        <input
          id="zelle-txn-input"
          type="text"
          required
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value.trim())}
          placeholder="Ref: 1234567890"
          className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
        />
      </div>

      <div className="flex items-center gap-2 text-amber-700 text-[10px] bg-amber-50 p-3 rounded-xl">
        <ShieldAlert className="w-4 h-4 flex-shrink-0" />
        <span>Submitting false IDs will lead to cancellation of appointments and orders.</span>
      </div>

      <button
        type="submit"
        id="zelle-verify-btn"
        disabled={isSubmitting}
        className="mt-2 bg-[#7414CA] hover:bg-[#610fae] text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer text-center text-sm disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting ID...' : 'Submit Transaction ID'}
      </button>
    </form>
  );
}
export default ZellePayment;
