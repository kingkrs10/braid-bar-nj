'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Clock, DollarSign, Sparkles } from 'lucide-react';
import type { Service } from '@/lib/supabase';
import { formatPrice, formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
}

export function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      className={cn(
        'glass-panel p-6 cursor-pointer transition-all duration-300 relative overflow-hidden group select-none',
        isSelected
          ? 'border-gold bg-gold/5 shadow-gold/5 shadow-md'
          : 'hover:border-gold/50 border-espresso/10 hover:shadow-lg'
      )}
    >
      {/* Decorative sparkle in the background of selected card */}
      {isSelected && (
        <div className="absolute right-4 top-4 text-gold/20">
          <Sparkles className="w-16 h-16 animate-pulse" />
        </div>
      )}

      {/* Category Tag */}
      <span className="inline-block text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-gold/15 text-gold-dark mb-4">
        {service.category}
      </span>

      {/* Service Name */}
      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso mb-2 group-hover:text-gold-dark transition-colors duration-200">
        {service.name}
      </h3>

      {/* Service Description */}
      <p className="text-charcoal/70 text-sm leading-relaxed mb-6 font-[family-name:var(--font-body)]">
        {service.description}
      </p>

      {/* Pricing / Duration Footer */}
      <div className="flex items-center justify-between border-t border-espresso/5 pt-4 mt-auto">
        <div className="flex items-center gap-1 text-espresso font-bold text-lg">
          <DollarSign className="w-4 h-4 text-gold-dark" />
          <span>{formatPrice(service.price).replace('$', '')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-charcoal/50 text-xs font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatDuration(service.duration_min)}</span>
        </div>
      </div>
    </motion.div>
  );
}
