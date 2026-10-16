import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { services as defaultCatalogServices, normalizeServiceDeposits } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Primary and fallback storage paths
const PRIMARY_PATH = path.join(process.cwd(), 'src/data/site-content.json');
const TMP_PATH = path.join(os.tmpdir(), 'bb_site_content.json');

// Fixed baseline epoch timestamp for default data (so any real client edit with a current date always wins!)
const BASELINE_TIMESTAMP = '2024-01-01T00:00:00.000Z';

// Default fallback data if files are unreadable
const defaultSiteContent = {
  text: {
    heroBadge: '560 Valley Road, West Orange, NJ',
    heroHeadline: 'Crafted Braids, Elevated Care.',
    heroSubtitle: 'Elevated protective styling crafted for longevity, neatness, and scalp health. Knotless braids, custom cornrows, and private VIP experiences designed around you.',
    missionTitle: 'Crafted Braids. Elevated Care. Everyday Luxury.',
    missionBody: 'We believe styling protective crowns should be a therapeutic, beautiful ritual. Our space in West Orange, New Jersey is structured around VIP client comfort, neat and clean grid partings, and meticulous tension-free braid installations that nurture your natural hair growth.',
    sharonTitle: 'Founder & Lead Stylist',
    sharonBio: 'Sharon French is a self-taught braider with over 20 years of experience. At Braid Bar NJ, she blends precision parting with weightless protective length, nurturing healthy scalp growth.',
    sharonBadge: '📍 560 Valley Road, West Orange • 20+ Years Exp',
    abigailTitle: 'Salon Assistant & Stylist',
    abigailBio: 'Abigail Charles supports natural hair preps, wash-station washes, and braid removals, ensuring every client enjoys a relaxing, VIP prep experience while developing natural styling techniques.',
    abigailBadge: '📍 560 Valley Road, West Orange • Client Care Specialist',
    marqueeText: '✨ NOW BOOKING • 560 VALLEY ROAD, WEST ORANGE, NJ • VIP BRAID EXPERIENCES AVAILABLE • KNOTLESS BRAIDS • FULANI DESIGNS • LOC MAINTENANCE',
  },
  images: {
    heroBg: '/images/branding/hero-sitting.jpg',
    salonArch: '/images/salon-reception-arch.jpg',
    portfolioOval: '/images/braids-twists.jpg',
    sharonPhoto: '/images/branding/profile-sharon-lead.png',
    abigailPhoto: '/images/branding/profile-abigail-assistant.png',
    navLogo: '/images/branding/logo-monogram-bb.png',
    heroLogo: '/images/branding/logo-braidbar-stacked.png',
    lookbookFeature: '/images/braids-fulani.jpg',
  },
  addons: [
    { id: 'add-1', name: 'Luxury Shampoo & Scalp Detox Wash', price: 35, duration_min: 30, applicableTo: 'all', applicableServiceIds: [] },
    { id: 'add-2', name: 'Extra Waist / Hip Extended Length', price: 40, duration_min: 45, applicableTo: 'all', applicableServiceIds: [] },
    { id: 'add-3', name: 'Bohemian Curly Ends (Human Hair)', price: 50, duration_min: 45, applicableTo: 'all', applicableServiceIds: [] },
    { id: 'add-4', name: 'Custom Hair Color Blending', price: 25, duration_min: 20, applicableTo: 'all', applicableServiceIds: [] },
    { id: 'add-5', name: 'Goddess Braid Accents', price: 30, duration_min: 30, applicableTo: 'all', applicableServiceIds: [] },
    { id: 'add-6', name: 'Braid Takedown & Comb Out Prep', price: 60, duration_min: 60, applicableTo: 'all', applicableServiceIds: [] },
  ],
  staffCalendars: [
    {
      id: 'cal-sharon',
      name: 'Sharon French',
      role: 'Founder & Lead Stylist',
      calendarId: '3793472',
      hours: 'Tue - Sat: 9:00 AM - 6:00 PM',
      isActive: true,
      bio: 'Lead braid specialist for Knotless, Fulani, and VIP custom packages.',
    },
    {
      id: 'cal-abigail',
      name: 'Abigail Charles',
      role: 'Salon Assistant & Hair Care Prep',
      calendarId: '13700462',
      hours: 'Wed - Sun: 10:00 AM - 5:00 PM',
      isActive: true,
      bio: 'Assistant calendar for shampoo washes, deep conditioning, takedowns, and hair preps.',
    },
  ],
  lookbook: [
    { id: 'lb-1', title: 'Knotless Box Braids', tag: 'Knotless', img: 'https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80', desc: 'Seamless, tension-free parting with natural movement.' },
    { id: 'lb-2', title: 'Fulani Tribal Braids', tag: 'Fulani', img: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80', desc: 'Custom cornrow patterns adorned with beads and cowrie accents.' },
    { id: 'lb-3', title: 'Passion & Goddess Twists', tag: 'Twists', img: 'https://images.unsplash.com/photo-1595642527925-4d41cb781653?auto=format&fit=crop&w=600&q=80', desc: 'Lightweight, bohemian texture crafted for longevity.' },
    { id: 'lb-4', title: 'Signature Silk Press Blowout', tag: 'Silk Press', img: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=600&q=80', desc: 'Mirror shine blowout and scalp care treatment.' },
  ],
  services: normalizeServiceDeposits(defaultCatalogServices),
  categories: [
    'VIP Services',
    'Knotless Braids',
    'Fulani & Feed-Ins',
    'Locs & Twist',
    'Crochet & Sew Ins',
    'Kids Styles',
    'Maintenance & Take Down',
    'Mens Styles',
  ],
  staffSchedules: [
    {
      id: 'cal-sharon',
      name: 'Sharon French',
      title: 'Founder & Lead Stylist',
      calendarId: '#3793472',
      role: 'owner',
      days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      hours: '9:00 AM – 6:00 PM',
      weeklyOverride: 'Standard salon floor hours',
    },
    {
      id: 'cal-abigail',
      name: 'Abigail Charles',
      title: 'Salon Assistant & Stylist',
      calendarId: '#13700462',
      role: 'assistant',
      days: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      hours: '10:00 AM – 5:00 PM',
      weeklyOverride: 'Preps, washes & braid removal support',
    },
  ],
  doubleBooking: false,
  imageSettings: {
    heroBgPosition: 'center 30%',
    heroZoom: 'cover',
    salonArchPosition: 'center',
    salonArchHeight: 'standard',
  },
  clients: [] as any[],
  depositPolicy: 'standard-50',
  lastUpdated: BASELINE_TIMESTAMP,
};

// Global memory cache surviving requests within process lifecycle
declare global {
  // eslint-disable-next-line no-var
  var __bb_site_content: typeof defaultSiteContent | undefined;
}

function loadFromDisk(): typeof defaultSiteContent {
  // 1. Check persistent global memory
  if (globalThis.__bb_site_content && globalThis.__bb_site_content.lastUpdated !== BASELINE_TIMESTAMP) {
    return globalThis.__bb_site_content;
  }

  let content = { ...defaultSiteContent };

  // 2. Try primary repo file
  try {
    if (fs.existsSync(PRIMARY_PATH)) {
      const raw = fs.readFileSync(PRIMARY_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        content = { ...content, ...parsed };
      }
    }
  } catch (err) {
    console.warn('[Site Content API] Primary disk read note:', err);
  }

  // 3. Try temp file (if temp file has newer timestamp than primary)
  try {
    if (fs.existsSync(TMP_PATH)) {
      const raw = fs.readFileSync(TMP_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        const tmpTime = new Date(parsed.lastUpdated || BASELINE_TIMESTAMP).getTime();
        const contentTime = new Date(content.lastUpdated || BASELINE_TIMESTAMP).getTime();
        if (tmpTime >= contentTime) {
          content = { ...content, ...parsed };
        }
      }
    }
  } catch (err) {
    console.warn('[Site Content API] Temp disk read note:', err);
  }

  // Auto-heal & enforce deposit policy
  if (Array.isArray(content.services) && content.services.length > 0) {
    content.services = normalizeServiceDeposits(content.services);
  } else {
    content.services = normalizeServiceDeposits(defaultCatalogServices);
  }

  globalThis.__bb_site_content = content;
  return content;
}

function saveToDisk(data: typeof defaultSiteContent) {
  globalThis.__bb_site_content = data;
  const serialized = JSON.stringify(data, null, 2);

  // 1. Try to save to primary file
  try {
    const dir = path.dirname(PRIMARY_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PRIMARY_PATH, serialized, 'utf-8');
  } catch (err) {
    // Normal on serverless read-only filesystem
  }

  // 2. Try to save to temp directory (writable on serverless)
  try {
    fs.writeFileSync(TMP_PATH, serialized, 'utf-8');
  } catch (err) {
    console.warn('[Site Content API] Temp disk write error:', err);
  }
}

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET() {
  const content = loadFromDisk();

  return NextResponse.json(
    {
      success: true,
      data: content,
    },
    { headers: NO_CACHE_HEADERS }
  );
}

export async function POST(request: Request) {
  try {
    const current = loadFromDisk();
    const body = await request.json();

    // Deep merge incoming updates
    const updated: typeof defaultSiteContent = {
      ...current,
      text: { ...current.text, ...(body.text || {}) },
      images: { ...current.images, ...(body.images || {}) },
      imageSettings: { ...current.imageSettings, ...(body.imageSettings || {}) },
      addons: Array.isArray(body.addons) ? body.addons : current.addons,
      staffCalendars: Array.isArray(body.staffCalendars) ? body.staffCalendars : current.staffCalendars,
      lookbook: Array.isArray(body.lookbook) ? body.lookbook : current.lookbook,
      services: Array.isArray(body.services) && body.services.length > 0 
        ? normalizeServiceDeposits(body.services) 
        : current.services,
      categories: Array.isArray(body.categories) ? body.categories : current.categories,
      staffSchedules: Array.isArray(body.staffSchedules) ? body.staffSchedules : current.staffSchedules,
      doubleBooking: body.doubleBooking !== undefined ? Boolean(body.doubleBooking) : current.doubleBooking,
      clients: Array.isArray(body.clients) ? body.clients : current.clients,
      depositPolicy: body.depositPolicy || current.depositPolicy,
      lastUpdated: body.lastUpdated || new Date().toISOString(),
    };

    // Persist to global memory and disk
    saveToDisk(updated);

    return NextResponse.json(
      {
        success: true,
        message: 'Site content persisted and saved globally across restarts!',
        data: updated,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error('[Site Content API] Failed to update site content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update site content' },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
