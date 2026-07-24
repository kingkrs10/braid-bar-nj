'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '@/lib/data';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'accessories'>('all');

  const categories: Array<{ id: typeof activeCategory; name: string }> = [
    { id: 'all', name: 'All Products' },
    { id: 'accessories', name: 'Accessories & Care' },
  ];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 py-6">
      {/* Category Tabs bar — Editorial pill style */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 border-b border-espresso/10 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] transition-all cursor-pointer border',
                isSelected
                  ? 'bg-terracotta text-cream border-transparent shadow-sm'
                  : 'bg-white hover:bg-cream-dark border-espresso/10 text-espresso/70'
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Grid listing — Editorial style */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((prod, index) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
            >
              <ProductCard product={prod} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 p-8 bg-white border border-dashed border-espresso/15 rounded-2xl">
          <p className="text-espresso/60 font-semibold text-sm">No items found in this category.</p>
        </div>
      )}
    </div>
  );
}
export default ProductGrid;
