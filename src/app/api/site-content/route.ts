import { NextResponse } from 'next/server';

// Server-persisted Master Site Content store
let siteContent = {
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
  },
  addons: [
    { id: 'add-1', name: 'Luxury Shampoo & Scalp Detox Wash', price: 35, duration_min: 30 },
    { id: 'add-2', name: 'Extra Waist / Hip Extended Length', price: 40, duration_min: 45 },
    { id: 'add-3', name: 'Bohemian Curly Ends (Human Hair)', price: 50, duration_min: 45 },
    { id: 'add-4', name: 'Custom Hair Color Blending', price: 25, duration_min: 20 },
    { id: 'add-5', name: 'Goddess Braid Accents', price: 30, duration_min: 30 },
    { id: 'add-6', name: 'Braid Takedown & Comb Out Prep', price: 60, duration_min: 60 },
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
  lastUpdated: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: siteContent,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.text) siteContent.text = { ...siteContent.text, ...body.text };
    if (body.images) siteContent.images = { ...siteContent.images, ...body.images };
    if (body.addons) siteContent.addons = body.addons;
    if (body.staffCalendars) siteContent.staffCalendars = body.staffCalendars;
    if (body.lookbook) siteContent.lookbook = body.lookbook;
    siteContent.lastUpdated = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: 'Site content updated and saved globally!',
      data: siteContent,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update site content' },
      { status: 500 }
    );
  }
}
