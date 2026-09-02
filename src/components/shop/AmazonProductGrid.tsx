'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CLIENT_CHOSEN_AMAZON_PRODUCTS, 
  CATEGORIES_LIST, 
  APPOINTMENT_PACK_GUIDE, 
  type AmazonProduct, 
  type ProductCategory 
} from '@/lib/amazon-store-data';
import { AmazonProductCard } from './AmazonProductCard';
import { AmazonProductModal } from './AmazonProductModal';
import { cn } from '@/lib/utils';
import { Search, Sparkles, BookOpen, ChevronDown, ChevronUp, ShieldCheck, Check } from 'lucide-react';

export function AmazonProductGrid() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<AmazonProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPackGuide, setShowPackGuide] = useState(false);
  const [products, setProducts] = useState<AmazonProduct[]>(CLIENT_CHOSEN_AMAZON_PRODUCTS);

  // Load any client-curated custom products from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('bb_curated_amazon_products');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
          }
        }
      } catch (e) {
        console.error('Failed to load curated products', e);
      }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.stylistNotes.toLowerCase().includes(q) ||
        item.recommendedFor?.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const handleQuickView = (prod: AmazonProduct) => {
    setSelectedProduct(prod);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Appointment Hair Pack Quick Guide Accordion */}
      <div className="bg-white border border-espresso/10 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => setShowPackGuide(!showPackGuide)}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-cream/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-terracotta/10 text-terracotta">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-espresso">
                  Sharon’s Appointment Hair Pack Guide
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-clay-rose/20 text-terracotta">
                  Client Checklist
                </span>
              </div>
              <p className="text-xs text-espresso/60 font-light mt-0.5">
                Not sure how many packs to order before your appointment? Click to view Sharon’s exact requirements.
              </p>
            </div>
          </div>
          <div className="p-2 text-espresso/50">
            {showPackGuide ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        <AnimatePresence>
          {showPackGuide && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-espresso/10 p-5 bg-cream/30 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {APPOINTMENT_PACK_GUIDE.map((guide, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-espresso/10 shadow-xs space-y-2">
                    <div className="flex items-center gap-1.5 text-terracotta font-bold text-xs uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{guide.hairstyle}</span>
                    </div>
                    <div className="text-xs font-semibold text-espresso">
                      {guide.hairRecommended}
                    </div>
                    <div className="inline-block bg-terracotta/15 text-terracotta font-bold text-[11px] px-2.5 py-1 rounded-md">
                      Required: {guide.packsNeeded}
                    </div>
                    <p className="text-[11px] text-espresso/60 font-light leading-relaxed">
                      {guide.note}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hair brands, edge gels, bonnets, or hairstyles..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-full border border-espresso/15 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-xs font-medium text-espresso placeholder:text-espresso/40 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-espresso/40 hover:text-espresso"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar px-2">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] transition-all cursor-pointer whitespace-nowrap border',
                  isSelected
                    ? 'bg-terracotta text-cream border-transparent shadow-sm'
                    : 'bg-white hover:bg-cream-dark/50 border-espresso/10 text-espresso/70'
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Count & Guarantee Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-espresso/60 border-b border-espresso/10 pb-4">
        <div className="flex items-center gap-2 font-medium">
          <span>Showing <strong>{filteredProducts.length}</strong> client-vetted products</span>
          {searchQuery && <span>matching &ldquo;{searchQuery}&rdquo;</span>}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-terracotta font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Hand-Picked &amp; Tested by Sharon French</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((prod, index) => (
            <AmazonProductCard
              key={prod.id}
              product={prod}
              index={index}
              onQuickView={handleQuickView}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 px-8 bg-white border border-dashed border-espresso/15 rounded-3xl space-y-3 max-w-lg mx-auto">
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">
            No Salon Items Found
          </p>
          <p className="text-espresso/60 text-xs font-light">
            We couldn’t find any client-chosen products matching &ldquo;{searchQuery}&rdquo;. Try another search term or browse all stylist picks.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-2 inline-block px-5 py-2.5 rounded-full bg-terracotta text-cream text-xs font-semibold uppercase tracking-wider hover:bg-espresso transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick View Stylist Modal */}
      <AmazonProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
export default AmazonProductGrid;
