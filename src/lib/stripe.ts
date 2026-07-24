/**
 * Stripe Client Configuration
 * ============================
 * Stripe initialization for both client and server usage.
 */

import { loadStripe, type Stripe } from '@stripe/stripe-js';

// --- Client-side Stripe instance (singleton) ---
let stripePromise: Promise<Stripe | null>;

/**
 * Returns a cached Stripe.js instance for client-side usage.
 * Uses the NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY env var.
 */
export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.warn('Stripe publishable key not set. Payment features disabled.');
      stripePromise = Promise.resolve(null);
    } else {
      stripePromise = loadStripe(key);
    }
  }
  return stripePromise;
}
