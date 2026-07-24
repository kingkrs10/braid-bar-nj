'use client';

import React from 'react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Scheduler from '@/components/booking/Scheduler';
import { ShieldCheck, Calendar, MapPin, Phone } from 'lucide-react';

export default function BookPage() {
  return (
    <div className="min-h-screen bg-warm-white text-espresso flex flex-col justify-between font-[family-name:var(--font-body)]">
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-cream border border-terracotta/30 text-espresso px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-terracotta" /> VIP Appointment Scheduling
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-espresso leading-tight">
            Schedule Your <span className="italic text-terracotta">Braid Experience</span>
          </h1>

          <p className="text-espresso/70 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Select your desired protective style, date, and appointment time slot below. A 25% booking deposit secures your VIP chair in West Orange, NJ.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-espresso/60 pt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-terracotta" /> 560 Valley Road, West Orange, NJ
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-terracotta" /> +1 (973) 972-9864
            </span>
          </div>
        </div>

        {/* Interactive Booking Scheduler Component */}
        <div id="appointment-scheduler" className="bg-white rounded-3xl border border-espresso/10 p-4 sm:p-8 shadow-xl">
          <Scheduler />
        </div>
      </main>

      <Footer />
    </div>
  );
}
