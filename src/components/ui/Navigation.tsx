'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Scissors } from 'lucide-react';
import { useCartStore, useUIStore } from '@/lib/store';
import { cn, getWhatsAppLink } from '@/lib/utils';

export default function Navigation() {
  const { toggleCart, getItemCount } = useCartStore();
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);

  const whatsappUrl = getWhatsAppLink({
    serviceName: 'Hair Styling Session',
    date: 'Selected Date',
    time: 'Selected Time',
    customerName: 'Client Inquiry',
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop Catalog', href: '/shop' },
    { name: 'Membership', href: '/#membership' },
    { name: 'Events', href: '/#events' },
    { name: 'Lookbook', href: '/#lookbook' },
    { name: 'Owner Portal', href: '/admin' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-8',
          isScrolled ? 'py-3' : 'py-6'
        )}
      >
        <div
          className={cn(
            'max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-full border',
            isScrolled
              ? 'bg-cream/95 backdrop-blur-md px-6 py-3 border-espresso/10 shadow-sm'
              : 'px-4 py-2 border-transparent bg-transparent'
          )}
        >
          {/* Logo — BB Monogram Logo */}
          <Link href="/" className="flex items-center select-none group py-0.5">
            <img
              src="/images/branding/logo-monogram-bb.png"
              alt="Braid Bar Logo"
              className="h-8 md:h-10 w-auto object-contain filter drop-shadow-sm transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-espresso/70 hover:text-terracotta font-[family-name:var(--font-body)] text-[10px] tracking-[0.2em] uppercase transition-colors py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Cart Icon button */}
            <button
              id="nav-cart-btn"
              onClick={toggleCart}
              className="relative p-2.5 text-espresso hover:text-terracotta hover:border-terracotta transition-colors duration-200 cursor-pointer bg-white/50 rounded-full border border-espresso/10"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-terracotta text-cream text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>

            {/* CTA Book Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-book-cta"
              className="hidden sm:inline-flex items-center gap-2 bg-terracotta hover:bg-espresso text-cream font-medium px-5 py-2.5 rounded-full transition-all text-[10px] uppercase tracking-[0.25em] border border-transparent shadow-sm"
            >
              <Scissors className="w-3.5 h-3.5" />
              Get Braided
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              id="nav-hamburger-btn"
              onClick={toggleMobileMenu}
              className="md:hidden p-2.5 text-espresso hover:text-terracotta transition-colors duration-200 cursor-pointer bg-white/50 rounded-full border border-espresso/10"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream pt-28 px-6 flex flex-col gap-6 md:hidden"
          >
            <div className="flex flex-col gap-4 text-center bg-warm-white rounded-3xl border border-espresso/10 p-8 shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-[family-name:var(--font-display)] text-espresso hover:text-terracotta font-bold transition-all py-3 border-b border-espresso/5 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[1px] bg-espresso/5 my-2" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-espresso text-cream font-medium px-8 py-4 rounded-full transition-all text-xs uppercase tracking-[0.2em] border border-transparent shadow-sm"
              >
                <Scissors className="w-4 h-4" />
                Get Braided
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
