/**
 * Home Page — Braid Bar NJ
 * =======================
 * Premium Editorial Redesign — Earthy tones, terracotta, peach,
 * cream backgrounds, elegant serif headings, and fine grid line layouts.
 */

'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Scissors, ArrowRight, Star, MapPin, Instagram, Heart } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import CartDrawer from '@/components/shop/CartDrawer';
import { ServiceList } from '@/components/services/ServiceList';
import { BookingFlow } from '@/components/booking/BookingFlow';
import { InstaFeed } from '@/components/gallery/InstaFeed';
import { SplashPage } from '@/components/ui/SplashPage';
import HeroCanvas from '@/components/hero/HeroCanvas';
import { getWhatsAppLink, cn } from '@/lib/utils';
import { ComingSoonPage } from '@/components/ui/ComingSoonPage';

/* Animated Section Reveal Wrapper */
function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [membershipSpend, setMembershipSpend] = useState(150);

  const [isSiteLive, setIsSiteLive] = useState<boolean>(true);
  const [isCheckingLiveMode, setIsCheckingLiveMode] = useState(true);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bb_site_live');
      const isOwnerAuthed = sessionStorage.getItem('bb_owner_authed') === 'true';
      const hasPreviewQuery = window.location.search.includes('preview=true');
      // If owner is logged into /admin OR has ?preview=true OR site is live: bypass Coming Soon!
      setIsSiteLive(saved === 'true' || isOwnerAuthed || hasPreviewQuery);
      setIsCheckingLiveMode(false);
    }
  }, []);

  if (!isCheckingLiveMode && !isSiteLive) {
    return <ComingSoonPage />;
  }

  const whatsappUrl = getWhatsAppLink({
    serviceName: 'Hair Styling Session',
    date: 'Selected Date',
    time: 'Selected Time',
    customerName: 'Client Inquiry',
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-cream bg-vogue-floor text-espresso">
      {/* Splash Intro Screen */}
      <SplashPage />

      {/* Navigation & Cart */}
      <Navigation />
      <CartDrawer />

      {/* =============================================
          1. HERO SECTION — Full Bleed Image & Color Wash
          ============================================= */}
      <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Full-bleed End-to-End Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/branding/hero-sitting.jpg"
            alt="Braid Bar Hero Background"
            className="w-full h-full object-cover object-[center_30%]"
          />
          {/* Solid dark wash backdrop overlay for text readability */}
          <div className="absolute inset-0 bg-[#000000]/45 z-10 mix-blend-multiply" />
          
          {/* Floating color fading overlay */}
          <HeroCanvas transparent={true} />
        </div>

        {/* Fine background grid lines */}
        <div className="absolute inset-y-0 left-1/4 w-[1px] bg-white/10 pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-1/4 w-[1px] bg-white/10 pointer-events-none z-20" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-20 flex flex-col justify-center py-32">
          {/* Text block centered on the full-bleed screen */}
          <div className="max-w-2xl flex flex-col gap-6 text-left">
            {/* Highly highlighted, high-contrast address badge */}
            <div className="inline-flex items-center gap-2 bg-terracotta/80 backdrop-blur-md text-cream px-4 py-2 rounded-full border border-white/20 w-fit shadow-md">
              <MapPin className="w-3.5 h-3.5 text-accent-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream">
                560 Valley Road, West Orange, NJ
              </span>
            </div>

            {/* Logo Wordmark Image instead of plain text */}
            <div className="relative w-fit select-none">
              <img 
                src="/images/branding/logo-braidbar-stacked.png" 
                alt="Braid Bar Logo" 
                className="h-24 sm:h-36 md:h-48 w-auto object-contain filter drop-shadow-lg"
              />
            </div>

            <p className="text-white/95 text-base md:text-lg font-light leading-relaxed max-w-xl font-[family-name:var(--font-body)] drop-shadow-sm">
              Elevated protective styling crafted for longevity, neatness, and scalp health. Knotless braids, custom cornrows, and private VIP experiences designed around you.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="#lookbook"
                className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-white hover:text-espresso text-cream font-medium px-8 py-4 rounded-full transition-all text-xs uppercase tracking-[0.2em] shadow-lg"
              >
                <Scissors className="w-3.5 h-3.5" />
                View Gallery
              </a>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white text-white hover:text-espresso font-medium px-8 py-4 rounded-full transition-all text-xs uppercase tracking-[0.2em] border border-white/20 shadow-lg backdrop-blur-sm"
              >
                <Scissors className="w-3.5 h-3.5" />
                Get Braided
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          2. WAVY ORGANIC TICKER BANNER (SVG CURVED TEXT-PATH)
          ============================================= */}
      <div className="relative w-full py-4 z-30 select-none overflow-hidden my-2">
        <div className="relative w-full h-36 sm:h-44 flex items-center justify-center">
          <svg 
            className="w-full h-full text-espresso filter drop-shadow-2xl overflow-visible" 
            viewBox="0 0 1200 180" 
            preserveAspectRatio="none"
          >
            <defs>
              {/* Continuous Wave Path for Curved Text to Follow */}
              <path 
                id="textWavePath" 
                d="M -1200,95 C -1000,185 -800,5 -600,95 C -400,185 -200,5 0,95 C 200,185 400,5 600,95 C 800,185 1000,5 1200,95 C 1400,185 1600,5 1800,95 C 2000,185 2200,5 2400,95" 
              />
            </defs>

            {/* Dark Espresso Organic Double-Wave Ribbon Background */}
            <path 
              d="M 0,60 C 200,160 400,-20 600,60 C 800,140 1000,-10 1200,60 L 1200,140 C 1000,70 800,220 600,140 C 400,60 200,240 0,140 Z" 
              fill="#1E1210" 
            />

            {/* Gold Accent Curved Contour Borders */}
            <path 
              d="M 0,60 C 200,160 400,-20 600,60 C 800,140 1000,-10 1200,60" 
              fill="none" 
              stroke="#E4AF9E" 
              strokeWidth="4" 
              opacity="0.85" 
            />
            <path 
              d="M 0,140 C 200,240 400,60 600,140 C 800,220 1000,70 1200,140" 
              fill="none" 
              stroke="#E4AF9E" 
              strokeWidth="4" 
              opacity="0.85" 
            />

            {/* Text Flowing on the Exact Wave Contour Path */}
            <text fill="#FAF2EA" fontSize="13" fontWeight="bold" letterSpacing="0.25em" dy="2">
              <textPath href="#textWavePath" startOffset="0%">
                🌊 KNOTLESS BRAIDS • FULANI DESIGNS • LOC MAINTENANCE • WASH &amp; BLOW DRY • HAIR CARE ✦ 560 VALLEY ROAD, WEST ORANGE, NJ 🌊 KNOTLESS BRAIDS • FULANI DESIGNS • LOC MAINTENANCE • WASH &amp; BLOW DRY • HAIR CARE ✦ 560 VALLEY ROAD, WEST ORANGE, NJ 🌊 KNOTLESS BRAIDS • FULANI DESIGNS • LOC MAINTENANCE • WASH &amp; BLOW DRY • HAIR CARE ✦ 560 VALLEY ROAD, WEST ORANGE, NJ
                <animate attributeName="startOffset" from="0%" to="-50%" dur="28s" repeatCount="indefinite" />
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* =============================================
          3. BRAND MISSION SECTION (Oval image & Headline)
          ============================================= */}
      <AnimatedSection className="py-24 bg-cream px-4 relative">
        {/* Editorial layout markings */}
        <div className="absolute top-8 left-8 text-[9px] font-bold uppercase tracking-[0.2em] text-espresso/40 z-10">NO. 1</div>
        <div className="absolute top-8 right-8 text-[9px] font-bold uppercase tracking-[0.2em] text-espresso/40 z-10">BRAND MISSION</div>
        
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-normal text-espresso leading-tight mb-8 max-w-3xl">
            Crafted Braids. Elevated Care. <br className="hidden md:inline" />
            <span className="font-normal italic font-[family-name:var(--font-display)] text-terracotta">Everyday Luxury.</span>
          </h2>
          
          <div className="w-12 h-[1px] bg-espresso/20 mb-8" />

          <p className="text-espresso/70 text-sm max-w-xl mx-auto leading-relaxed mb-6 font-light">
            We believe styling protective crowns should be a therapeutic, beautiful ritual. Our space in West Orange, New Jersey is structured around VIP client comfort, neat and clean grid partings, and meticulous tension-free braid installations that nurture your natural hair growth.
          </p>

          <a
            href="#lookbook"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-espresso hover:text-terracotta transition-colors border-b border-espresso pb-1"
          >
            View Gallery
          </a>
        </div>
      </AnimatedSection>

      <div className="editorial-line-h max-w-7xl mx-auto" />

      {/* =============================================
          4. DUAL PORTFOLIO & MENU LISTING (Asymmetric)
          ============================================= */}
      <AnimatedSection className="py-24 bg-cream px-4 relative">
        <div className="absolute top-8 left-8 text-[9px] font-bold uppercase tracking-[0.2em] text-espresso/40">NO. 2</div>
        <div className="absolute top-8 right-8 text-[9px] font-bold uppercase tracking-[0.2em] text-espresso/40">STYLE PORTFOLIO</div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Side: Oval Image & Custom Menu Links */}
          <div className="md:col-span-5 flex flex-col gap-10">
            <div className="w-full aspect-[4/3] oval-frame border border-espresso/10 overflow-hidden bg-cream-dark shadow-sm">
              <img
                src="/images/braids-twists.jpg"
                alt="Braid Bar twists"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Simulated Menu Listing (As seen in the Billie image) */}
            <div className="flex flex-col border-t border-espresso/15">
              {[
                { 
                  name: 'KNOTLESS CHAIR EXPERIENCE', 
                  href: `https://wa.me/19739729864?text=${encodeURIComponent("Hi! I'd like to book a Knotless Chair Experience styling session at Braid Bar NJ!")}`, 
                  no: '01' 
                },
                { 
                  name: 'FULANI SIGNATURE BRAIDS', 
                  href: `https://wa.me/19739729864?text=${encodeURIComponent("Hi! I'd like to inquire about booking the Fulani Signature Braids style at Braid Bar NJ!")}`, 
                  no: '02' 
                },
                { 
                  name: 'PASSION TWISTS & LOCS', 
                  href: `https://wa.me/19739729864?text=${encodeURIComponent("Hi! I'd like to book a Passion Twists & Locs session at Braid Bar NJ!")}`, 
                  no: '03' 
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between py-4 border-b border-espresso/10 text-left hover:text-terracotta transition-colors group"
                >
                  <span className="text-[10px] tracking-[0.2em] font-semibold text-espresso/70 group-hover:text-terracotta">{item.name}</span>
                  <span className="text-[9px] font-light text-espresso/45 group-hover:text-terracotta">VIEW NO. {item.no} →</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Large Vertical Image & Overlapping Lettering */}
          <div className="md:col-span-7 relative flex items-center justify-end">
            <div className="w-5/6 aspect-[3/4] rounded-2xl overflow-hidden border border-espresso/10 bg-cream-dark shadow-md">
              <img
                src="/images/braids-fulani.jpg"
                alt="Braid Bar lookbook style"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping yellow serif word (Portfolio/Lookbook) */}
            <div className="absolute bottom-8 left-0 z-20 select-none pointer-events-none">
              <span className="font-[family-name:var(--font-display)] text-7xl md:text-9xl font-bold tracking-tight text-accent-gold drop-shadow-sm italic">
                Lookbook
              </span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* =============================================
          5. FULL-WIDTH CLIENT TESTIMONIAL BANNER
          ============================================= */}
      <AnimatedSection className="py-28 px-4 bg-terracotta text-cream text-center relative overflow-hidden">
        {/* Editorial markings */}
        <div className="absolute top-8 left-8 text-[9px] font-bold uppercase tracking-[0.2em] text-cream/40">NO. 3</div>
        <div className="absolute top-8 right-8 text-[9px] font-bold uppercase tracking-[0.2em] text-cream/40">CLIENT JOURNAL</div>

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 text-accent-gold fill-accent-gold" />
            ))}
          </div>

          <blockquote className="font-[family-name:var(--font-display)] text-3xl md:text-5xl italic text-accent-gold max-w-3xl leading-snug font-normal">
            &ldquo;Make it clever or cheeky, but put some type of quote or testimonial here.&rdquo;
          </blockquote>

          <p className="text-cream/80 text-[10px] uppercase tracking-widest font-semibold font-[family-name:var(--font-body)]">
            — Jasmine T., West Orange NJ
          </p>
        </div>
      </AnimatedSection>

      {/* =============================================
          6. MEET THE TEAM SECTION (Clean editorial layout)
          ============================================= */}
      <AnimatedSection id="about" className="py-24 bg-cream px-4 relative">
        <div className="absolute top-8 left-8 text-[9px] font-bold uppercase tracking-[0.2em] text-espresso/40">NO. 4</div>
        <div className="absolute top-8 right-8 text-[9px] font-bold uppercase tracking-[0.2em] text-espresso/40">BEHIND THE CRAFT</div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-terracotta text-xs font-semibold uppercase tracking-[0.3em] mb-2 block">
              Meet the Stylists
            </span>
            <h2 className="text-espresso font-[family-name:var(--font-display)] text-4xl font-bold mb-4">
              Behind The Braid Bar
            </h2>
            <p className="text-espresso/70 text-sm max-w-xl mx-auto leading-relaxed font-light">
              Precision styling led by over 20 years of natural hair expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch max-w-4xl mx-auto">
            {/* Sharon French Card */}
            <div className="flex flex-col gap-6">
              <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-espresso/10 bg-cream-dark shadow-sm">
                <img 
                  src="/images/branding/profile-sharon-lead.png"
                  alt="Sharon French - Founder & Lead Stylist" 
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-terracotta uppercase block mb-1">Founder &amp; Lead Stylist</span>
                <h3 className="text-espresso font-[family-name:var(--font-display)] text-2xl font-bold mb-3">Sharon French</h3>
                <p className="text-espresso/70 text-xs font-light leading-relaxed mb-4">
                  Sharon French is a self-taught braider with over 20 years of experience. At Braid Bar NJ, she blends precision parting with weightless protective length, ensuring your natural hair is shielded, neat, and styled beautifully.
                </p>
                <div className="text-[9px] uppercase tracking-wider text-espresso/50 font-semibold">
                  📍 560 Valley Road, West Orange • 20+ Years Exp
                </div>
              </div>
            </div>

            {/* Abigail Charles Card */}
            <div className="flex flex-col gap-6">
              <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-espresso/10 bg-cream-dark shadow-sm">
                <img 
                  src="/images/branding/profile-abigail-assistant.png"
                  alt="Abigail Charles - Salon Assistant & Stylist" 
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-terracotta uppercase block mb-1">Salon Assistant &amp; Stylist</span>
                <h3 className="text-espresso font-[family-name:var(--font-display)] text-2xl font-bold mb-3">Abigail Charles</h3>
                <p className="text-espresso/70 text-xs font-light leading-relaxed mb-4">
                  Abigail Charles supports natural hair preps, wash-station washes, and braid removals, ensuring every client enjoys a relaxing, VIP prep experience while continuing to develop natural styling techniques.
                </p>
                <div className="text-[9px] uppercase tracking-wider text-espresso/50 font-semibold">
                  📍 560 Valley Road, West Orange • Client Care Specialist
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* =============================================
          8. REAL-TIME LOOKBOOK & INSTA FEED
          ============================================= */}
      <AnimatedSection id="lookbook" className="py-24 px-4 bg-cream border-t border-espresso/10 relative overflow-hidden">
        {/* Uploaded Organic Wavy Tan Lines Background Pattern (Full Bleed End-to-End Left to Right) */}
        <div 
          className="absolute inset-0 z-0 opacity-75 bg-no-repeat bg-center pointer-events-none" 
          style={{ 
            backgroundImage: 'url(/images/branding/pattern-waves-tan.png)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center center'
          }}
        />

        {/* Elegant organic background swirl graphics matching monogram color palette */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-50">
          <svg className="absolute w-[600px] h-[600px] -top-20 -left-28 text-clay-rose/25 fill-current blur-[2px]" viewBox="0 0 100 100">
            <path d="M 0 30 C 15 5, 30 75, 45 40 C 60 5, 75 75, 90 40 L 90 100 L 0 100 Z" />
          </svg>
          <svg className="absolute w-[700px] h-[700px] -bottom-40 -right-28 text-terracotta/15 fill-current rotate-180 blur-[2px]" viewBox="0 0 100 100">
            <path d="M 0 30 C 25 5, 45 85, 65 40 C 85 5, 105 85, 125 40 L 125 100 L 0 100 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-terracotta font-semibold text-xs uppercase tracking-[0.3em] mb-2 block">
              The Gallery
            </span>
            <h2 className="text-espresso font-[family-name:var(--font-display)] text-4xl font-bold mb-4">
              Real-Time Work
            </h2>
            <p className="text-espresso/70 text-sm max-w-xl mx-auto leading-relaxed font-light">
              Browse actual protective styles straight from our @braidbarnj Instagram feed.
            </p>
          </div>
          <InstaFeed />
        </div>
      </AnimatedSection>

      {/* =============================================
          9. POINTS MEMBERSHIP & LOYALTY CIRCLE
          ============================================= */}
      <AnimatedSection id="membership" className="py-24 px-4 bg-warm-white border-t border-espresso/10 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-terracotta font-semibold text-xs uppercase tracking-[0.3em] mb-2 block">
              Loyalty Club
            </span>
            <h2 className="text-espresso font-[family-name:var(--font-display)] text-4xl font-bold mb-4">
              The Loyalty Circle
            </h2>
            <p className="text-espresso/70 text-sm max-w-xl mx-auto leading-relaxed font-light">
              Earn points with every visit. Redeem them for luxurious add-ons, products, and VIP styling experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            {/* Left side: Calculator */}
            <div className="lg:col-span-5 bg-white border border-espresso/10 p-8 rounded-3xl shadow-sm flex flex-col gap-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">
                Point Calculator
              </h3>
              <p className="text-espresso/70 text-xs font-light">
                Drag the slider to estimate your styling spend and calculate your points:
              </p>
              
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-bold text-espresso/50">Estimated Spend</span>
                  <span className="text-terracotta font-bold text-2xl font-[family-name:var(--font-display)]">${membershipSpend}</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="1000" 
                  step="25"
                  value={membershipSpend}
                  onChange={(e) => setMembershipSpend(Number(e.target.value))}
                  className="w-full accent-terracotta cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-espresso/40 font-medium">
                  <span>$50</span>
                  <span>$1000</span>
                </div>
              </div>

              <div className="border-t border-espresso/5 pt-4 flex justify-between items-center">
                <div>
                  <span className="text-[9px] uppercase font-bold text-espresso/50 block">Points Earned</span>
                  <span className="text-espresso font-[family-name:var(--font-display)] text-3xl font-bold">{membershipSpend} pts</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase font-bold text-espresso/50 block">Active Status</span>
                  <span className="text-terracotta text-xs font-bold uppercase tracking-wider">
                    {membershipSpend < 200 ? 'Bronze' : membershipSpend < 500 ? 'Silver' : 'Gold VIP'}
                  </span>
                </div>
              </div>

              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-espresso hover:bg-terracotta text-cream text-xs uppercase tracking-wider py-3.5 rounded-full transition-colors font-medium"
              >
                Join Loyalty Circle
              </a>
            </div>

            {/* Right side: Rewards list */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                { pts: 100, title: 'Crown Hydration Prep', desc: 'Complimentary warm herbal wash and therapeutic steam treatment before your braid installation.', tier: 'Bronze Tier' },
                { pts: 250, title: 'Edge Care & Satin Set', desc: 'Edge touch-up detailing session plus a premium Braid Bar satin bonnet and styling oil pack.', tier: 'Silver Tier' },
                { pts: 500, title: 'VIP Suite Upgrade', desc: 'Styling session in our private VIP station, custom complimentary catering/refreshments + 10% off any knotless service.', tier: 'Gold VIP Tier' },
              ].map((reward) => (
                <div 
                  key={reward.pts} 
                  className={cn(
                    "p-6 rounded-2xl border transition-all duration-300 flex justify-between items-start gap-4 bg-white",
                    membershipSpend >= reward.pts 
                      ? "border-terracotta shadow-sm scale-[1.01]" 
                      : "border-espresso/5 opacity-70"
                  )}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-cream text-terracotta text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-terracotta/20">
                        {reward.tier}
                      </span>
                      {membershipSpend >= reward.pts && (
                        <span className="text-emerald-600 text-[10px] font-bold">✓ Unlocked</span>
                      )}
                    </div>
                    <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-espresso">
                      {reward.title}
                    </h4>
                    <p className="text-espresso/70 text-xs font-light leading-relaxed">
                      {reward.desc}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="block text-xl font-[family-name:var(--font-display)] font-bold text-terracotta">{reward.pts}</span>
                    <span className="block text-[8px] uppercase tracking-wider text-espresso/40 font-bold">points</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* =============================================
          10. LET'S CONNECT — EVENTS & INQUIRIES
          ============================================= */}
      <AnimatedSection id="events" className="py-24 px-4 bg-cream border-t border-espresso/10 relative scroll-mt-20">
        {/* Subtle patterned wall column background accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-salon-wallpaper opacity-[0.05] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-terracotta font-semibold text-xs uppercase tracking-[0.3em] mb-2 block">
              Community Calendar
            </span>
            <h2 className="text-espresso font-[family-name:var(--font-display)] text-4xl font-bold mb-4">
              Let’s Connect
            </h2>
            <p className="text-espresso/70 text-sm max-w-xl mx-auto leading-relaxed font-light">
              Join our hands-on workshops, natural hair styling masterclasses, and styling networking events at our West Orange space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { 
                date: 'SAT, OCT 12', 
                time: '6:00 PM - 8:30 PM', 
                title: 'Braid & Sip Masterclass', 
                desc: 'A hands-on, relaxed evening with Sharon French. Bring your favorite beverage and learn professional tension-free parting, hair prep, and knotless base foundation techniques.',
                tag: 'Hands-On Styling' 
              },
              { 
                date: 'SUN, NOV 08', 
                time: '2:00 PM - 4:30 PM', 
                title: 'Clean Roots Scalp Wellness Panel', 
                desc: 'A fireside discussion with regional natural hair care specialists. Dive into protective styling longevity, scalp hydration science, tension relief, and healthy hair transition routines.',
                tag: 'Wellness & Health' 
              }
            ].map((event) => (
              <div key={event.title} className="bg-white border border-espresso/10 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:border-terracotta transition-colors duration-300">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-terracotta bg-cream border border-terracotta/20 px-3 py-1 rounded-full">
                      {event.tag}
                    </span>
                    <span className="text-espresso/40 text-[10px] font-bold tracking-wider uppercase">
                      {event.date}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso mb-2">
                      {event.title}
                    </h3>
                    <p className="text-espresso/60 text-xs font-light leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>

                <div className="border-t border-espresso/5 pt-6 mt-6 flex justify-between items-center">
                  <span className="text-[10px] text-espresso/50 font-medium">
                    🕒 {event.time} • 📍 560 Valley Road
                  </span>
                  <a 
                    href={`https://wa.me/19739729864?text=${encodeURIComponent(`Hi! I'd like to RSVP for the ${event.title} event on ${event.date}!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-terracotta hover:text-espresso font-semibold transition-colors"
                  >
                    RSVP on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* =============================================
          10. NEWSLETTER SIGNUP
          ============================================= */}
      <AnimatedSection className="py-20 px-4 bg-cream border-t border-espresso/10 relative">
        <div className="max-w-md mx-auto text-center relative z-10">
          <span className="text-terracotta font-semibold text-xs uppercase tracking-[0.3em] mb-2 block">
            Newsletter
          </span>
          <h3 className="text-espresso font-[family-name:var(--font-display)] text-2xl font-bold mb-4">
            Join the Braid Bar Circle
          </h3>
          <p className="text-espresso/70 text-xs font-light mb-6">
            Get early calendar access openings, care tips, and updates sent to your inbox.
          </p>

          {subscribed ? (
            <div className="p-4 bg-white/70 border border-espresso/15 rounded-full text-xs font-medium text-espresso">
              🎉 Thank you! Check your inbox for updates.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-espresso/15 rounded-full text-xs font-light outline-none focus:border-terracotta"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-terracotta hover:bg-espresso text-cream font-medium rounded-full text-xs uppercase tracking-wider transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </div>
  );
}
