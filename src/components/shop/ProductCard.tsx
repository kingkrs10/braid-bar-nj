'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '@/lib/supabase';
import { useCartStore } from '@/lib/store';
import { formatPrice, cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, setCartOpen } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
    });
    setCartOpen(true);
  };

  const hasImage = product.images && product.images.length > 0 && product.images[0];

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white overflow-hidden group transition-all duration-300 flex flex-col relative border border-espresso/10 rounded-2xl shadow-sm hover:-translate-y-1"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
    >
      {/* Product Image or Logo fallback */}
      <div className="relative w-full h-64 overflow-hidden flex-shrink-0 bg-cream-dark flex items-center justify-center">
        {(() => {
          const fallbackLogos = [
            '/images/branding/logo-monogram-trans.png',
            '/images/branding/logo-wordmark-orange.png',
            '/images/branding/logo-monogram-peach.png',
          ];
          const fallbackLogo = fallbackLogos[index % fallbackLogos.length];
          return (
            <>
              {!hasImage && (
                <div className="absolute inset-0 bg-salon-wallpaper opacity-85 pointer-events-none">
                  {/* Geometric color-blocked elements matching the monogram palette */}
                  <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-clay-rose/30" />
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-terracotta/20" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-28 arch-frame bg-cream-dark/50 border border-espresso/5 backdrop-blur-[1px]" />
                </div>
              )}
              <img 
                src={hasImage ? product.images[0] : fallbackLogo} 
                alt={product.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackLogo;
                  (e.target as HTMLImageElement).className = "w-full h-full object-contain p-8 z-10 bg-cream-dark transition-all";
                }}
                className={cn(
                  "w-full h-full transition-transform duration-700 group-hover:scale-105 z-10",
                  hasImage ? "object-cover" : "object-contain p-8"
                )}
              />
            </>
          );
        })()}

        {/* Hover action overlay */}
        <div className="absolute inset-0 bg-espresso/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Link
            href={`/shop/${product.id}`}
            className="p-3 bg-cream hover:bg-terracotta text-espresso hover:text-cream rounded-full transition-all border border-espresso/10 shadow-md"
            aria-label="View Product details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            id={`add-cart-${product.id}`}
            onClick={handleAddToCart}
            className="p-3 bg-terracotta hover:bg-espresso text-cream rounded-full transition-all border border-transparent shadow-md"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-medium px-3 py-1 rounded-full bg-cream text-espresso border border-espresso/10">
          {product.category}
        </span>

        {/* In-stock badge */}
        {product.in_stock && (
          <span className="absolute top-3 right-3 text-[8px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#E0B7A6] text-espresso border border-espresso/10">
            In Stock
          </span>
        )}
      </div>

      {/* Info details */}
      <div className="p-5 flex flex-col flex-grow bg-white border-t border-espresso/5">
        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mb-2">
          {product.colors.map((color, i) => (
            <span key={i} className="text-[9px] uppercase tracking-wider text-terracotta bg-clay-rose/10 px-2 py-0.5 rounded-full border border-espresso/5 font-medium">
              {color}
            </span>
          ))}
        </div>

        <Link href={`/shop/${product.id}`} className="hover:underline">
          <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-espresso mb-1 group-hover:text-terracotta transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-espresso/60 text-[11px] leading-relaxed line-clamp-2 mb-4 font-light">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-terracotta font-bold text-lg">
            {formatPrice(product.price)}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-espresso hover:bg-terracotta text-cream text-[9px] uppercase tracking-[0.2em] font-medium px-4 py-2 rounded-lg transition-colors border border-transparent shadow-sm"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
}
export default ProductCard;
