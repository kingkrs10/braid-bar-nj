/**
 * Braid Bar NJ — Curated Amazon Storefront Data
 * ==============================================
 * Exclusively client-chosen products hand-picked, salon-tested,
 * and recommended by Sharon French for appointment prep and daily care.
 */

export type ProductCategory = 
  | 'all'
  | 'braiding-hair'
  | 'edge-control'
  | 'scalp-care'
  | 'sleep-silk'
  | 'maintenance'
  | 'tools';

export interface AmazonProduct {
  id: string;
  asin: string;
  name: string;
  brand: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  stylistNotes: string; // Sharon's direct advice to clients
  packGuidance?: string; // How many packs to bring to appointment
  recommendedFor: string[]; // Associated hairstyles
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  prime: boolean;
  images: string[];
  amazonUrl: string;
  badge?: 'Sharon’s Pick' | 'Salon Required' | 'Client Favorite' | 'Best Value';
  inStock: boolean;
  featured?: boolean;
}

export interface AppointmentPackGuide {
  hairstyle: string;
  hairRecommended: string;
  packsNeeded: string;
  note: string;
}

export const APPOINTMENT_PACK_GUIDE: AppointmentPackGuide[] = [
  {
    hairstyle: 'Knotless Braids (Medium / Large / Jumbo)',
    hairRecommended: 'Ruwa Pre-Stretched Kanekalon Braiding Hair (24" or 30")',
    packsNeeded: '3 Individual Packs (or 1 Multipack)',
    note: 'Ruwa is water-repellent, lightweight, and prevents tension bumps.',
  },
  {
    hairstyle: '4 to 5 Feed-In Braids',
    hairRecommended: 'Ruwa Pre-Stretched Braiding Hair',
    packsNeeded: '2 Packs',
    note: 'Pre-stretched is required for sleek tapered ends.',
  },
  {
    hairstyle: 'Miracle Knots & Boho Knotless',
    hairRecommended: 'Feather Human Hair Bulk / Crochet Hair',
    packsNeeded: '3 Packs',
    note: 'Ultra-soft featherweight texture that does not matte or tangle.',
  },
  {
    hairstyle: 'Small Knotless Twists',
    hairRecommended: 'QVR Afro Kinky Bulk Human Hair',
    packsNeeded: '4 Packs',
    note: '100% human hair bulk blends seamlessly with natural 3C-4C textures.',
  },
  {
    hairstyle: 'Spring & Passion Twists',
    hairRecommended: 'Lulutress Water Wave or Spring Twist Hair',
    packsNeeded: '6 Packs (Water Wave) or 3 Packs (Spring Twist)',
    note: 'Tension-free, bouncy, and stays defined in humid weather.',
  },
  {
    hairstyle: 'Kids Knotless (Ages 10 & Under)',
    hairRecommended: 'Ruwa Pre-Stretched Braiding Hair (18" - 24")',
    packsNeeded: '2 Individual Packs',
    note: 'Gentle on sensitive young scalps and lightweight.',
  },
];

