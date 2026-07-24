'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Scissors, Mail, Phone, Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-espresso flex flex-col justify-between relative overflow-hidden select-none font-[family-name:var(--font-body)]">
      {/* Background Salon Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none bg-repeat"
        style={{ backgroundImage: "url('/images/branding/pattern-semicircle-lighttan.png')", backgroundSize: '160px' }}
      />

      {/* Top Bar with Address & Owner Login */}
      <header className="relative z-20 max-w-7xl mx-auto w-full p-6 flex justify-between items-center">
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-espresso/10 text-xs font-bold uppercase tracking-wider text-espresso shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-terracotta" /> 560 Valley Road, West Orange, NJ
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-espresso/60 hover:text-terracotta font-semibold tracking-wider uppercase transition-colors"
        >
          <Lock className="w-3.5 h-3.5" /> Owner Portal
        </Link>
      </header>

      {/* Main Center Content */}
      <main className="relative z-20 max-w-3xl mx-auto px-4 py-12 text-center flex flex-col items-center justify-center gap-8 my-auto">
        {/* Monogram / Stacked Logo */}
        <div className="relative w-fit select-none">
          <img
            src="/images/branding/logo-braidbar-stacked.png"
            alt="Braid Bar Logo"
            className="h-28 sm:h-36 md:h-44 w-auto object-contain filter drop-shadow-md"
          />
        </div>

        {/* Headline & Description */}
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-terracotta text-xs font-bold uppercase tracking-[0.3em] bg-terracotta/10 px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Launching Soon in West Orange
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl font-bold text-espresso leading-tight">
            Crafted Braids. Elevated Care. <span className="italic text-terracotta block mt-1">Everyday Luxury.</span>
          </h1>

          <p className="text-espresso/70 text-sm md:text-base font-light leading-relaxed">
            Our online booking calendar is currently preparing for launch. Get ready for precision parting, weightless protective length, and private VIP experiences.
          </p>
        </div>

        {/* Email VIP Interest Form */}
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-espresso/10 shadow-xl space-y-4">
          <div className="text-center space-y-1">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">
              Be First on the Calendar
            </h3>
            <p className="text-xs text-espresso/60 font-light">
              Enter your email to receive early access when appointment slots open!
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              🎉 You’re on the VIP list! We’ll notify you first.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-cream/30 border border-espresso/15 rounded-xl text-xs font-light outline-none focus:border-terracotta"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-terracotta hover:bg-espresso text-cream font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                Notify Me <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Direct WhatsApp Contact Button */}
        <div className="pt-4">
          <a
            href="https://wa.me/19739729864?text=Hi%20Sharon!%20I'm%20interested%20in%20booking%20an%20appointment%20at%20Braid%20Bar%20NJ!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-terracotta hover:text-espresso transition-colors bg-white/60 px-5 py-2.5 rounded-full border border-espresso/10"
          >
            <Phone className="w-3.5 h-3.5" /> Have questions? Chat with Sharon on WhatsApp
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full p-6 text-center text-xs text-espresso/50 border-t border-espresso/10">
        © {new Date().getFullYear()} Braid Bar NJ • 560 Valley Road, West Orange, NJ 07052
      </footer>
    </div>
  );
}
