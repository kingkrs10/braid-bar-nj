'use client';

import React, { useState } from 'react';
import { Smartphone, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface CashAppPaymentProps {
  amount: number;
}

export function CashAppPayment({ amount }: CashAppPaymentProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [cashtag, setCashtag] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);

    // Mock Square Cash App tokenization transition
    setTimeout(() => {
      setIsConnecting(false);
      setIsCompleted(true);
    }, 1500);
  };

  if (isCompleted) {
    return (
      <div className="text-center py-6 flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-espresso">Cash App Pay Success</h3>
          <p className="text-xs text-charcoal/50 mt-1">Transaction completed with Square Web Payments SDK.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePay} className="flex flex-col gap-4">
      {/* Cash App visual header */}
      <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold border-b border-emerald-500/10 pb-2 mb-2">
        <Smartphone className="w-4 h-4" />
        <span>Pay with Cash App Pay</span>
      </div>

      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-800 text-xs flex flex-col gap-2">
        <p className="font-semibold">Seamless mobile checkout:</p>
        <p>Square SDK automatically launches Cash App on your mobile device to authorize this {formatPrice(amount)} payment.</p>
      </div>

      <div className="flex flex-col gap-1.5 mt-2">
        <label htmlFor="cashtag-input" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
          Your $Cashtag
        </label>
        <input
          id="cashtag-input"
          type="text"
          required
          value={cashtag}
          onChange={(e) => setCashtag(e.target.value.startsWith('$') ? e.target.value : '$' + e.target.value)}
          placeholder="$janedoe"
          className="px-4 py-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-espresso text-sm focus:outline-none focus:border-emerald-500"
        />
      </div>

      <button
        type="submit"
        id="cashapp-pay-btn"
        disabled={isConnecting}
        className="mt-4 bg-[#00D632] hover:bg-[#00b52a] text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer text-center text-sm disabled:opacity-50"
      >
        {isConnecting ? 'Connecting Cash App...' : 'Pay with Cash App'}
      </button>
    </form>
  );
}
export default CashAppPayment;
