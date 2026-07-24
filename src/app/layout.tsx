/**
 * Root Layout
 * ===========
 * The top-level layout wrapping all pages in the application.
 * Sets up global fonts, metadata, and providers.
 */

import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import './globals.css';

// --- Font Configuration ---
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: {
    default: 'The Braid Bar NJ | Knot Just Braids, It\'s a Vibe',
    template: '%s | The Braid Bar NJ',
  },
  description:
    'The Braid Bar NJ — Upscale, modern hair braiding salon in West Orange, NJ. Offering professional Knotless Braids, Feed-in Braids, Silk Presses, and Braiding Classes.',
  keywords: [
    'The Braid Bar NJ',
    'Braid Bar West Orange',
    'hair braiding NJ',
    'knotless braids NJ',
    'silk press west orange',
    'braiding classes NJ',
    'protective styling',
  ],
  authors: [{ name: 'The Braid Bar NJ' }],
  openGraph: {
    title: 'The Braid Bar NJ | Knot Just Braids, It\'s a Vibe',
    description: 'Upscale, modern hair braiding salon in West Orange, NJ. Book protective styles online.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-warm-white text-espresso">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
