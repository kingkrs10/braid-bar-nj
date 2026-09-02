'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Star, ShieldCheck, Check, Sparkles, PackageCheck, Copy } from 'lucide-react';
import type { AmazonProduct } from '@/lib/amazon-store-data';
import { formatPrice } from '@/lib/utils';

interface AmazonProductModalProps {
  product: AmazonProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AmazonProductModal({ product, isOpen, onClose }: AmazonProductModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(product.amazonUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-cream border border-espresso/15 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-espresso/10 flex items-center justify-between bg-white/70 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-terracotta" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-terracotta">
                Sharon’s Stylist Recommendation
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-espresso/10 text-espresso/70 hover:text-espresso transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Scrollable */}
          <div className="overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              {/* Image Frame */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-espresso/10 p-4 flex items-center justify-center shadow-inner">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/branding/logo-monogram-bb.png';
                    (e.target as HTMLImageElement).className = 'w-1/2 h-1/2 object-contain';
                  }}
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-terracotta text-cream shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title & Pricing */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-espresso/60">
                  <span className="font-semibold text-espresso">{product.brand}</span>
                  <span>•</span>
                  <span>{product.categoryLabel}</span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-espresso leading-tight">
                  {product.name}
                </h3>

                {/* Rating & Prime */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-600 gap-1 text-xs font-semibold">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{product.rating.toFixed(1)}</span>
                    <span className="text-espresso/40">({product.reviewCount.toLocaleString()})</span>
                  </div>
                  {product.prime && (
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold tracking-wider uppercase border border-sky-200">
                      Prime
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-espresso">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs line-through text-espresso/40">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Recommended hairstyles */}
                {product.recommendedFor && product.recommendedFor.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-espresso/50 font-semibold block mb-1.5">
                      Recommended For
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.recommendedFor.map((style, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-white border border-espresso/10 text-espresso/80 px-2.5 py-0.5 rounded-full font-medium"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sharon's Stylist Advice Box */}
            <div className="bg-clay-rose/15 border border-terracotta/20 rounded-2xl p-5 relative">
              <div className="flex items-center gap-2 mb-2 text-terracotta font-semibold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Sharon’s Professional Stylist Advice</span>
              </div>
              <p className="text-espresso/90 text-sm leading-relaxed italic font-light">
                &ldquo;{product.stylistNotes}&rdquo;
              </p>

              {product.packGuidance && (
                <div className="mt-3 pt-3 border-t border-terracotta/20 flex items-center gap-2 text-xs font-semibold text-espresso">
                  <PackageCheck className="w-4 h-4 text-terracotta flex-shrink-0" />
                  <span>Appointment Prep: {product.packGuidance}</span>
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-espresso/50 font-semibold block">
                Product Details
              </span>
              <p className="text-espresso/70 text-xs leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Amazon Affiliate Disclosure Note */}
            <div className="bg-white/60 border border-espresso/10 rounded-xl p-3 text-[11px] text-espresso/60 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-terracotta flex-shrink-0" />
              <span>
                Verified Client Recommendation: You are shopping directly through Sharon French’s official Amazon Associate storefront.
              </span>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="p-4 sm:p-6 border-t border-espresso/10 bg-white/90 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 bg-terracotta hover:bg-espresso text-cream font-semibold py-3.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Buy on Amazon</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto px-5 py-3.5 border border-espresso/20 hover:bg-cream rounded-full text-xs font-semibold text-espresso flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
export default AmazonProductModal;
