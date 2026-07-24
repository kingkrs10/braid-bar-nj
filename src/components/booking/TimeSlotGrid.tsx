'use client';

import React from 'react';
import { motion } from 'motion/react';
import { generateTimeSlots } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TimeSlotGridProps {
  date: Date;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function TimeSlotGrid({ date, selectedTime, onSelectTime }: TimeSlotGridProps) {
  const slots = generateTimeSlots(date);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  if (slots.length === 0) {
    return (
      <div className="text-center py-10 p-6 glass-panel border-dashed border-espresso/15">
        <p className="text-espresso/60 font-medium">Closed / No available slots for Sundays.</p>
        <p className="text-xs text-charcoal/50 mt-1">Please select another date on the calendar.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-sm uppercase tracking-wider font-semibold text-espresso/60 mb-2">
        Available Times
      </h4>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-2.5"
      >
        {slots.map((slot) => {
          const isSelected = selectedTime === slot;
          return (
            <motion.button
              key={slot}
              variants={itemVariants}
              onClick={() => onSelectTime(slot)}
              className={cn(
                'py-3 px-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm cursor-pointer border',
                isSelected
                  ? 'bg-gold text-espresso border-gold shadow-md'
                  : 'bg-cream/40 hover:bg-cream/90 hover:border-gold/30 text-espresso border-espresso/5'
              )}
            >
              {slot}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