export const CLIENT_CHOSEN_AMAZON_PRODUCTS: AmazonProduct[] = [
  {
    id: 'bb-amz-001',
    asin: 'B07N8MZZ47',
    name: 'Ruwa Pre-Stretched Braiding Hair (24 Inch, 3-Pack)',
    brand: 'Inge / Ruwa',
    category: 'braiding-hair',
    categoryLabel: 'Braiding & Bulk Hair',
    description: '100% Aquatex fiber made with Kanekalon. Lightweight, water-repellent, fast drying, and anti-itch. The salon standard for clean, long-lasting braids.',
    stylistNotes: 'Sharon’s #1 salon choice for all Knotless and Feed-in appointments. The pre-stretched tapered ends make your braids look polished from day one without heavy dipping.',
    packGuidance: 'Bring 3 individual packs (or 1 3-pack) for Medium Knotless Braids.',
    recommendedFor: ['Knotless Braids', 'Feed-In Braids', 'Fulani Braids', 'Kids Braids'],
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviewCount: 3840,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B07N8MZZ47?tag=braidbarnj-20',
    badge: 'Salon Required',
    inStock: true,
    featured: true,
  },
  {
    id: 'bb-amz-002',
    asin: 'B0C7L8M9XP',
    name: 'Feather Human Hair Bulk for Miracle Knots & Boho Braids (18 Inch)',
    brand: 'Feather Hair',
    category: 'braiding-hair',
    categoryLabel: 'Braiding & Bulk Hair',
    description: '100% virgin unprocessed human bulk hair designed specifically for bohemian curls, gypsy knotless, and miracle knot installations. Zero synthetic blending.',
    stylistNotes: 'Required for our Miracle Knots service. Unlike synthetic curls that tangle after two days, this human hair remains soft, bouncy, and can be easily refreshed with mousse.',
    packGuidance: 'Bring 3 packs for full bohemian curl volume.',
    recommendedFor: ['Miracle Knots', 'Boho Knotless', 'Human Hair Braids'],
    price: 68.00,
    originalPrice: 79.99,
    rating: 4.9,
    reviewCount: 920,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1629731629152-dd58d8ffc5a7?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B0C7L8M9XP?tag=braidbarnj-20',
    badge: 'Sharon’s Pick',
    inStock: true,
    featured: true,
  },
  {
    id: 'bb-amz-003',
    asin: 'B08G8RP2MQ',
    name: 'QVR Afro Kinky Bulk Human Hair for Braiding & Twists',
    brand: 'QVR',
    category: 'braiding-hair',
    categoryLabel: 'Braiding & Bulk Hair',
    description: '100% Brazilian Remy human hair with natural afro-kinky curl pattern. Perfect for dreadlock repairs, small knotless twists, and invisible roots.',
    stylistNotes: 'The exact hair recommended in our Small Knotless Twist service description. It grips your natural hair texture flawlessly with zero slipping.',
    packGuidance: '4 packs needed for shoulder-to-midback Small Knotless Twists.',
    recommendedFor: ['Small Knotless Twists', 'Loc Extensions', 'Starter Locs'],
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviewCount: 1420,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1595642527925-4d41cb781653?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B08G8RP2MQ?tag=braidbarnj-20',
    badge: 'Sharon’s Pick',
    inStock: true,
    featured: true,
  },
  {
    id: 'bb-amz-004',
    asin: 'B07XQ8K73M',
    name: 'Lulutress Water Wave Crochet Hair (18 Inch, 6-Pack)',
    brand: 'Lulutress',
    category: 'braiding-hair',
    categoryLabel: 'Braiding & Bulk Hair',
    description: 'Pre-separated, lightweight water wave texture. Natural feel, soft touch, and low maintenance crochet & passion twist hair.',
    stylistNotes: 'Ideal for Passion Twists and Crochet Box Braids. Featherlight so your scalp never experiences tension headaches.',
    packGuidance: '6 packs needed for standard volume passion twists.',
    recommendedFor: ['Passion Twists', 'Crochet Weave', 'Crochet Box Braids'],
    price: 32.99,
    originalPrice: 38.00,
    rating: 4.6,
    reviewCount: 2890,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B07XQ8K73M?tag=braidbarnj-20',
    badge: 'Client Favorite',
    inStock: true,
  },
  {
    id: 'bb-amz-005',
    asin: 'B08F2H5R22',
    name: '24-Hour Sleek Extreme Hold Edge Control Gel (Flake-Free)',
    brand: 'Ebin New York',
    category: 'edge-control',
    categoryLabel: 'Edge Control & Slicking',
    description: 'Max hold water-based edge control enriched with argan and castor oil. Holds 4C edges flat in humidity with zero white residue or flaking.',
    stylistNotes: 'This is the secret behind the salon’s razor-sharp parting and glass-smooth baby hairs. Doesn’t turn white or crusty when layered.',
    recommendedFor: ['Daily Edge Styling', 'Feed-In Sleeking', 'Cornrows', 'All Hair Types'],
    price: 12.49,
    rating: 4.8,
    reviewCount: 5820,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B08F2H5R22?tag=braidbarnj-20',
    badge: 'Sharon’s Pick',
    inStock: true,
    featured: true,
  },
  {
    id: 'bb-amz-006',
    asin: 'B09J2MKL83',
    name: 'Pure Mulberry Silk Edge Wrap Band & Headband Set',
    brand: 'SilkyWrap Studio',
    category: 'edge-control',
    categoryLabel: 'Edge Control & Slicking',
    description: '100% natural mulberry silk headband with velcro compression. Melts lace and locks edge control without absorbing hair oils.',
    stylistNotes: 'Put this on for 10 minutes right after applying your edge control to melt everything seamlessly into your hairline. A daily must-have.',
    recommendedFor: ['Edge Laying', 'Bedtime Protection', 'Post-Workout'],
    price: 14.99,
    rating: 4.9,
    reviewCount: 1640,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B09J2MKL83?tag=braidbarnj-20',
    badge: 'Client Favorite',
    inStock: true,
  },
  {
    id: 'bb-amz-007',
    asin: 'B07N7PK83M',
    name: 'Mielle Rosemary Mint Scalp & Hair Strengthening Oil (2 oz)',
    brand: 'Mielle Organics',
    category: 'scalp-care',
    categoryLabel: 'Scalp Care & Serums',
    description: 'Infused with Biotin and 30 essential oils. Stimulates blood circulation, strengthens hair follicles, and relieves dry, itchy scalps.',
    stylistNotes: 'The absolute holy grail for protective styles. Apply 3-4 drops along your braid parts 3 times a week to keep your scalp nourished and promote fast growth.',
    recommendedFor: ['Knotless Braids', 'Loc Retwists', 'Dry Scalp Relief', 'Growth'],
    price: 9.99,
    originalPrice: 11.99,
    rating: 4.9,
    reviewCount: 78500,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1608248597359-598379c6d1d4?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B07N7PK83M?tag=braidbarnj-20',
    badge: 'Sharon’s Pick',
    inStock: true,
    featured: true,
  },
  {
    id: 'bb-amz-008',
    asin: 'B0892PLW4K',
    name: 'Extra Large Satin Sleep Bonnet for Long Braids (Double Layer)',
    brand: 'BonnetQueen',
    category: 'sleep-silk',
    categoryLabel: 'Silk Sleep & Bonnets',
    description: 'Wide elastic band satin bonnet designed specifically for box braids, knotless braids up to 36 inches, locs, and weaves. Stays on all night.',
    stylistNotes: 'Standard bonnets crunch up your braids and cause frizz at the ends. This extra-long bonnet lets your braids hang freely while you sleep, making your style last 2-3 weeks longer.',
    recommendedFor: ['Long Braids', 'Locs', 'Twists', 'Weaves'],
    price: 16.99,
    rating: 4.8,
    reviewCount: 4210,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1595642527925-4d41cb781653?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B0892PLW4K?tag=braidbarnj-20',
    badge: 'Client Favorite',
    inStock: true,
  },
  {
    id: 'bb-amz-009',
    asin: 'B07B4V4B2W',
    name: 'African Pride Black Castor Miracle Braid & Scalp Cleansing Rinse',
    brand: 'African Pride',
    category: 'scalp-care',
    categoryLabel: 'Scalp Care & Serums',
    description: 'Waterless scalp cleanser formulated with micellar water and black castor oil. Cleanses braids and removes build-up without causing frizz.',
    stylistNotes: 'Use this at week 3 or 4 when your scalp needs refreshing but you don’t want to wet and frizz your braids. Spray on, massage into parts, and wipe clean with a warm towel.',
    recommendedFor: ['Braid Maintenance', 'Itchy Scalp', 'Mid-Style Refresh'],
    price: 8.49,
    rating: 4.7,
    reviewCount: 3120,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B07B4V4B2W?tag=braidbarnj-20',
    badge: 'Best Value',
    inStock: true,
  },
  {
    id: 'bb-amz-010',
    asin: 'B08D3R749B',
    name: 'The Doux Mousse Def Texture Foam & Braid Styler',
    brand: 'The Doux',
    category: 'maintenance',
    categoryLabel: 'Maintenance & Takedown',
    description: 'Dual-use styling mousse enriched with silk protein. Eliminates flyaways, defines curls on boho braids, and restores crisp shine to braided styles.',
    stylistNotes: 'Pump 3-4 generous clouds over your braids in the morning, tie down with a silk scarf for 5 minutes, and your braids will look like you just walked out of the salon.',
    recommendedFor: ['Boho Curls Refresh', 'Flyaway Control', 'Weekly Styling'],
    price: 15.99,
    rating: 4.8,
    reviewCount: 9600,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B08D3R749B?tag=braidbarnj-20',
    badge: 'Sharon’s Pick',
    inStock: true,
  },
  {
    id: 'bb-amz-011',
    asin: 'B077K3DXZQ',
    name: 'Stainless Steel Pin Rat Tail Comb & Grip Sectioning Clips Kit',
    brand: 'ProPart Salon',
    category: 'tools',
    categoryLabel: 'Stylist Tools',
    description: 'Heat-resistant fine-tooth comb with stainless steel parting pin, accompanied by 6 soft-touch silicone alligator hair clamps.',
    stylistNotes: 'Clean, razor-sharp grid parts are the hallmark of Braid Bar NJ. If you braid hair at home or prepare your own sections, this precision pin comb is mandatory.',
    recommendedFor: ['Hair Prep', 'Crisp Parting', 'At-Home Maintenance'],
    price: 9.99,
    rating: 4.7,
    reviewCount: 2450,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B077K3DXZQ?tag=braidbarnj-20',
    badge: 'Best Value',
    inStock: true,
  },
  {
    id: 'bb-amz-012',
    asin: 'B08F9K47Z8',
    name: 'Cantu Shea Butter Braid Takedown & Detangling Hair Oil',
    brand: 'Cantu',
    category: 'maintenance',
    categoryLabel: 'Maintenance & Takedown',
    description: 'Slippery detangling formula with jojoba oil and shea butter. Melts shed hair buildup at the base of braids for painless, zero-breakage takedowns.',
    stylistNotes: 'Never pull dry braids out! Spray this generously on the roots 10 minutes before unraveling to slide shed hair right out without snapping your natural strands.',
    recommendedFor: ['Braid Takedown', 'Detangling', 'Breakage Prevention'],
    price: 7.99,
    rating: 4.6,
    reviewCount: 1980,
    prime: true,
    images: [
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80',
    ],
    amazonUrl: 'https://www.amazon.com/dp/B08F9K47Z8?tag=braidbarnj-20',
    badge: 'Salon Required',
    inStock: true,
  }
];

