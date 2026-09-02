'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Phone, Mail, MapPin, Facebook } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const wappLink = getWhatsAppLink({
    serviceName: 'General Styling / Inquiry',
    date: 'Selected Date',
    time: 'Selected Time',
    customerName: 'Customer Inquiry',
  });

  return (
    <footer className="bg-espresso text-cream pt-16 pb-8 border-t border-espresso/15 relative overflow-hidden">
      {/* Subtle line decoration */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-cream/5" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 relative z-10">
        {/* Brand details */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="group flex items-center py-1">
            <span className="font-[family-name:var(--font-display)] text-sm md:text-base font-normal tracking-[0.25em] text-[#E8A598] uppercase group-hover:text-cream transition-colors">
              BRAID BAR
            </span>
          </Link>
          <p className="text-cream/60 text-xs font-[family-name:var(--font-body)] leading-relaxed font-light">
            West Orange's premier protective styling sanctuary. Offering precision knotless braids, feed-in cornrows, custom twists, and premium natural hair treatments directed by Sharon French.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Link
              href="https://www.instagram.com/braidbarnj"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-cream/5 hover:bg-clay-rose/10 rounded-full text-clay-rose hover:text-white transition-all duration-200 border border-cream/10 hover:border-clay-rose hover:scale-105"
              aria-label="Instagram Page"
            >
              <Instagram className="w-4 h-4" />
            </Link>

            {/* Facebook */}
            <Link
              href="https://facebook.com/braidbarnj"
              className="p-2.5 bg-cream/5 hover:bg-clay-rose/10 rounded-full text-clay-rose hover:text-white transition-all duration-200 border border-cream/10 hover:border-clay-rose hover:scale-105"
              aria-label="Facebook Page"
            >
              <Facebook className="w-4 h-4" />
            </Link>

            {/* TikTok */}
            <Link
              href="https://tiktok.com/@braidbarnj"
              className="p-2.5 bg-cream/5 hover:bg-clay-rose/10 rounded-full text-clay-rose hover:text-white transition-all duration-200 border border-cream/10 hover:border-clay-rose hover:scale-105"
              aria-label="TikTok Page"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.42-.43-.61-.67-.02 2.44-.02 4.87-.01 7.31-.04 2.87-1.31 5.72-3.83 7.15-2.52 1.48-5.91 1.55-8.5 0-2.61-1.52-3.95-4.57-3.69-7.57.25-3.03 2.5-5.83 5.53-6.4 1.11-.21 2.27-.14 3.35.21v4.12c-.93-.41-2.02-.37-2.91.13-.91.5-1.55 1.48-1.63 2.53-.13 1.53.94 3.01 2.47 3.23 1.53.22 3.12-.76 3.42-2.27.08-.38.07-.78.07-1.17 0-4.04-.01-8.08-.01-12.12-.01-.31-.01-.62-.02-.92Z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-sm md:text-base font-normal tracking-[0.25em] text-[#E8A598] mb-4 uppercase">
            NAVIGATION
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-cream/70 font-light">
            {[
              { name: 'Home', href: '/' },
              { name: 'Lookbook Gallery', href: '/#lookbook' },
              { name: 'Shop Care & Accessories', href: '/shop' },
              { name: 'Membership', href: '/#membership' },
              { name: 'Events & Contact', href: '/#events' },
              { name: 'Owner Portal (Admin)', href: '/admin' },
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-clay-rose transition-colors inline-block">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Lookbook link */}
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-sm md:text-base font-normal tracking-[0.25em] text-[#E8A598] mb-4 uppercase">
            LOOKBOOK
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-cream/70 font-light">
            <li>
              <a 
                href="/The-Braid-Bar-NJ-Lookbook.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cream hover:text-terracotta underline transition-colors font-medium decoration-terracotta/40"
              >
                View Digital Lookbook (PDF) →
              </a>
            </li>
          </ul>
        </div>

        {/* Connect / Info */}
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-sm md:text-base font-normal tracking-[0.25em] text-[#E8A598] mb-4 uppercase">
            CONNECT
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-cream/70 font-light">
            <li className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-3 h-3 text-clay-rose" />
              </span>
              <span>560 Valley Road, West Orange, NJ</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3 h-3 text-clay-rose" />
              </span>
              <Link href="tel:+15513393637" className="hover:text-clay-rose transition-colors">551-339-3637</Link>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-3 h-3 text-clay-rose" />
              </span>
              <Link href="mailto:braidbar1nj@gmail.com" className="hover:text-clay-rose transition-colors">
                braidbar1nj@gmail.com
              </Link>
            </li>
            <li className="mt-2">
              <Link
                href={wappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-cream px-4 py-2 rounded-full font-semibold transition-all text-[10px] uppercase tracking-widest border border-emerald-800"
              >
                💬 Chat on WhatsApp
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Elegant minimalist gold accent line */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6">
        <div className="h-[1px] bg-accent-gold/30 rounded-full" />
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-[10px] text-cream/40 relative z-10 font-light tracking-wider">
        <p>&copy; {currentYear} Braid Bar NJ. All rights reserved. ✨</p>
        <p className="mt-1">Designed for elegance, style, and protective styling excellence.</p>
      </div>
    </footer>
  );
}
