'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    isOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    getTotal,
    getItemCount,
  } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-espresso/70 backdrop-blur-[2px]"
          />

          {/* Slider Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-warm-white z-50 shadow-2xl border-l border-gold/10 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-espresso/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold-dark" />
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso">
                  Shopping Cart ({getItemCount()})
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-cream rounded-full transition-colors cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5 text-espresso" />
              </button>
            </div>

            {/* Line Items List */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag className="w-12 h-12 text-espresso/20" />
                  <div>
                    <p className="text-espresso/60 font-semibold text-base">Your cart is empty</p>
                    <p className="text-xs text-charcoal/40 mt-1">Discover curated styles at the boutique shop.</p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="bg-gold text-espresso font-semibold py-3 px-6 rounded-full text-xs uppercase tracking-wider hover:bg-gold-dark transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product_id}-${item.size}-${item.color}`}
                    className="flex gap-4 p-4 rounded-2xl bg-cream/20 border border-espresso/5 hover:border-gold/15 transition-all"
                  >
                    {/* Visual box placeholder */}
                    <div className="w-16 h-20 rounded-xl bg-gold/10 flex items-center justify-center font-bold text-espresso/30 text-lg">
                      {item.name.charAt(0)}
                    </div>

                    <div className="flex-grow flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-terracotta">
                        Size: {item.size} • Color: {item.color}
                      </span>
                      <h4 className="font-semibold text-sm text-espresso leading-snug line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-gold-dark font-bold text-sm">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-espresso/15 rounded-lg bg-cream/10">
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1, item.size, item.color)}
                            className="p-1 hover:bg-cream/45 rounded-l-lg text-espresso/60"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs px-2.5 font-bold text-espresso select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1, item.size, item.color)}
                            className="p-1 hover:bg-cream/45 rounded-r-lg text-espresso/60"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product_id, item.size, item.color)}
                          className="text-charcoal/40 hover:text-terracotta p-1 transition-colors"
                          aria-label="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {items.length > 0 && (
              <div className="p-6 border-t border-espresso/5 bg-glass-bg/15 backdrop-blur-[2px] flex flex-col gap-4">
                <div className="flex justify-between items-center text-espresso">
                  <span className="font-semibold text-sm uppercase tracking-wider text-espresso/60">Subtotal</span>
                  <span className="font-extrabold text-xl text-gold-dark">{formatPrice(getTotal())}</span>
                </div>
                <p className="text-[10px] text-charcoal/50">Taxes and shipping calculated at checkout.</p>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="bg-gold hover:bg-gold-dark text-espresso font-semibold py-4 rounded-xl text-center transition-all duration-300 hover:scale-[1.01] block text-sm"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
export default CartDrawer;
