'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Star } from 'lucide-react';
import { services } from '@/lib/data';
import { useBookingStore } from '@/lib/store';
import { formatPrice, formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

/* Warm editorial fallback gradient backgrounds per category */
const categoryGradients: Record<string, string> = {
  'VIP Services': 'from-[#D6A18C] to-[#FAF6F2]',
  'Crochet': 'from-[#FAF6F2] to-[#E0B7A6]',
  'Feed-Ins': 'from-[#B56F52] to-[#D6A18C]',
  'Fulani Braids': 'from-[#E0B7A6] to-[#FAF6F2]',
  'Human Hair Knotless': 'from-[#FAF6F2] to-[#D6A18C]',
  'Kids Styles': 'from-[#D6A18C] to-[#FAF6F2]',
  'Knotless Braids': 'from-[#FAF6F2] to-[#E0B7A6]',
  'Locs': 'from-[#B56F52] to-[#FAF6F2]',
  'Maintenance': 'from-[#E0B7A6] to-[#FAF6F2]',
  "Men's Styles": 'from-[#D6A18C] to-[#FAF6F2]',
  'WEAVE': 'from-[#FAF6F2] to-[#E0B7A6]',
  'STYLIST// Abby Charles': 'from-[#B56F52] to-[#D6A18C]',
  'Takedown': 'from-[#E0B7A6] to-[#FAF6F2]',
  'Twist Styles': 'from-[#FAF6F2] to-[#D6A18C]',
  "Updo's + Ponytails + Simple Styles": 'from-[#FAF6F2] to-[#E0B7A6]',
  'Welcome': 'from-[#FAF6F2] to-[#E0B7A6]',
};

export function ServiceList() {
  const { setService, setStep } = useBookingStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(services.map((s) => s.category)));
    return [
      { id: 'all', name: 'All Styles' },
      ...uniqueCats.map((cat) => ({ id: cat, name: cat })),
    ];
  }, []);

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return services;
    return services.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const handleBookNow = (service: typeof services[0]) => {
    setService(service);
    setStep('service');
    const bookingSection = document.getElementById('appointment');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 flex flex-col gap-8">
      {/* Category Tabs menu — Editorial pill style */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 border-b border-espresso/10 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] transition-all cursor-pointer whitespace-nowrap border',
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

      {/* Services Cards Grid layout — Editorial edition */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => {
            const gradientClass = categoryGradients[service.category] || 'from-[#FAF6F2] to-[#E0B7A6]';
            
            // Branding logos to use as placeholders when images are missing or broken
            const fallbackLogos = [
              '/images/branding/logo-monogram-trans.png',
              '/images/branding/logo-wordmark-orange.png',
              '/images/branding/logo-monogram-peach.png',
            ];
            const fallbackLogo = fallbackLogos[index % fallbackLogos.length];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="bg-white border border-espresso/10 rounded-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-sm animate-fade-in"
              >
                {/* Service Image or Logo fallback */}
                <div className="relative w-full h-48 overflow-hidden flex-shrink-0 bg-cream-dark flex items-center justify-center">
                  {!service.image_url && (
                    <div className="absolute inset-0 bg-salon-wallpaper opacity-85 pointer-events-none">
                      {/* Geometric color-blocked elements matching the monogram palette */}
                      <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-clay-rose/30" />
                      <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-terracotta/20" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-28 arch-frame bg-cream-dark/50 border border-espresso/5 backdrop-blur-[1px]" />
                    </div>
                  )}
                  
                  <img 
                    src={service.image_url || fallbackLogo} 
                    alt={service.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackLogo;
                      (e.target as HTMLImageElement).className = "w-full h-full object-contain p-8 z-10 bg-cream-dark transition-all";
                    }}
                    className={cn(
                      "w-full h-full transition-transform duration-700 group-hover:scale-105 z-10",
                      service.image_url ? "object-cover" : "object-contain p-8"
                    )}
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-cream text-espresso text-[9px] uppercase tracking-wider px-3 py-1 rounded-full border border-espresso/10 font-medium">
                    {service.category}
                  </div>

                  {/* Price tag */}
                  <div className="absolute top-3 right-3 bg-espresso text-cream text-[10px] font-semibold px-3 py-1 rounded-full border border-espresso/10">
                    {formatPrice(service.price)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col gap-4 flex-grow">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-espresso leading-snug group-hover:text-terracotta transition-colors duration-200">
                    {service.name}
                  </h3>

                  <p className="text-espresso/70 text-[11px] leading-relaxed font-[family-name:var(--font-body)] line-clamp-3 font-light">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 text-[9px] uppercase tracking-wider font-semibold text-espresso/45 mt-auto">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-terracotta" />
                      <span>{formatDuration(service.duration_min)}</span>
                    </div>
                    {service.deposit_amount > 0 && (
                      <div className="flex items-center gap-1 text-espresso/40">
                        <span>• &nbsp; {formatPrice(service.deposit_amount)} deposit</span>
                      </div>
                    )}
                  </div>

                  <button
                    id={`service-book-${service.id}`}
                    onClick={() => handleBookNow(service)}
                    className="w-full bg-espresso hover:bg-terracotta text-cream font-medium py-3 rounded-xl transition-all cursor-pointer text-center text-[10px] uppercase tracking-[0.2em] border border-transparent shadow-sm"
                  >
                    Select &amp; Customize
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
export default ServiceList;
