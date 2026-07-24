'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashPageProps {
  onComplete?: () => void;
}

export function SplashPage({ onComplete }: SplashPageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if splash has already been shown in this session
    const hasShownSplash = sessionStorage.getItem('bb_splash_shown');
    if (hasShownSplash) {
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('bb_splash_shown', 'true');
      if (onComplete) onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-terracotta text-cream overflow-hidden"
        >
          {/* Subtle geometric line patterns */}
          <div className="absolute inset-x-0 top-1/4 h-[1px] bg-cream/10" />
          <div className="absolute inset-x-0 bottom-1/4 h-[1px] bg-cream/10" />
          <div className="absolute left-1/4 inset-y-0 w-[1px] bg-cream/10" />
          <div className="absolute right-1/4 inset-y-0 w-[1px] bg-cream/10" />

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.5em] font-semibold text-cream mb-4"
            >
              The Hair Sanctuary
            </motion.span>
            
            {/* Monogram logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-24 mb-6 relative"
            >
              <img
                src="/images/branding/logo-monogram-trans.png"
                alt="Braid Bar Monogram"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Wordmark logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 max-w-xs"
            >
              <img
                src="/images/branding/logo-wordmark-peach.png"
                alt="Braid Bar Logo"
                className="h-10 md:h-12 w-auto object-contain mx-auto"
              />
            </motion.div>
            
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-[10px] tracking-[0.2em] font-light text-cream/90 uppercase block"
            >
              West Orange, New Jersey
            </motion.span>

            {/* Elegant loading progress line */}
            <div className="w-32 h-[1px] bg-cream/20 mt-8 relative overflow-hidden">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut', repeat: 0 }}
                className="absolute inset-y-0 w-1/2 bg-accent-gold"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashPage;