export const CATEGORIES_LIST: Array<{ id: ProductCategory; name: string }> = [
  { id: 'all', name: 'All Stylist Picks' },
  { id: 'braiding-hair', name: 'Braiding Hair & Bulk' },
  { id: 'edge-control', name: 'Edge Control & Slicking' },
  { id: 'scalp-care', name: 'Scalp Care & Serums' },
  { id: 'sleep-silk', name: 'Silk Sleep & Bonnets' },
  { id: 'maintenance', name: 'Maintenance & Takedown' },
  { id: 'tools', name: 'Stylist Tools' },
];

export interface AmazonShopText {
  badge: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
  disclosure: string;
  adviceTitle: string;
  adviceBody: string;
  packGuideTitle: string;
  packGuideSubtitle: string;
}

export const DEFAULT_AMAZON_SHOP_TEXT: AmazonShopText = {
  badge: 'The Braid Bar NJ • Sharon’s Curated Storefront',
  headline: 'Stylist-Approved',
  headlineAccent: 'Amazon Hair & Care',
  subtitle: 'Skip the beauty supply store guessing game. Every product below is personally tested, approved, and recommended by Sharon French for your salon appointments, braid prep, and daily protective style health.',
  disclosure: 'Verified Amazon Associates Catalog • Safe & Direct Prime Delivery',
  adviceTitle: 'Have questions about hair color or texture matching?',
  adviceBody: 'Sharon and our stylists are always happy to advise. Send us a message or consultation inquiry before purchasing so you get the exact shade and length for your appointment.',
  packGuideTitle: 'Sharon’s Appointment Hair Pack Guide',
  packGuideSubtitle: 'Not sure how many packs to order before your appointment? Click to view Sharon’s exact requirements.',
};
