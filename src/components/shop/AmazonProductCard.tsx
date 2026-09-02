'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Star, Eye, Sparkles } from 'lucide-react';
import type { AmazonProduct } from '@/lib/amazon-store-data';
import { formatPrice } from '@/lib/utils';

interface AmazonProductCardProps {
  product: AmazonProduct;
  index?: number;
  onQuickView: (product: AmazonProduct) => void;
}

export function AmazonProductCard({ product, index = 0, onQuickView }: AmazonProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="bg-white rounded-2xl border border-espresso/10 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative"
    >
      {/* Card Top / Image Area */}
      <div className="relative w-full aspect-square bg-cream-dark/40 overflow-hidden flex items-center justify-center p-6 border-b border-espresso/5">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/branding/logo-monogram-bb.png';
            (e.target as HTMLImageElement).className = 'w-1/2 h-1/2 object-contain opacity-70';
          }}
        />

        {/* Badge — Editorial style */}
        {product.badge && (
          <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-terracotta text-cream shadow-sm z-10">
            {product.badge}
          </span>
        )}

        {/* Prime Pill */}
        {product.prime && (
          <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200 z-10">
            Prime
          </span>
        )}

        {/* Quick view hover action */}
        <div className="absolute inset-0 bg-espresso/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-cream hover:bg-terracotta text-espresso hover:text-cream rounded-full transition-all border border-espresso/10 shadow-md cursor-pointer flex items-center gap-1.5 text-xs font-semibold px-4"
          >
            <Eye className="w-4 h-4" />
            <span>Stylist Notes</span>
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Brand & Category */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-widest text-espresso/50 font-semibold truncate">
            {product.brand}
          </span>
          <div className="flex items-center text-amber-600 gap-1 text-[11px] font-semibold flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-espresso/40">({product.reviewCount > 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="font-[family-name:var(--font-display)] text-base font-bold text-espresso mb-2 line-clamp-2 cursor-pointer hover:text-terracotta transition-colors"
        >
          {product.name}
        </h3>

        {/* Sharon's Stylist Advice snippet */}
        <div className="bg-cream/70 border border-espresso/10 rounded-xl p-3 mb-4 flex-grow">
          <div className="flex items-center gap-1.5 text-terracotta text-[10px] font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Sharon’s Stylist Note</span>
          </div>
          <p className="text-[11px] text-espresso/80 font-light leading-relaxed line-clamp-2 italic">
            &ldquo;{product.stylistNotes}&rdquo;
          </p>
        </div>

        {/* Recommended Hairstyle Tags */}
        {product.recommendedFor && product.recommendedFor.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.recommendedFor.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[9px] bg-clay-rose/15 text-espresso/70 px-2 py-0.5 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
            {product.recommendedFor.length > 2 && (
              <span className="text-[9px] text-espresso/40 px-1 py-0.5">
                +{product.recommendedFor.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Bottom Price & Action */}
        <div className="pt-3 border-t border-espresso/5 flex items-center justify-between gap-3 mt-auto">
          <div>
            <div className="text-lg font-bold text-espresso">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-[10px] line-through text-espresso/40 -mt-0.5">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-espresso hover:bg-terracotta text-cream text-[10px] uppercase tracking-[0.15em] font-medium py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5 shadow-sm group/btn cursor-pointer"
          >
            <span>Buy on Amazon</span>
            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
export default AmazonProductCard;
