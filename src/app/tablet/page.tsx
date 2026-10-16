'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scissors,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Search,
  Check,
  ChevronRight,
  Maximize,
  Minimize,
  RotateCcw,
  Wifi,
  Coffee,
  QrCode,
  ShieldCheck,
  Star,
  Info,
  X,
  Plus,
  Share2,
  Copy,
  ExternalLink,
  Crown,
  Heart,
  Grid,
  Layers,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import { services, addons, normalizeServiceDeposits } from '@/lib/data';
import { useBookingStore } from '@/lib/store';
import { formatPrice, formatDuration, cn } from '@/lib/utils';
import { BookingFlow } from '@/components/booking/BookingFlow';

type TabletTab = 'lookbook' | 'services' | 'booking' | 'addons' | 'team' | 'prep';

export default function TabletKioskPage() {
  const { setService, setStep } = useBookingStore();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabletTab>('lookbook');

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Modals
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<any | null>(null);
  const [selectedLookbookDetail, setSelectedLookbookDetail] = useState<any | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isWifiModalOpen, setIsWifiModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Category & search filtering
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-inactivity reset (Kiosk mode safeguard)
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [kioskAutoResetEnabled, setKioskAutoResetEnabled] = useState(true);

  // Dynamic CMS Data State
  const [servicesList, setServicesList] = useState<typeof services>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_services_list');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return normalizeServiceDeposits(parsed);
        } catch (e) {}
      }
    }
    return normalizeServiceDeposits(services);
  });

  const [categoriesList, setCategoriesList] = useState<string[]>([
    'VIP Services',
    'Knotless Braids',
    'Fulani & Feed-Ins',
    'Locs & Twist',
    'Crochet & Sew Ins',
    'Kids Styles',
    'Maintenance & Take Down',
    'Mens Styles',
  ]);

  const [addonsList, setAddonsList] = useState<typeof addons>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_addons_list');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return addons;
  });

  const [lookbookList, setLookbookList] = useState<Array<{ id: string; title: string; tag: string; img: string; desc: string }>>([
    {
      id: 'lb-1',
      title: 'Knotless Box Braids',
      tag: 'Knotless Braids',
      img: 'https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=800&q=80',
      desc: 'Seamless, tension-free parting with fluid movement and zero scalp pull. Crafted for maximum longevity.',
    },
    {
      id: 'lb-2',
      title: 'Fulani Tribal Braids',
      tag: 'Fulani & Feed-Ins',
      img: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80',
      desc: 'Custom artistic cornrow patterns adorned with brass, wood, or cowrie shell accents.',
    },
    {
      id: 'lb-3',
      title: 'Passion & Goddess Twists',
      tag: 'Locs & Twist',
      img: 'https://images.unsplash.com/photo-1595642527925-4d41cb781653?auto=format&fit=crop&w=800&q=80',
      desc: 'Lightweight bohemian texture crafted with bouncy curls and ultra-soft feel for versatile styling.',
    },
    {
      id: 'lb-4',
      title: 'Feed-In Stitch Cornrows',
      tag: 'Fulani & Feed-Ins',
      img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
      desc: 'Precision razor-clean stitch lines fed seamlessly from natural hairline to ends.',
    },
    {
      id: 'lb-5',
      title: 'VIP Private Suite Experience',
      tag: 'VIP Services',
      img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      desc: 'Private 1-on-1 session with luxury scalp detox wash, custom color blending, complimentary brunch & take-home essentials.',
    },
    {
      id: 'lb-6',
      title: 'Kids Protective Braids',
      tag: 'Kids Styles',
      img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
      desc: 'Gentle, pain-free protective styles designed specifically to protect sensitive young scalps and edges.',
    },
  ]);

  const [siteText, setSiteText] = useState({
    heroHeadline: 'Crafted Braids, Elevated Care.',
    heroSubtitle: 'Elevated protective styling crafted for longevity, neatness, and scalp health in West Orange, NJ.',
    sharonBio: 'Founder & Lead Stylist with over 20 years of experience blending precision parting with weightless protective length.',
    abigailBio: 'Salon Assistant & Hair Care Specialist focused on luxury washes, deep conditioning preps, and healthy natural styling.',
  });

  // Reconcile CMS Data on mount & listen to changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadCmsData = () => {
      // Services
      const storedServices = localStorage.getItem('bb_services_list');
      if (storedServices) {
        try {
          const parsed = JSON.parse(storedServices);
          if (Array.isArray(parsed) && parsed.length > 0) setServicesList(normalizeServiceDeposits(parsed));
        } catch (e) {}
      }

      // Categories
      const storedCats = localStorage.getItem('bb_categories_list');
      if (storedCats) {
        try {
          const parsed = JSON.parse(storedCats);
          if (Array.isArray(parsed) && parsed.length > 0) setCategoriesList(parsed);
        } catch (e) {}
      }

      // Lookbook
      const storedLookbook = localStorage.getItem('bb_lookbook_list');
      if (storedLookbook) {
        try {
          const parsed = JSON.parse(storedLookbook);
          if (Array.isArray(parsed) && parsed.length > 0) setLookbookList(parsed);
        } catch (e) {}
      }

      // Addons
      const storedAddons = localStorage.getItem('bb_addons_list');
      if (storedAddons) {
        try {
          const parsed = JSON.parse(storedAddons);
          if (Array.isArray(parsed) && parsed.length > 0) setAddonsList(parsed);
        } catch (e) {}
      }
    };

    loadCmsData();

    // Fetch latest cloud CMS data
    fetch('/api/site-content')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!json?.data) return;
        if (Array.isArray(json.data.services) && json.data.services.length > 0) {
          setServicesList(normalizeServiceDeposits(json.data.services));
        }
        if (Array.isArray(json.data.categories) && json.data.categories.length > 0) {
          setCategoriesList(json.data.categories);
        }
        if (Array.isArray(json.data.lookbook) && json.data.lookbook.length > 0) {
          setLookbookList(json.data.lookbook);
        }
        if (Array.isArray(json.data.addons) && json.data.addons.length > 0) {
          setAddonsList(json.data.addons);
        }
        if (json.data.text) {
          setSiteText((prev) => ({ ...prev, ...json.data.text }));
        }
      })
      .catch((e) => console.log('Tablet sync background error:', e));

    window.addEventListener('storage', loadCmsData);
    window.addEventListener('bb_categories_updated', loadCmsData);
    return () => {
      window.removeEventListener('storage', loadCmsData);
      window.removeEventListener('bb_categories_updated', loadCmsData);
    };
  }, []);

  // Track user activity to optionally auto-reset kiosk after 4 minutes of idle
  const registerActivity = () => {
    setLastActivity(Date.now());
  };

  useEffect(() => {
    if (!kioskAutoResetEnabled) return;
    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActivity;
      // 4 minutes = 240,000ms
      if (idleTime > 240000 && (activeTab !== 'lookbook' || searchQuery || selectedServiceDetail || selectedLookbookDetail)) {
        handleResetStation();
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [lastActivity, kioskAutoResetEnabled, activeTab, searchQuery, selectedServiceDetail, selectedLookbookDetail]);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Reset station handler
  const handleResetStation = () => {
    setActiveTab('lookbook');
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedServiceDetail(null);
    setSelectedLookbookDetail(null);
    setIsQrModalOpen(false);
    setIsWifiModalOpen(false);
    registerActivity();
  };

  // Filtered Services
  const filteredServices = useMemo(() => {
    return servicesList.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' ||
        service.category.toLowerCase().trim() === activeCategory.toLowerCase().trim();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.name.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [servicesList, activeCategory, searchQuery]);

  // Filtered Lookbook
  const filteredLookbook = useMemo(() => {
    if (activeCategory === 'all') return lookbookList;
    return lookbookList.filter(
      (item) => item.tag.toLowerCase().trim() === activeCategory.toLowerCase().trim()
    );
  }, [lookbookList, activeCategory]);

  // Handle selecting a service to book
  const handleBookServiceFromTablet = (service: any) => {
    setService(service);
    setStep('datetime');
    setActiveTab('booking');
    setSelectedServiceDetail(null);
    setSelectedLookbookDetail(null);
    registerActivity();
  };

  // Handle copy with feedback
  const handleCopyText = (text: string, label: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotification(label);
      setTimeout(() => setCopiedNotification(null), 2500);
    }
  };

  // Get current URL for QR code
  const currentUrl = typeof window !== 'undefined' ? window.location.origin + '/tablet' : 'https://braidbarnj.com/tablet';
  const bookingUrl = typeof window !== 'undefined' ? window.location.origin + '/book' : 'https://braidbarnj.com/book';

  return (
    <div
      onPointerDown={registerActivity}
      className="min-h-screen flex flex-col bg-[#FAF6F2] text-espresso font-[family-name:var(--font-body)] select-none antialiased"
    >
      {/* =========================================================================
          TOP TABLET HEADER BAR (Fixed Kiosk Control Bar)
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-espresso/10 px-4 md:px-8 py-3.5 shadow-xs flex items-center justify-between gap-4">
        {/* Brand & Station Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-espresso text-cream flex items-center justify-center font-[family-name:var(--font-display)] font-bold text-lg shadow-xs">
            BB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-display)] font-extrabold text-base md:text-lg tracking-tight text-espresso">
                The Braid Bar NJ
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                iPad Station
              </span>
            </div>
            <p className="text-[11px] text-espresso/60 flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-terracotta" /> 560 Valley Road, West Orange, NJ • Suite 2
            </p>
          </div>
        </div>

        {/* Action Controls for Tablet Station */}
        <div className="flex items-center gap-2">
          {/* Send to Phone QR */}
          <button
            onClick={() => {
              setIsQrModalOpen(true);
              registerActivity();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cream/70 hover:bg-cream border border-espresso/15 text-xs font-semibold text-espresso transition-all shadow-xs cursor-pointer active:scale-95"
            title="Scan QR Code to browse or book on your personal phone"
          >
            <QrCode className="w-3.5 h-3.5 text-terracotta" />
            <span className="hidden sm:inline">Send to Phone</span>
          </button>

          {/* Salon WiFi & Amenities */}
          <button
            onClick={() => {
              setIsWifiModalOpen(true);
              registerActivity();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cream/70 hover:bg-cream border border-espresso/15 text-xs font-semibold text-espresso transition-all shadow-xs cursor-pointer active:scale-95"
            title="View salon guest WiFi password & amenities"
          >
            <Wifi className="w-3.5 h-3.5 text-terracotta" />
            <span className="hidden sm:inline">Salon WiFi</span>
          </button>

          {/* Reset Station */}
          <button
            onClick={handleResetStation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-cream border border-espresso/15 text-xs font-semibold text-espresso/80 transition-all shadow-xs cursor-pointer active:scale-95"
            title="Reset to home screen for the next client"
          >
            <RotateCcw className="w-3.5 h-3.5 text-espresso/60" />
            <span className="hidden sm:inline">Reset Station</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-espresso text-cream hover:bg-terracotta transition-all shadow-xs cursor-pointer active:scale-95"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Kiosk Mode'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* =========================================================================
          EDITORIAL HERO STRIP (Optimized for iPad Pro / iPad Air touch display)
          ========================================================================= */}
      <section className="bg-gradient-to-r from-espresso via-espresso-light to-espresso text-cream px-6 md:px-10 py-6 md:py-8 shadow-inner relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-clay-rose/10 pointer-events-none blur-2xl" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-terracotta/15 pointer-events-none blur-2xl" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-clay-rose/20 text-clay-rose-light text-[11px] font-bold uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5 text-clay-rose" /> Luxury Protective Styling
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-cream leading-tight">
              {siteText.heroHeadline || 'Crafted Braids, Elevated Care.'}
            </h1>
            <p className="text-xs md:text-sm text-cream/70 font-light leading-relaxed">
              Explore 50+ styles in the chair, view high-res lookbook examples, review transparent pricing, and reserve your upcoming appointment.
            </p>
          </div>

          {/* Quick Tablet Feature Cards */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-2xl p-3 text-center min-w-[90px]">
              <span className="block text-lg md:text-xl font-black font-[family-name:var(--font-display)] text-clay-rose">
                $50
              </span>
              <span className="text-[10px] uppercase tracking-wider text-cream/80 font-bold">Flat Deposit</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-2xl p-3 text-center min-w-[90px]">
              <span className="block text-lg md:text-xl font-black font-[family-name:var(--font-display)] text-clay-rose">
                50+
              </span>
              <span className="text-[10px] uppercase tracking-wider text-cream/80 font-bold">Styles</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-2xl p-3 text-center min-w-[90px]">
              <span className="block text-lg md:text-xl font-black font-[family-name:var(--font-display)] text-clay-rose">
                VIP
              </span>
              <span className="text-[10px] uppercase tracking-wider text-cream/80 font-bold">Suite</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRIMARY TABLET DOCK / TABS (Touch targets >= 54px for iPad fingers)
          ========================================================================= */}
      <nav className="sticky top-[69px] z-30 bg-[#FAF6F2]/95 backdrop-blur-md border-b border-espresso/10 px-4 md:px-8 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            {[
              { id: 'lookbook', label: 'Lookbook & Styles', icon: Sparkles },
              { id: 'services', label: 'Service Menu & Pricing', icon: Scissors },
              { id: 'booking', label: 'Book Appointment', icon: Calendar },
              { id: 'addons', label: 'Add-On Bar & Upgrades', icon: Plus },
              { id: 'team', label: 'Stylists & Hours', icon: UserCheck },
              { id: 'prep', label: 'Hair Prep & Policies', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabletTab);
                    registerActivity();
                  }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs md:text-sm tracking-tight transition-all shrink-0 cursor-pointer active:scale-95 shadow-2xs',
                    isActive
                      ? 'bg-espresso text-cream shadow-md'
                      : 'bg-white hover:bg-cream text-espresso/70 border border-espresso/10'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-clay-rose' : 'text-terracotta')} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Direct Book shortcut */}
          {activeTab !== 'booking' && (
            <button
              onClick={() => {
                setActiveTab('booking');
                registerActivity();
              }}
              className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-terracotta hover:bg-terracotta/90 text-cream text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Chair
            </button>
          )}
        </div>
      </nav>

      {/* =========================================================================
          MAIN TABLET CONTENT AREA
          ========================================================================= */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 space-y-6">
        {/* =======================================================================
            TAB 1: LOOKBOOK & VISUAL GALLERY
            ======================================================================= */}
        {activeTab === 'lookbook' && (
          <div className="space-y-6">
            {/* Category Filter Pills for Lookbook */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    registerActivity();
                  }}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer',
                    activeCategory === 'all'
                      ? 'bg-espresso text-cream shadow-xs'
                      : 'bg-white border border-espresso/10 text-espresso/70 hover:bg-cream'
                  )}
                >
                  All Styles
                </button>
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      registerActivity();
                    }}
                    className={cn(
                      'px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer',
                      activeCategory === cat
                        ? 'bg-espresso text-cream shadow-xs'
                        : 'bg-white border border-espresso/10 text-espresso/70 hover:bg-cream'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="text-xs text-espresso/50 font-medium">
                Tap any photo for details & in-chair reservation
              </div>
            </div>

            {/* Lookbook Grid (2-column on iPad portrait, 3-column on iPad landscape) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredLookbook.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedLookbookDetail(item);
                    registerActivity();
                  }}
                  className="bg-white rounded-3xl overflow-hidden border border-espresso/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group active:scale-[0.99]"
                >
                  <div className="relative aspect-[4/3] w-full bg-espresso/5 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-espresso/80 backdrop-blur-md text-cream text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.tag}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-espresso leading-snug group-hover:text-terracotta transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-espresso/70 line-clamp-2 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-espresso/5">
                      <span className="text-[11px] font-bold text-terracotta flex items-center gap-1">
                        View Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Find matching service or jump to services
                          setActiveTab('services');
                          setSearchQuery(item.title);
                          registerActivity();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-cream hover:bg-espresso hover:text-cream text-espresso text-xs font-bold transition-all"
                      >
                        Find Style
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB 2: FULL SERVICE MENU & PRICING (ALL 8 CATEGORIES)
            ======================================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Search & Category Filter Toolbar */}
            <div className="bg-white rounded-3xl p-4 md:p-6 border border-espresso/10 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search knotless, feed-in, boho twists, silk press, kids..."
                    className="w-full bg-[#FAF6F2] border border-espresso/15 rounded-2xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 font-medium text-espresso placeholder:text-espresso/40"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-semibold text-espresso/60 flex items-center justify-between sm:justify-end gap-2 px-1">
                  <span>Showing {filteredServices.length} styles</span>
                  <span className="inline-block w-1 h-1 rounded-full bg-espresso/30" />
                  <span className="text-terracotta font-bold">$50 Standard Deposit</span>
                </div>
              </div>

              {/* Category Pills Scroller */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    registerActivity();
                  }}
                  className={cn(
                    'px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs',
                    activeCategory === 'all'
                      ? 'bg-espresso text-cream'
                      : 'bg-[#FAF6F2] text-espresso/70 hover:bg-cream border border-espresso/10'
                  )}
                >
                  All ({servicesList.length})
                </button>
                {categoriesList.map((cat) => {
                  const count = servicesList.filter(
                    (s) => s.category.toLowerCase().trim() === cat.toLowerCase().trim()
                  ).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        registerActivity();
                      }}
                      className={cn(
                        'px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs',
                        activeCategory === cat
                          ? 'bg-espresso text-cream'
                          : 'bg-[#FAF6F2] text-espresso/70 hover:bg-cream border border-espresso/10'
                      )}
                    >
                      {cat} {count > 0 && <span className="opacity-60 text-[10px]">({count})</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Services Grid (2 Columns on iPad) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices.map((service) => {
                const isVip = service.category === 'VIP Services';
                const depositAmt = service.deposit_amount || (isVip ? 100 : 50);

                return (
                  <div
                    key={service.id}
                    onClick={() => {
                      setSelectedServiceDetail(service);
                      registerActivity();
                    }}
                    className={cn(
                      'bg-white rounded-3xl p-5 md:p-6 border transition-all duration-200 flex flex-col justify-between gap-4 cursor-pointer hover:shadow-md active:scale-[0.99]',
                      isVip
                        ? 'border-terracotta/40 bg-gradient-to-br from-white via-cream/30 to-cream/50 ring-1 ring-terracotta/20'
                        : 'border-espresso/10 hover:border-espresso/25'
                    )}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span
                            className={cn(
                              'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1.5',
                              isVip
                                ? 'bg-terracotta text-cream'
                                : 'bg-cream text-espresso/80 border border-espresso/10'
                            )}
                          >
                            {service.category}
                          </span>
                          <h3 className="font-[family-name:var(--font-display)] font-bold text-base md:text-lg text-espresso leading-snug">
                            {service.name}
                          </h3>
                        </div>

                        {/* Price Badge */}
                        <div className="text-right shrink-0">
                          <span className="font-[family-name:var(--font-display)] font-extrabold text-xl text-espresso">
                            {formatPrice(service.price)}
                          </span>
                          <span className="block text-[10px] text-espresso/50 font-bold uppercase tracking-wider">
                            ${depositAmt} dep
                          </span>
                        </div>
                      </div>

                      {/* Description Preview */}
                      <p className="text-xs text-espresso/70 line-clamp-2 leading-relaxed">
                        {service.description.replace(/\n+/g, ' ')}
                      </p>
                    </div>

                    {/* Footer Row: Duration & Action Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-espresso/5">
                      <span className="text-xs text-espresso/60 font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-terracotta" />
                        {formatDuration(service.duration_min)}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-terracotta flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Details
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookServiceFromTablet(service);
                          }}
                          className="px-4 py-2 rounded-xl bg-espresso hover:bg-terracotta text-cream text-xs font-bold tracking-wide uppercase shadow-xs transition-all cursor-pointer"
                        >
                          Book Style
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-espresso/10 p-8 space-y-3">
                <Scissors className="w-10 h-10 text-espresso/30 mx-auto" />
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">
                  No styles matched your search
                </h3>
                <p className="text-xs text-espresso/60 max-w-sm mx-auto">
                  Try searching for a different braid type (e.g. Knotless, Feed-in, Locs, Stitch) or clear your active filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-espresso text-cream text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* =======================================================================
            TAB 3: DIRECT IN-CHAIR BOOKING FLOW
            ======================================================================= */}
        {activeTab === 'booking' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-espresso/10 shadow-sm">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-espresso/10">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream text-espresso text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Calendar className="w-3.5 h-3.5 text-terracotta" /> Instant In-Chair Booking
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">
                    Reserve Your Appointment Slot
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('services')}
                  className="text-xs font-bold text-terracotta hover:underline flex items-center gap-1 cursor-pointer"
                >
                  ← Browse Styles First
                </button>
              </div>

              {/* Render integrated full booking flow */}
              <BookingFlow />
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB 4: ADD-ON BAR & UPGRADES
            ======================================================================= */}
        {activeTab === 'addons' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-espresso/10 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream text-espresso text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-terracotta" /> Hair Care Enhancements
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">
                The Add-On Bar
              </h2>
              <p className="text-xs md:text-sm text-espresso/70 leading-relaxed max-w-2xl">
                Elevate your style with custom lengths, luxury wash-station scalp treatments, Bohemian human hair curls, and custom color blends. Add-ons can be selected during the booking process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addonsList.map((addon) => (
                <div
                  key={addon.id}
                  className="bg-white rounded-3xl p-6 border border-espresso/10 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-espresso">
                        {addon.name}
                      </h3>
                      <span className="font-[family-name:var(--font-display)] font-extrabold text-xl text-terracotta">
                        +{formatPrice(addon.price)}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-espresso/60 font-semibold">
                      <Clock className="w-3 h-3 text-terracotta" />
                      +{formatDuration(addon.duration_min)}
                    </span>
                  </div>

                  <p className="text-xs text-espresso/70 leading-relaxed">
                    Available to add onto any eligible braid or natural styling appointment during booking checkout.
                  </p>

                  <div className="pt-2 border-t border-espresso/5 flex justify-end">
                    <button
                      onClick={() => {
                        setActiveTab('booking');
                        registerActivity();
                      }}
                      className="px-4 py-2 rounded-xl bg-cream hover:bg-espresso hover:text-cream text-espresso text-xs font-bold transition-all cursor-pointer"
                    >
                      Book With Add-On
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB 5: STYLISTS & HOURS
            ======================================================================= */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-espresso/10 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream text-espresso text-[11px] font-bold uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5 text-terracotta" /> Meet The Artists
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">
                The Braid Bar NJ Team
              </h2>
              <p className="text-xs md:text-sm text-espresso/70 leading-relaxed max-w-2xl">
                Dedicated protective styling artists blending professional precision parting with gentle scalp care in our West Orange, NJ salon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sharon French */}
              <div className="bg-white rounded-3xl p-6 border border-espresso/10 shadow-sm flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-espresso/5 overflow-hidden border border-espresso/10 shrink-0">
                      <img
                        src="/images/branding/profile-sharon-lead.png"
                        alt="Sharon French"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/branding/profile-sharon.png';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] font-extrabold text-xl text-espresso">
                        Sharon French
                      </h3>
                      <p className="text-xs font-bold text-terracotta">Founder & Lead Stylist</p>
                      <span className="text-[11px] text-espresso/50">20+ Years Professional Braiding Exp</span>
                    </div>
                  </div>

                  <p className="text-xs text-espresso/70 leading-relaxed">
                    {siteText.sharonBio}
                  </p>

                  <div className="bg-cream/60 rounded-2xl p-3 border border-espresso/5 space-y-1">
                    <span className="text-[11px] font-bold text-espresso uppercase tracking-wider block">
                      Chair Schedule
                    </span>
                    <p className="text-xs text-espresso/80 font-medium">
                      Tuesday – Saturday: 9:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('booking');
                    registerActivity();
                  }}
                  className="w-full py-3 rounded-2xl bg-espresso hover:bg-terracotta text-cream text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  Book With Sharon
                </button>
              </div>

              {/* Abigail Charles */}
              <div className="bg-white rounded-3xl p-6 border border-espresso/10 shadow-sm flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-espresso/5 overflow-hidden border border-espresso/10 shrink-0">
                      <img
                        src="/images/branding/profile-abigail-assistant.png"
                        alt="Abigail Charles"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/branding/profile-abigail.png';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] font-extrabold text-xl text-espresso">
                        Abigail Charles
                      </h3>
                      <p className="text-xs font-bold text-terracotta">Salon Assistant & Stylist</p>
                      <span className="text-[11px] text-espresso/50">Client Care & Hair Health Specialist</span>
                    </div>
                  </div>

                  <p className="text-xs text-espresso/70 leading-relaxed">
                    {siteText.abigailBio}
                  </p>

                  <div className="bg-cream/60 rounded-2xl p-3 border border-espresso/5 space-y-1">
                    <span className="text-[11px] font-bold text-espresso uppercase tracking-wider block">
                      Assistant Calendar & Preps
                    </span>
                    <p className="text-xs text-espresso/80 font-medium">
                      Wednesday – Sunday: 10:00 AM – 5:00 PM
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('booking');
                    registerActivity();
                  }}
                  className="w-full py-3 rounded-2xl bg-espresso hover:bg-terracotta text-cream text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  Book With Abigail
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB 6: HAIR PREP & SALON POLICIES
            ======================================================================= */}
        {activeTab === 'prep' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-espresso/10 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream text-espresso text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-terracotta" /> Client Preparation
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">
                Hair Prep & Salon Etiquette
              </h2>
              <p className="text-xs md:text-sm text-espresso/70 leading-relaxed max-w-2xl">
                To protect your hair health and ensure your appointment begins promptly, please review these key guidelines before arriving.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Rule 1 */}
              <div className="bg-white rounded-3xl p-6 border border-espresso/10 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-espresso">
                  Clean & Blown Out Hair
                </h3>
                <p className="text-xs text-espresso/70 leading-relaxed">
                  Hair must be washed, thoroughly detangled, and blown out straight from roots to ends with zero heavy oils, butters, or leave-ins unless you have booked a Luxury Shampoo Wash add-on.
                </p>
              </div>

              {/* Rule 2 */}
              <div className="bg-white rounded-3xl p-6 border border-espresso/10 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-espresso">
                  $50 Transparent Deposit Policy
                </h3>
                <p className="text-xs text-espresso/70 leading-relaxed">
                  A non-refundable $50 deposit ($100–$150 for VIP Private Suites) is required to secure your appointment. This deposit is deducted directly from your final service total on the day of styling.
                </p>
              </div>

              {/* Rule 3 */}
              <div className="bg-white rounded-3xl p-6 border border-espresso/10 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-espresso">
                  Punctuality & Grace Period
                </h3>
                <p className="text-xs text-espresso/70 leading-relaxed">
                  We offer a 15-minute grace period. Arrivals after 15 minutes may incur a late fee or require rescheduling depending on chair availability to protect the next client's scheduled start time.
                </p>
              </div>

              {/* Rule 4 */}
              <div className="bg-white rounded-3xl p-6 border border-espresso/10 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-espresso">
                  Location & Parking
                </h3>
                <p className="text-xs text-espresso/70 leading-relaxed">
                  We are conveniently located at <strong>560 Valley Road, Suite 2, West Orange, NJ</strong>. Dedicated customer parking is available on-site and on the surrounding avenue.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          MODAL 1: SERVICE DETAIL SLIDE-OVER / LIGHTBOX
          ========================================================================= */}
      <AnimatePresence>
        {selectedServiceDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-espresso/15 shadow-2xl p-6 md:p-8 space-y-6 relative"
            >
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-cream hover:bg-espresso hover:text-cream text-espresso transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cream text-espresso border border-espresso/10">
                  {selectedServiceDetail.category}
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-espresso">
                  {selectedServiceDetail.name}
                </h2>
              </div>

              {/* Pricing & Duration Hero Box */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF6F2] border border-espresso/10 text-center">
                <div>
                  <span className="block text-[11px] font-bold uppercase text-espresso/60">Total Cost</span>
                  <span className="text-xl md:text-2xl font-black font-[family-name:var(--font-display)] text-espresso">
                    {formatPrice(selectedServiceDetail.price)}
                  </span>
                </div>
                <div className="border-x border-espresso/10">
                  <span className="block text-[11px] font-bold uppercase text-espresso/60">Estimated Time</span>
                  <span className="text-xl md:text-2xl font-black font-[family-name:var(--font-display)] text-terracotta">
                    {formatDuration(selectedServiceDetail.duration_min)}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase text-espresso/60">Deposit Due Today</span>
                  <span className="text-xl md:text-2xl font-black font-[family-name:var(--font-display)] text-emerald-800">
                    ${selectedServiceDetail.deposit_amount || 50}
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-espresso/60">Style Description & Inclusions</h4>
                <div className="text-xs md:text-sm text-espresso/80 leading-relaxed whitespace-pre-line bg-white p-4 rounded-2xl border border-espresso/5">
                  {selectedServiceDetail.description}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-espresso/10">
                <button
                  onClick={() => setSelectedServiceDetail(null)}
                  className="px-5 py-3 rounded-2xl bg-cream hover:bg-espresso/10 text-espresso text-xs font-bold transition-all cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleBookServiceFromTablet(selectedServiceDetail)}
                  className="px-6 py-3 rounded-2xl bg-espresso hover:bg-terracotta text-cream text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-clay-rose" />
                  <span>Select & Book This Style</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 2: LOOKBOOK PHOTO LIGHTBOX
          ========================================================================= */}
      <AnimatePresence>
        {selectedLookbookDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full overflow-hidden border border-espresso/15 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedLookbookDetail(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-espresso/70 text-white hover:bg-espresso transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] w-full bg-espresso/10">
                <img
                  src={selectedLookbookDetail.img}
                  alt={selectedLookbookDetail.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-espresso/80 backdrop-blur-md text-cream text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedLookbookDetail.tag}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">
                    {selectedLookbookDetail.title}
                  </h3>
                  <p className="text-xs md:text-sm text-espresso/70 mt-1 leading-relaxed">
                    {selectedLookbookDetail.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-espresso/10">
                  <button
                    onClick={() => setSelectedLookbookDetail(null)}
                    className="px-4 py-2.5 rounded-xl bg-cream text-espresso text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('services');
                      setSearchQuery(selectedLookbookDetail.title);
                      setSelectedLookbookDetail(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-espresso hover:bg-terracotta text-cream text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Pricing & Options</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 3: QR CODE / SEND TO PHONE
          ========================================================================= */}
      <AnimatePresence>
        {isQrModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full border border-espresso/15 shadow-2xl p-6 md:p-8 space-y-6 text-center relative"
            >
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-cream hover:bg-espresso hover:text-cream text-espresso transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta mx-auto flex items-center justify-center mb-2">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">
                  Take The Braid Bar With You
                </h3>
                <p className="text-xs text-espresso/70 max-w-xs mx-auto">
                  Scan this QR code with your iPhone camera to browse styles or complete your booking directly on your phone.
                </p>
              </div>

              {/* QR Image */}
              <div className="flex justify-center py-2">
                <div className="p-4 bg-white rounded-2xl border-2 border-espresso/15 shadow-md">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      bookingUrl
                    )}`}
                    alt="Scan QR Code to Open on Phone"
                    className="w-48 h-48 rounded-lg"
                    width={192}
                    height={192}
                  />
                </div>
              </div>

              {/* Direct Copyable Link */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#FAF6F2] border border-espresso/10 text-xs font-mono text-espresso/80 truncate">
                  <span className="truncate">{bookingUrl}</span>
                  <button
                    onClick={() => handleCopyText(bookingUrl, 'Booking link copied!')}
                    className="p-1.5 rounded-lg bg-espresso text-cream hover:bg-terracotta transition-colors shrink-0 cursor-pointer"
                    title="Copy URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {copiedNotification && (
                  <p className="text-xs font-bold text-emerald-700 animate-pulse">{copiedNotification}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 4: SALON WIFI & AMENITIES
          ========================================================================= */}
      <AnimatePresence>
        {isWifiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full border border-espresso/15 shadow-2xl p-6 md:p-8 space-y-6 relative"
            >
              <button
                onClick={() => setIsWifiModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-cream hover:bg-espresso hover:text-cream text-espresso transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-2">
                  <Wifi className="w-6 h-6" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">
                  Salon WiFi & Amenities
                </h3>
                <p className="text-xs text-espresso/70">
                  Welcome to The Braid Bar NJ. Relax in comfort with our complimentary in-chair perks.
                </p>
              </div>

              {/* WiFi Network Card */}
              <div className="p-4 rounded-2xl bg-[#FAF6F2] border border-espresso/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-espresso/50">Guest WiFi</span>
                    <p className="text-sm font-bold text-espresso">TheBraidBar-Guest</p>
                  </div>
                  <button
                    onClick={() => handleCopyText('TheBraidBar-Guest', 'WiFi name copied!')}
                    className="p-1.5 rounded-lg bg-cream hover:bg-espresso hover:text-cream text-espresso text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-espresso/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-espresso/50">Password</span>
                    <p className="text-sm font-mono font-bold text-terracotta">knotjustbraids</p>
                  </div>
                  <button
                    onClick={() => handleCopyText('knotjustbraids', 'Password copied!')}
                    className="p-1.5 rounded-lg bg-cream hover:bg-espresso hover:text-cream text-espresso text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
              </div>

              {/* Complimentary Amenities List */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-espresso/60 block">
                  Complimentary In-Chair Perks
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-espresso/80 font-medium">
                  <div className="p-2.5 rounded-xl bg-cream/50 border border-espresso/5 flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-terracotta" /> Tea & Espresso
                  </div>
                  <div className="p-2.5 rounded-xl bg-cream/50 border border-espresso/5 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-terracotta" /> Chilled Drinks
                  </div>
                  <div className="p-2.5 rounded-xl bg-cream/50 border border-espresso/5 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-terracotta" /> Phone Chargers
                  </div>
                  <div className="p-2.5 rounded-xl bg-cream/50 border border-espresso/5 flex items-center gap-2">
                    <Crown className="w-3.5 h-3.5 text-terracotta" /> Satin Pillows
                  </div>
                </div>
              </div>

              {copiedNotification && (
                <p className="text-xs text-center font-bold text-emerald-700 animate-pulse">{copiedNotification}</p>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          BOTTOM TABLET FOOTER (Minimal Kiosk Bar)
          ========================================================================= */}
      <footer className="mt-auto bg-white border-t border-espresso/10 px-6 py-4 text-center text-xs text-espresso/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} The Braid Bar NJ • 560 Valley Road, West Orange, NJ • (973) 972-9864</p>
          <div className="flex items-center gap-3 font-semibold text-espresso/70">
            <Link href="/" className="hover:text-terracotta">Full Website</Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-terracotta">Admin Portal</Link>
            <span>•</span>
            <button onClick={handleResetStation} className="hover:text-terracotta cursor-pointer">
              Reset Station
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
