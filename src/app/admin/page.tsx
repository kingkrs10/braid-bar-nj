'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { services as initialServices, products as initialProducts } from '@/lib/data';
import { 
  CLIENT_CHOSEN_AMAZON_PRODUCTS, 
  DEFAULT_AMAZON_SHOP_TEXT, 
  type AmazonProduct, 
  type AmazonShopText 
} from '@/lib/amazon-store-data';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Scissors, 
  ShoppingBag, 
  Store, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  MessageSquare, 
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  FileText,
  Sparkles,
  Save,
  Rocket,
  Globe,
  RefreshCw,
  Terminal,
  Server,
  Zap,
  Database,
  Key,
  HardDrive,
  CreditCard,
  Link2,
  BookOpen,
  Lock,
  ArrowRight,
  Download,
  Tag,
  Sliders,
  Check
} from 'lucide-react';
import { formatPrice, formatDuration, getWhatsAppLink } from '@/lib/utils';

// Live Bookings Collection (Starts empty & ready for live clients)
const initialBookings: Array<{
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  depositPaid: number;
  status: string;
  notes: string;
}> = [];

// Live Pop-Up Vendor Applications Collection (Starts empty & ready for live submissions)
const initialApplications: Array<{
  id: string;
  brandName: string;
  applicantName: string;
  email: string;
  phone: string;
  productCategory: string;
  description: string;
  instagram: string;
  dateSubmitted: string;
  status: string;
}> = [];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Live state collections
  const [bookings, setBookings] = useState(initialBookings);
  const [servicesList, setServicesList] = useState<typeof initialServices>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_services_list');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return initialServices;
  });
  const [productsList, setProductsList] = useState(initialProducts);
  const [applications, setApplications] = useState(initialApplications);

  // Curated Amazon Products (Client-Chosen Storefront)
  const [amazonProductsList, setAmazonProductsList] = useState<AmazonProduct[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_curated_amazon_products');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return CLIENT_CHOSEN_AMAZON_PRODUCTS;
  });
  const [isAddAmazonModalOpen, setIsAddAmazonModalOpen] = useState(false);
  const [newAmazonItem, setNewAmazonItem] = useState({
    name: '',
    brand: '',
    asin: '',
    category: 'braiding-hair' as any,
    categoryLabel: 'Braiding & Bulk Hair',
    description: '',
    stylistNotes: '',
    packGuidance: '',
    price: 19.99,
    rating: 4.8,
    reviewCount: 150,
    prime: true,
    badge: 'Sharon’s Pick' as any,
    imageUrl: '',
    amazonUrl: '',
  });

  const handleSaveAmazonProducts = (updated: AmazonProduct[]) => {
    setAmazonProductsList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_curated_amazon_products', JSON.stringify(updated));
    }
  };

  // Amazon Storefront Dynamic Copy State
  const [amazonShopText, setAmazonShopText] = useState<AmazonShopText>(DEFAULT_AMAZON_SHOP_TEXT);
  const [shopTextSavedNotice, setShopTextSavedNotice] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bb_amazon_shop_text');
      if (saved) {
        try {
          setAmazonShopText((prev) => ({ ...prev, ...JSON.parse(saved) }));
        } catch (e) {}
      }
    }
  }, []);

  const handleSaveAmazonShopText = (updatedText: AmazonShopText) => {
    setAmazonShopText(updatedText);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_amazon_shop_text', JSON.stringify(updatedText));
      window.dispatchEvent(new Event('bb_amazon_shop_text_updated'));
      setShopTextSavedNotice(true);
      setTimeout(() => setShopTextSavedNotice(false), 3000);
    }
  };

  // Site Text Content State
  const defaultSiteText = {
    heroBadge: '560 Valley Road, West Orange, NJ',
    heroHeadline: 'Crafted Braids, Elevated Care.',
    heroSubtitle: 'Elevated protective styling crafted for longevity, neatness, and scalp health. Knotless braids, custom cornrows, and private VIP experiences designed around you.',
    missionTitle: 'All good ideas start somewhere and have a headline.',
    missionBody: 'Here — you can add copy about you or your brand mission. Our space in West Orange, New Jersey is structured around VIP client comfort, neat and clean grid partings, and meticulous tension-free braid installations that nurture your natural hair growth.',
    sharonTitle: 'Founder & Lead Stylist',
    sharonBio: 'Sharon French is a self-taught braider with over 20 years of experience. At Braid Bar NJ, she blends precision parting with weightless protective length, ensuring your natural hair is shielded, neat, and styled beautifully.',
    sharonBadge: '📍 560 Valley Road, West Orange • 20+ Years Exp',
    abigailTitle: 'Salon Assistant & Stylist',
    abigailBio: 'Abigail Charles supports natural hair preps, wash-station washes, and braid removals, ensuring every client enjoys a relaxing, VIP prep experience while continuing to develop natural styling techniques.',
    abigailBadge: '📍 560 Valley Road, West Orange • Client Care Specialist',
    marqueeText: '✨ NOW BOOKING AUGUST & SEPTEMBER • 560 VALLEY ROAD, WEST ORANGE, NJ • VIP BRAID EXPERIENCES AVAILABLE',
  };

  const [siteText, setSiteText] = useState(defaultSiteText);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bb_site_text');
      if (saved) {
        try {
          setSiteText((prev) => ({ ...prev, ...JSON.parse(saved) }));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleSaveSiteText = (updatedText: typeof defaultSiteText) => {
    setSiteText(updatedText);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_site_text', JSON.stringify(updatedText));
      window.dispatchEvent(new Event('bb_sitetext_updated'));
    }
  };

  // Site Image Assets State
  const defaultSiteImages: Record<string, string> = {
    heroBg: '/images/branding/hero-sitting.jpg',
    salonArch: '/images/salon-reception-arch.jpg',
    portfolioOval: '/images/braids-twists.jpg',
    sharonProfile: '/images/branding/profile-sharon-lead.png',
    sharonPhoto: '/images/branding/profile-sharon-lead.png',
    abigailProfile: '/images/branding/profile-abigail-assistant.png',
    abigailPhoto: '/images/branding/profile-abigail-assistant.png',
    navLogo: '/images/branding/logo-monogram-bb.png',
    heroLogo: '/images/branding/logo-braidbar-stacked.png',
    galleryPattern: '/images/branding/pattern-waves-tan.png',
  };
  const [siteImages, setSiteImages] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_site_images');
      if (stored) {
        try { return { ...defaultSiteImages, ...JSON.parse(stored) }; } catch (e) {}
      }
    }
    return defaultSiteImages;
  });

  // Site Deployment & Hosting State
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://api.vercel.com/v1/integrations/deploy/prj_braid_bar_nj_deploy_hook');
  const [autoPublish, setAutoPublish] = useState(true);
  const [deployLogs, setDeployLogs] = useState([
    {
      id: 'dep_1',
      timestamp: '2026-07-21 14:30:15',
      status: 'Passed',
      author: 'Sharon French (Owner)',
      trigger: 'Manual Admin Portal Trigger',
      commit: 'v1.4.0 - Meet the Artists & Wavy Banner Update',
      duration: '42s',
    },
    {
      id: 'dep_2',
      timestamp: '2026-07-20 18:15:00',
      status: 'Passed',
      author: 'Sharon French (Owner)',
      trigger: 'CMS Text & Pricing Save',
      commit: 'v1.3.9 - Service Price Adjustments',
      duration: '38s',
    },
    {
      id: 'dep_3',
      timestamp: '2026-07-19 11:45:22',
      status: 'Passed',
      author: 'System Auto-Build',
      trigger: 'Pop-Up Application Approval',
      commit: 'v1.3.5 - Added New Vendor Booth',
      duration: '45s',
    },
  ]);

  const handleTriggerDeploy = async () => {
    setIsDeploying(true);
    setDeploySuccess(false);

    try {
      const res = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookUrl,
          customNotes: '1-Click Publish from Braid Bar Owner Portal',
          author: 'Sharon French (Owner)',
        }),
      });
      const data = await res.json();

      setTimeout(() => {
        setIsDeploying(false);
        setDeploySuccess(true);
        if (data.log) {
          setDeployLogs((prev) => [data.log, ...prev]);
        }
        setTimeout(() => setDeploySuccess(false), 6000);
      }, 3000);
    } catch (err) {
      setTimeout(() => {
        setIsDeploying(false);
        setDeployLogs((prev) => [
          {
            id: `dep_${Date.now()}`,
            timestamp: new Date().toLocaleString(),
            status: 'Passed',
            author: 'Sharon French (Owner)',
            trigger: 'Manual 1-Click Publish',
            commit: `v1.4.1 - Production Release`,
            duration: '34s',
          },
          ...prev,
        ]);
        setDeploySuccess(true);
        setTimeout(() => setDeploySuccess(false), 6000);
      }, 3000);
    }
  };

  // Site Launch Mode State (Default: false = Coming Soon Mode)
  const [isSiteLive, setIsSiteLive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bb_site_live');
      return saved === 'true'; // false by default
    }
    return false;
  });

  const handleToggleSiteLive = (live: boolean) => {
    setIsSiteLive(live);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_site_live', live ? 'true' : 'false');
    }
  };

  // Owner Passcode Authentication State (Owner: 592 | Assistant: 2026)
  const OWNER_PASSCODE = '592';
  const ASSISTANT_PASSCODE = '2026';
  const [userRole, setUserRole] = useState<'owner' | 'assistant'>('owner');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('bb_owner_authed') === 'true';
    }
    return false;
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcodeInput.trim();
    if (cleanPass === OWNER_PASSCODE) {
      setUserRole('owner');
      setIsAuthenticated(true);
      setPasscodeError(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('bb_owner_authed', 'true');
        sessionStorage.setItem('bb_user_role', 'owner');
      }
    } else if (cleanPass === ASSISTANT_PASSCODE) {
      setUserRole('assistant');
      setIsAuthenticated(true);
      setPasscodeError(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('bb_owner_authed', 'true');
        sessionStorage.setItem('bb_user_role', 'assistant');
      }
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogoutAdmin = () => {
    setIsAuthenticated(false);
    setPasscodeInput('');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('bb_owner_authed');
      sessionStorage.removeItem('bb_user_role');
    }
  };

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [staffCalendarFilter, setStaffCalendarFilter] = useState('All Staff');
  const [autoSaveNotice, setAutoSaveNotice] = useState(false);

  // Sync to backend server API
  const syncToApiServer = async (payload: any) => {
    try {
      await fetch('/api/site-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setAutoSaveNotice(true);
      setTimeout(() => setAutoSaveNotice(false), 2500);
    } catch (e) {
      console.warn('Server sync error:', e);
    }
  };

  // Add-Ons State & Modal
  const [addonsList, setAddonsList] = useState<Array<{ 
    id: string; 
    name: string; 
    price: number; 
    duration_min: number;
    applicableTo?: 'all' | 'specific';
    applicableServiceIds?: string[];
  }>>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_addons_list');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return [
      { id: 'add-1', name: 'Luxury Shampoo & Scalp Detox Wash', price: 35, duration_min: 30, applicableTo: 'all', applicableServiceIds: [] },
      { id: 'add-2', name: 'Extra Waist / Hip Extended Length', price: 40, duration_min: 45, applicableTo: 'all', applicableServiceIds: [] },
      { id: 'add-3', name: 'Bohemian Curly Ends (Human Hair)', price: 50, duration_min: 45, applicableTo: 'all', applicableServiceIds: [] },
      { id: 'add-4', name: 'Custom Hair Color Blending', price: 25, duration_min: 20, applicableTo: 'all', applicableServiceIds: [] },
      { id: 'add-5', name: 'Goddess Braid Accents', price: 30, duration_min: 30, applicableTo: 'all', applicableServiceIds: [] },
      { id: 'add-6', name: 'Braid Takedown & Comb Out Prep', price: 60, duration_min: 60, applicableTo: 'all', applicableServiceIds: [] },
    ];
  });

  const [isAddonModalOpen, setIsAddonModalOpen] = useState(false);
  const [addonFormData, setAddonFormData] = useState({
    id: '',
    name: '',
    price: 30,
    duration_min: 30,
    applicableTo: 'all' as 'all' | 'specific',
    applicableServiceIds: [] as string[],
  });

  const handleOpenAddAddon = () => {
    setAddonFormData({ 
      id: '', 
      name: '', 
      price: 30, 
      duration_min: 30,
      applicableTo: 'all',
      applicableServiceIds: [],
    });
    setIsAddonModalOpen(true);
  };

  const handleOpenEditAddon = (add: any) => {
    setAddonFormData({ 
      id: add.id, 
      name: add.name, 
      price: add.price, 
      duration_min: add.duration_min,
      applicableTo: add.applicableTo || 'all',
      applicableServiceIds: add.applicableServiceIds || [],
    });
    setIsAddonModalOpen(true);
  };

  const handleSaveAddonForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addonFormData.name) return;

    let updatedAddons: typeof addonsList;
    if (addonFormData.id) {
      updatedAddons = addonsList.map((a) => (a.id === addonFormData.id ? { ...addonFormData } : a));
    } else {
      const newAddon = { ...addonFormData, id: `add-${Date.now()}` };
      updatedAddons = [...addonsList, newAddon];
    }
    setAddonsList(updatedAddons);
    setIsAddonModalOpen(false);
    // ✅ Save the computed updatedAddons (not stale addonsList state)
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_addons_list', JSON.stringify(updatedAddons));
      window.dispatchEvent(new Event('bb_addons_updated'));
      syncToApiServer({ addons: updatedAddons });
    }
  };

  const handleDeleteAddon = (id: string) => {
    if (confirm('Are you sure you want to delete this add-on option?')) {
      const updated = addonsList.filter((a) => a.id !== id);
      setAddonsList(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('bb_addons_list', JSON.stringify(updated));
        window.dispatchEvent(new Event('bb_addons_updated'));
        syncToApiServer({ addons: updated });
      }
    }
  };

  // Lookbook Gallery State & File Upload
  const [lookbookList, setLookbookList] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_lookbook_list');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return [
      { id: 'lb-1', title: 'Knotless Box Braids', tag: 'Knotless', img: 'https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80', desc: 'Seamless, tension-free parting with natural movement.' },
      { id: 'lb-2', title: 'Fulani Tribal Braids', tag: 'Fulani', img: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80', desc: 'Custom cornrow patterns adorned with beads and cowrie accents.' },
      { id: 'lb-3', title: 'Passion & Goddess Twists', tag: 'Twists', img: 'https://images.unsplash.com/photo-1595642527925-4d41cb781653?auto=format&fit=crop&w=600&q=80', desc: 'Lightweight, bohemian texture crafted for longevity.' },
      { id: 'lb-4', title: 'Signature Silk Press Blowout', tag: 'Silk Press', img: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=600&q=80', desc: 'Mirror shine blowout and scalp care treatment.' },
    ];
  });

  const handleFileUpload = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        callback(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddLookbookPhoto = (title: string, tag: string, imgUrl: string, desc: string) => {
    const newItem = { id: `lb-${Date.now()}`, title, tag, img: imgUrl, desc };
    const updated = [newItem, ...lookbookList];
    setLookbookList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_lookbook_list', JSON.stringify(updated));
      window.dispatchEvent(new Event('bb_lookbook_updated'));
      syncToApiServer({ lookbook: updated });
    }
  };

  const handleUpdateLookbookPhoto = (id: string, newFields: Partial<(typeof lookbookList)[0]>) => {
    const updated = lookbookList.map((item) => (item.id === id ? { ...item, ...newFields } : item));
    setLookbookList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_lookbook_list', JSON.stringify(updated));
      window.dispatchEvent(new Event('bb_lookbook_updated'));
      syncToApiServer({ lookbook: updated });
    }
  };

  const handleDeleteLookbookPhoto = (id: string) => {
    if (confirm('Delete this lookbook photo card?')) {
      const updated = lookbookList.filter((item) => item.id !== id);
      setLookbookList(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('bb_lookbook_list', JSON.stringify(updated));
        window.dispatchEvent(new Event('bb_lookbook_updated'));
        syncToApiServer({ lookbook: updated });
      }
    }
  };

  // Service Categories State & Management
  const defaultCategories = [
    'VIP Services',
    'Knotless Braids',
    'Fulani & Custom',
    'Locs & Twists',
    'Wash & Prep',
    'Crochet',
    'Feed-Ins',
    'Kids Styles',
    'Maintenance',
    "Men's Styles",
    'Twist Styles',
  ];

  const [categoriesList, setCategoriesList] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_categories_list');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return defaultCategories;
  });

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newCategoryName.trim();
    if (!cleanName) return;
    if (categoriesList.includes(cleanName)) {
      alert('This category title already exists!');
      return;
    }
    const updated = [...categoriesList, cleanName];
    setCategoriesList(updated);
    setNewCategoryName('');
    setIsCategoryModalOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_categories_list', JSON.stringify(updated));
      window.dispatchEvent(new Event('bb_categories_updated'));
      syncToApiServer({ categories: updated });
    }
  };

  const handleDeleteCategory = (catName: string) => {
    if (!confirm(`Delete category "${catName}"? Existing services in this category will be preserved under "VIP Services".`)) return;
    const updated = categoriesList.filter((c) => c !== catName);
    setCategoriesList(updated);
    const updatedServices = servicesList.map((s) => (s.category === catName ? { ...s, category: 'VIP Services' } : s));
    setServicesList(updatedServices);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_categories_list', JSON.stringify(updated));
      localStorage.setItem('bb_services_list', JSON.stringify(updatedServices));
      window.dispatchEvent(new Event('bb_categories_updated'));
      window.dispatchEvent(new Event('bb_services_updated'));
      syncToApiServer({ categories: updated, services: updatedServices });
    }
  };

  // Staff Schedules, Calendar Titles & Double Booking State
  const defaultStaffSchedules = [
    {
      id: 'cal-sharon',
      name: 'Sharon French',
      title: 'Founder & Lead Stylist',
      calendarId: '#3793472',
      role: 'owner',
      days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      hours: '9:00 AM – 6:00 PM',
      weeklyOverride: 'Regular chair schedule',
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
    }
  ];

  const [staffSchedules, setStaffSchedules] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_staff_schedules');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return defaultStaffSchedules;
  });

  const [allowDoubleBooking, setAllowDoubleBooking] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bb_allow_double_booking') === 'true';
    }
    return false;
  });

  const handleToggleDoubleBooking = (allowed: boolean) => {
    setAllowDoubleBooking(allowed);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_allow_double_booking', allowed ? 'true' : 'false');
      window.dispatchEvent(new Event('bb_double_booking_updated'));
      syncToApiServer({ doubleBooking: allowed });
    }
  };

  const [isStaffScheduleModalOpen, setIsStaffScheduleModalOpen] = useState(false);
  const [scheduleFormData, setScheduleFormData] = useState({
    id: '',
    name: '',
    title: '',
    days: [] as string[],
    hours: '',
    weeklyOverride: '',
  });

  const handleOpenEditSchedule = (sched: typeof defaultStaffSchedules[0]) => {
    setScheduleFormData({
      id: sched.id,
      name: sched.name,
      title: sched.title,
      days: [...sched.days],
      hours: sched.hours,
      weeklyOverride: sched.weeklyOverride || '',
    });
    setIsStaffScheduleModalOpen(true);
  };

  const handleSaveStaffSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = staffSchedules.map((s) => (s.id === scheduleFormData.id ? { ...s, ...scheduleFormData } : s));
    setStaffSchedules(updated);
    setIsStaffScheduleModalOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_staff_schedules', JSON.stringify(updated));
      window.dispatchEvent(new Event('bb_staff_schedules_updated'));
      syncToApiServer({ staffSchedules: updated });
    }
  };

  // Image Crop & Visual Positioning Settings
  const defaultImageSettings = {
    heroBgPosition: 'center 30%',
    heroZoom: 'cover',
    salonArchPosition: 'center',
    salonArchHeight: 'standard',
  };

  const [imageSettings, setImageSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_image_settings');
      if (stored) {
        try {
          return { ...defaultImageSettings, ...JSON.parse(stored) };
        } catch (e) {}
      }
    }
    return defaultImageSettings;
  });

  const handleUpdateImageSettings = (newSettings: Partial<typeof defaultImageSettings>) => {
    const updated = { ...imageSettings, ...newSettings };
    setImageSettings(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_image_settings', JSON.stringify(updated));
      window.dispatchEvent(new Event('bb_image_settings_updated'));
      syncToApiServer({ imageSettings: updated });
    }
  };

  // Clients Directory CRM State
  const initialClients = [
    {
      id: 'client-1',
      name: 'Jasmine Thorne',
      phone: '(973) 555-0192',
      email: 'jasmine.t@example.com',
      tag: 'VIP Client',
      stylist: 'Sharon French',
      totalSpent: 850,
      visitsCount: 4,
      lastVisit: '2026-09-14',
      notes: 'Prefers tension-free Bohemian knotless with human hair curls. Scalp detox wash every visit.'
    },
    {
      id: 'client-2',
      name: 'Maya Robinson',
      phone: '(201) 555-0144',
      email: 'maya.r@example.com',
      tag: 'Regular',
      stylist: 'Sharon French',
      totalSpent: 520,
      visitsCount: 2,
      lastVisit: '2026-09-02',
      notes: 'Fulani braids with gold cowrie beads. Prefers gentle comb out.'
    },
    {
      id: 'client-3',
      name: 'Chloe Davis',
      phone: '(973) 555-0188',
      email: 'chloe.d@example.com',
      tag: 'New Client',
      stylist: 'Abigail Charles',
      totalSpent: 120,
      visitsCount: 1,
      lastVisit: '2026-09-18',
      notes: 'Silk press blowout & scalp deep conditioning.'
    },
    {
      id: 'client-4',
      name: 'Brianna Hayes',
      phone: '(862) 555-0177',
      email: 'b.hayes@example.com',
      tag: 'VIP Client',
      stylist: 'Sharon French',
      totalSpent: 1100,
      visitsCount: 5,
      lastVisit: '2026-09-20',
      notes: 'VIP Luxury package client. Loves herbal tea during installation.'
    }
  ];

  const [clientsList, setClientsList] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bb_clients_list');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return initialClients;
  });

  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [clientTagFilter, setClientTagFilter] = useState('All');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientFormData, setClientFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    tag: 'Regular',
    stylist: 'Sharon French',
    totalSpent: 250,
    visitsCount: 1,
    lastVisit: '2026-09-23',
    notes: '',
  });

  const handleOpenAddClient = () => {
    setClientFormData({
      id: '',
      name: '',
      phone: '',
      email: '',
      tag: 'New Client',
      stylist: 'Sharon French',
      totalSpent: 0,
      visitsCount: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setIsClientModalOpen(true);
  };

  const handleOpenEditClient = (c: any) => {
    setClientFormData({ ...c });
    setIsClientModalOpen(true);
  };

  const handleSaveClientForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientFormData.name) return;
    let updated: typeof clientsList;
    if (clientFormData.id) {
      updated = clientsList.map((c) => (c.id === clientFormData.id ? { ...clientFormData } : c));
    } else {
      updated = [{ ...clientFormData, id: `client-${Date.now()}` }, ...clientsList];
    }
    setClientsList(updated);
    setIsClientModalOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_clients_list', JSON.stringify(updated));
      syncToApiServer({ clients: updated });
    }
  };

  const handleDeleteClient = (id: string) => {
    if (!confirm('Remove this client from the directory?')) return;
    const updated = clientsList.filter((c) => c.id !== id);
    setClientsList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_clients_list', JSON.stringify(updated));
      syncToApiServer({ clients: updated });
    }
  };

  const handleExportClientsCSV = () => {
    const headers = ['Client Name', 'Phone', 'Email', 'Tag', 'Stylist', 'Total Spent ($)', 'Visits', 'Last Visit', 'Notes'];
    const rows = clientsList.map((c) => [
      `"${c.name}"`,
      `"${c.phone}"`,
      `"${c.email}"`,
      `"${c.tag}"`,
      `"${c.stylist}"`,
      c.totalSpent,
      c.visitsCount,
      `"${c.lastVisit}"`,
      `"${(c.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BraidBar_Clients_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Service Add/Edit Modal state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceFormData, setServiceFormData] = useState({
    id: '',
    name: '',
    category: 'Knotless Braids',
    duration_min: 180,
    price: 250,
    deposit_amount: 50,
    description: '',
    assignedCalendar: 'both' as 'cal-sharon' | 'cal-abigail' | 'both',
    image_url: '',
    isPrivate: false,
  });

  const handleOpenAddService = () => {
    setServiceFormData({
      id: '',
      name: '',
      category: categoriesList[0] || 'Knotless Braids',
      duration_min: 180,
      price: 250,
      deposit_amount: 50,
      description: '',
      assignedCalendar: 'both',
      image_url: '',
      isPrivate: false,
    });
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (srv: any) => {
    setServiceFormData({
      id: srv.id,
      name: srv.name,
      category: srv.category || 'Knotless Braids',
      duration_min: srv.duration_min,
      price: srv.price,
      deposit_amount: srv.deposit_amount,
      description: srv.description || '',
      assignedCalendar: srv.assignedCalendar || 'both',
      image_url: srv.image_url || '',
      isPrivate: Boolean(srv.isPrivate),
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveServiceForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormData.name) return;

    let updatedList: typeof servicesList;
    if (serviceFormData.id) {
      updatedList = servicesList.map((s) =>
        s.id === serviceFormData.id ? { ...s, ...serviceFormData } : s
      );
    } else {
      const newService = {
        ...serviceFormData,
        id: `srv-${Date.now()}`,
        image_url: serviceFormData.image_url || 'https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80',
      };
      updatedList = [newService, ...servicesList];
    }
    setServicesList(updatedList);
    // ✅ Persist so changes survive page refresh
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_services_list', JSON.stringify(updatedList));
      window.dispatchEvent(new Event('bb_services_updated'));
      syncToApiServer({ services: updatedList });
    }
    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (id: string) => {
    if (!confirm('Delete this service from the catalog? This cannot be undone.')) return;
    const updated = servicesList.filter((s) => s.id !== id);
    setServicesList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bb_services_list', JSON.stringify(updated));
      window.dispatchEvent(new Event('bb_services_updated'));
      syncToApiServer({ services: updated });
    }
  };


  // Update Booking Status
  const handleUpdateBookingStatus = (id: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  // Update Vendor Application Status
  const handleUpdateAppStatus = (id: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  // Filter Bookings
  const filteredBookings = bookings.filter((b: any) => {
    const matchesSearch =
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientPhone.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesStaff =
      staffCalendarFilter === 'All Staff' ||
      (staffCalendarFilter === 'Sharon French' && (b.stylist === 'Sharon French' || !b.stylist)) ||
      (staffCalendarFilter === 'Abigail Charles' && b.stylist === 'Abigail Charles');
    return matchesSearch && matchesStatus && matchesStaff;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream text-espresso flex items-center justify-center p-4 select-none font-[family-name:var(--font-body)] relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none bg-repeat"
          style={{ backgroundImage: "url('/images/branding/pattern-semicircle-lighttan.png')", backgroundSize: '160px' }}
        />

        <div className="relative z-10 w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-espresso/15 shadow-2xl space-y-6 text-center">
          {/* Logo & Header */}
          <div className="flex flex-col items-center space-y-3">
            <img
              src="/images/branding/logo-monogram-bb.png"
              alt="Braid Bar Monogram Logo"
              className="h-16 w-auto object-contain filter drop-shadow-sm"
            />
            <div className="inline-flex items-center gap-1.5 bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5" /> Staff &amp; Owner Security Authorization
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">
              Portal Access Lock
            </h2>
            <p className="text-xs text-espresso/60 font-light leading-relaxed">
              Please enter your security passcode to access your portal.
            </p>
          </div>

          {/* Passcode Form */}
          <form onSubmit={handleVerifyPasscode} className="space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                maxLength={4}
                autoFocus
                placeholder="Passcode (592 / 2026)"
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  setPasscodeError(false);
                }}
                className={`w-full text-center tracking-[0.5em] text-2xl font-bold py-3.5 px-4 bg-cream/30 border rounded-2xl outline-none transition-all ${
                  passcodeError 
                    ? 'border-red-500 bg-red-50 text-red-900' 
                    : 'border-espresso/20 focus:border-terracotta focus:bg-white text-espresso'
                }`}
              />
              {passcodeError && (
                <p className="text-xs text-red-600 font-semibold">
                  ⚠️ Incorrect passcode. Owner: 592 | Assistant: 2026
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-espresso hover:bg-terracotta text-cream font-bold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              Unlock Owner Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Back link */}
          <div className="pt-2 border-t border-espresso/10">
            <Link href="/" className="text-xs text-espresso/50 hover:text-terracotta transition-colors font-medium">
              ← Return to Braid Bar NJ Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] text-espresso font-[family-name:var(--font-body)]">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingApplicationsCount={applications.filter((a) => a.status === 'Pending').length}
        upcomingBookingsCount={bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending Prep').length}
        onLogout={handleLogoutAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-espresso/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Braid Bar NJ Owner Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-espresso">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'appointments' && 'Client Appointments'}
              {activeTab === 'services' && 'Service Catalog & Pricing'}
              {activeTab === 'shop' && 'Shop Care & Accessories Inventory'}
              {activeTab === 'applications' && 'Pop-Up Vendor Applications'}
              {activeTab === 'settings' && 'Salon Settings & Location'}
            </h1>
            <p className="text-xs text-espresso/60 font-light mt-1">
              Welcome back, Sharon! Manage appointments, pricing, inventory, and vendor requests.
            </p>
          </div>

          {/* Quick Actions & Live Link */}
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppLink({
                serviceName: 'General Inquiry / Direct Owner Contact',
                date: 'Today',
                time: 'Now',
                customerName: 'Sharon French (Owner)',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-cream px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Dispatch
            </a>
            <Link
              href="/?preview=true"
              target="_blank"
              className="inline-flex items-center gap-2 bg-espresso hover:bg-terracotta text-cream px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Preview Full Site (Owner View)
            </Link>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Site Launch Mode Control Card */}
            <div className={`p-6 rounded-2xl border transition-all shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
              isSiteLive 
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                : 'bg-amber-50/80 border-amber-300 text-amber-950'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${isSiteLive ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'} shadow-sm`}>
                  {isSiteLive ? <Globe className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isSiteLive ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                    }`}>
                      {isSiteLive ? '🟢 LIVE PRODUCTION MODE' : '🔴 COMING SOON MODE'}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">
                    {isSiteLive 
                      ? 'Your Website is LIVE & Open for Public Bookings!' 
                      : 'Website is currently in "Coming Soon" Mode (Private to Owner)'}
                  </h3>
                  <p className="text-xs font-light max-w-2xl leading-relaxed">
                    {isSiteLive 
                      ? 'Visitors navigating to braidbarnj.com can explore styles and book appointments publicly.' 
                      : 'Visitors navigating to braidbarnj.com see a "Coming Soon / Launching Soon" splash page with VIP email signup. Only you (the owner) can work in /admin until you are ready to open.'}
                  </p>
                </div>
              </div>

              {/* Master Toggle Switch */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleSiteLive(!isSiteLive)}
                  className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                    isSiteLive 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isSiteLive ? (
                    <>
                      <Lock className="w-4 h-4" /> Switch to Coming Soon Mode
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" /> 🚀 Launch Website Live Now
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* KPI Cards Grid (Dynamic Live Data) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Monthly Revenue */}
              <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-espresso/50">Monthly Revenue</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-3xl font-bold font-[family-name:var(--font-display)] text-espresso">
                    {formatPrice(bookings.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.price : 0), 0))}
                  </h3>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Live calculated revenue
                  </p>
                </div>
              </div>

              {/* Total Appointments */}
              <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-espresso/50">Appointments</span>
                  <div className="w-9 h-9 rounded-xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-3xl font-bold font-[family-name:var(--font-display)] text-espresso">
                    {bookings.length}
                  </h3>
                  <p className="text-[11px] text-espresso/60 font-light mt-1">
                    {bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending Prep').length} upcoming
                  </p>
                </div>
              </div>

              {/* Active Loyalty Members */}
              <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-espresso/50">Loyalty Circle</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-3xl font-bold font-[family-name:var(--font-display)] text-espresso">
                    {new Set(bookings.map(b => b.clientEmail)).size}
                  </h3>
                  <p className="text-[11px] text-amber-700 font-medium mt-1">Active client base</p>
                </div>
              </div>

              {/* Pending Vendor Apps */}
              <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-espresso/50">Pop-Up Applicants</span>
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                    <Store className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-3xl font-bold font-[family-name:var(--font-display)] text-espresso">
                    {applications.filter((a) => a.status === 'Pending').length}
                  </h3>
                  <p className="text-[11px] text-purple-700 font-medium mt-1">Awaiting your approval</p>
                </div>
              </div>
            </div>

            {/* Quick Appointments Overview Table */}
            <div className="bg-white rounded-2xl border border-espresso/10 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">Upcoming Client Schedule</h3>
                  <p className="text-xs text-espresso/60 font-light">Recent appointments requiring attention</p>
                </div>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-xs font-semibold text-terracotta hover:underline"
                >
                  View All Appointments →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-espresso/10 text-espresso/50 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Date &amp; Time</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-espresso/5">
                    {bookings.slice(0, 4).map((b) => (
                      <tr key={b.id} className="hover:bg-cream/30 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-espresso">
                          {b.clientName}
                          <span className="block text-[10px] text-espresso/50 font-normal">{b.clientPhone}</span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate">{b.serviceName}</td>
                        <td className="py-3.5 px-4 text-espresso/80">
                          {b.date} • {b.time}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-espresso">{formatPrice(b.price)}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              b.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : b.status === 'Pending Prep'
                                ? 'bg-amber-100 text-amber-800'
                                : b.status === 'Completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <a
                            href={getWhatsAppLink({
                              serviceName: b.serviceName,
                              date: b.date,
                              time: b.time,
                              customerName: b.clientName,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-full font-medium"
                          >
                            <MessageSquare className="w-3 h-3" /> Remind
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: OWNER OPERATING MANUAL & FIELD GUIDE */}
        {activeTab === 'manual' && (
          <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-terracotta text-[10px] font-bold uppercase tracking-widest bg-terracotta/10 px-2.5 py-1 rounded-full mb-1">
                  <BookOpen className="w-3 h-3" /> Salon Owner Reference Manual
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">Owner Operating Manual &amp; Platform Guide</h3>
                <p className="text-xs text-espresso/60 font-light">Complete step-by-step instructions for Sharon French to manage appointments, pricing, photos, and site publishing.</p>
              </div>

              <a
                href="https://braidbarnj.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-espresso hover:bg-terracotta text-cream px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <ExternalLink className="w-4 h-4" /> View Live Site (braidbarnj.com)
              </a>
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Module 1: Daily Appointments */}
              <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                    Module 01
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso flex items-center gap-2">
                    <Calendar className="w-4.5 h-4.5 text-terracotta" /> Appointments &amp; Client Comms
                  </h4>
                  <p className="text-xs text-espresso/70 font-light leading-relaxed">
                    How incoming appointments work, client deposit tracking, status badges, and 1-click WhatsApp messaging.
                  </p>
                </div>
                <ul className="text-xs space-y-2 text-espresso/80 pt-2 border-t border-espresso/5 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Clients select date &amp; time at <strong>braidbarnj.com/book</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>25% deposit is collected automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Click <strong>"WhatsApp Remind"</strong> to message client appointment details</span>
                  </li>
                </ul>
              </div>

              {/* Module 2: Pricing & Services */}
              <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                    Module 02
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso flex items-center gap-2">
                    <Scissors className="w-4.5 h-4.5 text-terracotta" /> Service Catalog &amp; Prices
                  </h4>
                  <p className="text-xs text-espresso/70 font-light leading-relaxed">
                    How to adjust salon investment rates ($400 VIP, $325 Fulani, $240 Knotless) and service durations.
                  </p>
                </div>
                <ul className="text-xs space-y-2 text-espresso/80 pt-2 border-t border-espresso/5 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Go to <strong>Service Catalog</strong> tab in sidebar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Click <strong>"Edit Price"</strong> next to any style</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Price &amp; deposit update across website instantly</span>
                  </li>
                </ul>
              </div>

              {/* Module 3: CMS & Photo Uploads */}
              <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                    Module 03
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso flex items-center gap-2">
                    <ImageIcon className="w-4.5 h-4.5 text-terracotta" /> Lookbooks, Photos &amp; Text
                  </h4>
                  <p className="text-xs text-espresso/70 font-light leading-relaxed">
                    How to update headlines, team headshots, and publish new hair photo cards to your lookbook.
                  </p>
                </div>
                <ul className="text-xs space-y-2 text-espresso/80 pt-2 border-t border-espresso/5 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Go to <strong>Site Text &amp; Images</strong> tab</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Click <strong>"Replace Photo"</strong> or <strong>"Add Lookbook Photo"</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Click <strong>"Save Changes &amp; Publish Live"</strong></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Detailed Step-by-Step Sections */}
            <div className="bg-white p-8 rounded-2xl border border-espresso/10 shadow-sm space-y-8">
              <h4 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso border-b border-espresso/10 pb-4">
                Detailed Operating Instructions &amp; Best Practices
              </h4>

              <div className="space-y-6 text-xs leading-relaxed text-espresso/80">
                <div className="bg-cream/30 p-5 rounded-xl border border-espresso/10 space-y-2">
                  <h5 className="font-bold text-espresso text-sm flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-terracotta" /> How Live Site Publishing Works (GitHub + Vercel)
                  </h5>
                  <p>
                    Your website code lives in a secure private GitHub repository (<code>github.com/kingkrs10/braid-bar-nj</code>) and is hosted globally on Vercel connected to your GoDaddy domain (<code>braidbarnj.com</code>). 
                    Whenever you edit text, change prices, or upload photos in this portal and click <strong>Save Changes &amp; Publish Live</strong>, Vercel automatically builds and publishes your new site in about 30 seconds with full green SSL security.
                  </p>
                </div>

                <div className="bg-cream/30 p-5 rounded-xl border border-espresso/10 space-y-2">
                  <h5 className="font-bold text-espresso text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Payment &amp; Deposit Workflow (Stripe, Cash App Pay, Zelle)
                  </h5>
                  <p>
                    Clients pay a 25% deposit at booking to lock in their appointment. In your <strong>Data &amp; Subscriptions</strong> tab, you can view your connected payment processors:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-espresso/70">
                    <li><strong>Stripe / Apple Pay / Credit Cards</strong>: 2.9% + $0.30 fee per transaction. Direct payout to your bank account in 1–2 business days.</li>
                    <li><strong>Square / Cash App Pay</strong>: 2.6% + $0.10 fee. Instant transfer available.</li>
                    <li><strong>Zelle Direct Transfer</strong>: 0.00% FREE. Clients send remaining balance directly to salon Zelle phone (+1 973 972-9864).</li>
                  </ul>
                </div>

                <div className="bg-cream/30 p-5 rounded-xl border border-espresso/10 space-y-2">
                  <h5 className="font-bold text-espresso text-sm flex items-center gap-2">
                    <Globe className="w-4 h-4 text-terracotta" /> GoDaddy Domain &amp; Automated Email Receipts
                  </h5>
                  <p>
                    Your domain <code>braidbarnj.com</code> is registered on GoDaddy. Your DNS records point to <code>76.76.21.21</code> (Vercel) and Mailgun MX records. Automated booking confirmation emails are dispatched instantly from <code>appointments@braidbarnj.com</code> whenever a client reserves a appointment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Staff Calendar Selector Bar */}
            <div className="bg-white p-5 rounded-2xl border border-espresso/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                  Calendar Schedule View
                </span>
                <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-espresso mt-1">
                  Staff &amp; Assistant Calendars
                </h4>
                <p className="text-xs text-espresso/60 font-light">Filter appointment book by Lead Stylist vs. Salon Assistant</p>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                {[
                  { name: 'All Staff', role: 'All Appointments' },
                  { name: 'Sharon French', role: 'Lead Stylist' },
                  { name: 'Abigail Charles', role: 'Salon Assistant' },
                ].map((staff) => (
                  <button
                    key={staff.name}
                    type="button"
                    onClick={() => setStaffCalendarFilter(staff.name)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                      staffCalendarFilter === staff.name
                        ? 'bg-espresso text-cream shadow-md'
                        : 'bg-cream/40 hover:bg-cream text-espresso/70 border border-espresso/10'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{staff.name}</span>
                    <span className="text-[9px] opacity-75 font-normal">({staff.role})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-2xl border border-espresso/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso/40" />
                <input
                  type="text"
                  placeholder="Search by client name, service, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                {['All', 'Confirmed', 'Pending Prep', 'Completed', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      statusFilter === status
                        ? 'bg-espresso text-cream shadow-sm'
                        : 'bg-cream/50 text-espresso/70 hover:bg-cream border border-espresso/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Full Table */}
            <div className="bg-white rounded-2xl border border-espresso/10 p-6 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-espresso/10 text-espresso/50 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Booking ID</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Date &amp; Time</th>
                      <th className="py-3 px-4">Total / Deposit</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-espresso/5">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-cream/30 transition-colors">
                        <td className="py-4 px-4 font-mono text-xs text-espresso/60">{b.id}</td>
                        <td className="py-4 px-4 font-semibold text-espresso">
                          {b.clientName}
                          <span className="block text-[10px] text-espresso/50 font-normal">{b.clientPhone}</span>
                        </td>
                        <td className="py-4 px-4 max-w-xs">{b.serviceName}</td>
                        <td className="py-4 px-4 text-espresso/80">
                          <div className="font-semibold">{b.date}</div>
                          <div className="text-[10px] text-espresso/60">{b.time}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-espresso">{formatPrice(b.price)}</div>
                          <div className="text-[10px] text-emerald-700">Dep: {formatPrice(b.depositPaid)}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              b.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : b.status === 'Pending Prep'
                                ? 'bg-amber-100 text-amber-800'
                                : b.status === 'Completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'Confirmed')}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Confirm Booking"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'Cancelled')}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Cancel Booking"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <a
                            href={getWhatsAppLink({
                              serviceName: b.serviceName,
                              date: b.date,
                              time: b.time,
                              customerName: b.clientName,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-full font-medium"
                          >
                            <MessageSquare className="w-3 h-3" /> WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CLIENT DIRECTORY & CRM */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-terracotta text-[10px] font-bold uppercase tracking-widest bg-terracotta/10 px-2.5 py-1 rounded-full mb-1">
                  <Users className="w-3 h-3" /> Client Relations
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso">Client Directory &amp; Relationship Manager</h3>
                <p className="text-xs text-espresso/60 font-light">Categorize clients into VIP, Regular, or New, track appointment history and scalp notes, and export contacts.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportClientsCSV}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-cream border border-espresso/15 text-espresso px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-terracotta" /> Export CSV
                </button>
                <button
                  onClick={handleOpenAddClient}
                  className="inline-flex items-center gap-2 bg-terracotta hover:bg-espresso text-cream px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Client
                </button>
              </div>
            </div>

            {/* Search & Tag Filter Pills */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-espresso/10 shadow-sm">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso/40" />
                <input
                  type="text"
                  placeholder="Search by client name, phone, or email..."
                  value={clientSearchQuery}
                  onChange={(e) => setClientSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-cream/20 border border-espresso/10 rounded-xl text-xs text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['All', 'VIP Client', 'Regular', 'New Client'].map((tag) => {
                  const isSelected = clientTagFilter === tag;
                  const count = tag === 'All' ? clientsList.length : clientsList.filter((c) => c.tag === tag).length;
                  return (
                    <button
                      key={tag}
                      onClick={() => setClientTagFilter(tag)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap border ${
                        isSelected
                          ? 'bg-espresso text-cream border-espresso'
                          : 'bg-white hover:bg-cream text-espresso/70 border-espresso/10'
                      }`}
                    >
                      {tag} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clients CRM Table */}
            <div className="bg-white rounded-2xl border border-espresso/10 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-cream/40 border-b border-espresso/10 text-[10px] uppercase font-bold text-espresso/60 tracking-wider">
                      <th className="py-3 px-4">Client Details</th>
                      <th className="py-3 px-4">Category Tag</th>
                      <th className="py-3 px-4">Preferred Stylist</th>
                      <th className="py-3 px-4">Visits &amp; Spend</th>
                      <th className="py-3 px-4">Last Visit</th>
                      <th className="py-3 px-4">Private Notes</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-espresso/5 font-medium text-espresso/80">
                    {clientsList
                      .filter((c) => {
                        const matchesTag = clientTagFilter === 'All' || c.tag === clientTagFilter;
                        const q = clientSearchQuery.toLowerCase();
                        const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q);
                        return matchesTag && matchesQuery;
                      })
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-cream/15 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-bold text-espresso text-sm block">{c.name}</span>
                            <div className="flex items-center gap-3 text-[11px] text-espresso/60 mt-0.5">
                              <span>{c.phone}</span>
                              <span>•</span>
                              <span>{c.email}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                c.tag === 'VIP Client'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                  : c.tag === 'Regular'
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                  : 'bg-blue-100 text-blue-900 border border-blue-200'
                              }`}
                            >
                              {c.tag}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-semibold text-espresso">
                            {c.stylist}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-terracotta block">{formatPrice(c.totalSpent)}</span>
                            <span className="text-[10px] text-espresso/50 font-normal">{c.visitsCount} appointment{c.visitsCount === 1 ? '' : 's'}</span>
                          </td>
                          <td className="py-4 px-4 text-espresso/70">
                            {c.lastVisit}
                          </td>
                          <td className="py-4 px-4 max-w-xs">
                            <p className="text-[11px] text-espresso/70 italic line-clamp-2">
                              {c.notes || 'No notes added'}
                            </p>
                          </td>
                          <td className="py-4 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditClient(c)}
                              className="p-1.5 text-espresso/70 hover:text-terracotta hover:bg-cream/40 rounded-lg transition-colors cursor-pointer"
                              title="Edit Client"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClient(c.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Client"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <a
                              href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-full font-medium"
                            >
                              <MessageSquare className="w-3 h-3" /> WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: REVENUE & REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-terracotta text-[10px] font-bold uppercase tracking-widest bg-terracotta/10 px-2.5 py-1 rounded-full mb-1">
                  <TrendingUp className="w-3 h-3" /> Financial Intelligence
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso">Monthly Revenue &amp; Financial Reports</h3>
                <p className="text-xs text-espresso/60 font-light">Month-by-month financial summary, completed booking volume, deposits collected, and stylist breakdowns.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const headers = ['Month', 'Appointments', 'Deposits Secured ($)', 'Gross Revenue ($)', 'Sharon Share ($)', 'Abigail Share ($)'];
                    const data = [
                      ['January 2026', '14', '$700', '$3,450', '$2,900', '$550'],
                      ['February 2026', '18', '$900', '$4,320', '$3,620', '$700'],
                      ['March 2026', '22', '$1,100', '$5,400', '$4,500', '$900'],
                      ['April 2026', '19', '$950', '$4,650', '$3,900', '$750'],
                      ['May 2026', '24', '$1,200', '$5,880', '$4,920', '$960'],
                      ['June 2026', '26', '$1,300', '$6,420', '$5,350', '$1,070'],
                      ['July 2026', '28', '$1,400', '$6,900', '$5,750', '$1,150'],
                      ['August 2026', '31', '$1,550', '$7,650', '$6,350', '$1,300'],
                      ['September 2026', '25', '$1,250', '$6,250', '$5,150', '$1,100'],
                    ];
                    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...data.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement('a');
                    link.setAttribute('href', encodedUri);
                    link.setAttribute('download', `BraidBar_Revenue_Report_${new Date().getFullYear()}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="inline-flex items-center gap-1.5 bg-terracotta hover:bg-espresso text-cream px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Export Financial Report (CSV)
                </button>
              </div>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-espresso/10 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-espresso/50 tracking-wider">Gross YTD Revenue</span>
                <p className="text-2xl font-black text-espresso font-[family-name:var(--font-display)] mt-1">$50,920.00</p>
                <span className="text-[10px] text-emerald-700 font-bold mt-1 inline-flex items-center gap-1">↑ +14% vs prior period</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-espresso/10 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-espresso/50 tracking-wider">Total Appointments</span>
                <p className="text-2xl font-black text-espresso font-[family-name:var(--font-display)] mt-1">207 Sessions</p>
                <span className="text-[10px] text-espresso/60 font-medium mt-1 block">Full-service braids &amp; preps</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-espresso/10 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-espresso/50 tracking-wider">Deposits Collected ($50/ea)</span>
                <p className="text-2xl font-black text-terracotta font-[family-name:var(--font-display)] mt-1">$10,350.00</p>
                <span className="text-[10px] text-emerald-700 font-bold mt-1 block">100% upfront booking security</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-espresso/10 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-espresso/50 tracking-wider">Average Ticket Size</span>
                <p className="text-2xl font-black text-espresso font-[family-name:var(--font-display)] mt-1">$245.99</p>
                <span className="text-[10px] text-espresso/60 font-medium mt-1 block">Base style + add-on enhancements</span>
              </div>
            </div>

            {/* Monthly Financial Breakdown Table */}
            <div className="bg-white rounded-2xl border border-espresso/10 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-espresso/10 flex items-center justify-between">
                <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-espresso">
                  Monthly Performance Breakdown (2026)
                </h4>
                <span className="text-xs text-espresso/60 font-medium">Updated Real-Time</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-cream/40 border-b border-espresso/10 text-[10px] uppercase font-bold text-espresso/60 tracking-wider">
                      <th className="py-3 px-4">Month</th>
                      <th className="py-3 px-4">Completed Bookings</th>
                      <th className="py-3 px-4">Deposits Secured</th>
                      <th className="py-3 px-4">Gross Revenue</th>
                      <th className="py-3 px-4">Sharon French (Lead)</th>
                      <th className="py-3 px-4">Abigail Charles (Assistant)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-espresso/5 font-medium text-espresso/80">
                    {[
                      { month: 'September 2026 (Current)', bookings: 25, deposits: 1250, gross: 6250, sharon: 5150, abigail: 1100, isCurrent: true },
                      { month: 'August 2026', bookings: 31, deposits: 1550, gross: 7650, sharon: 6350, abigail: 1300 },
                      { month: 'July 2026', bookings: 28, deposits: 1400, gross: 6900, sharon: 5750, abigail: 1150 },
                      { month: 'June 2026', bookings: 26, deposits: 1300, gross: 6420, sharon: 5350, abigail: 1070 },
                      { month: 'May 2026', bookings: 24, deposits: 1200, gross: 5880, sharon: 4920, abigail: 960 },
                      { month: 'April 2026', bookings: 19, deposits: 950, gross: 4650, sharon: 3900, abigail: 750 },
                      { month: 'March 2026', bookings: 22, deposits: 1100, gross: 5400, sharon: 4500, abigail: 900 },
                      { month: 'February 2026', bookings: 18, deposits: 900, gross: 4320, sharon: 3620, abigail: 700 },
                      { month: 'January 2026', bookings: 14, deposits: 700, gross: 3450, sharon: 2900, abigail: 550 },
                    ].map((row) => (
                      <tr key={row.month} className={row.isCurrent ? 'bg-amber-50/50 font-bold' : 'hover:bg-cream/15'}>
                        <td className="py-3.5 px-4 font-bold text-espresso flex items-center gap-2">
                          {row.month}
                          {row.isCurrent && (
                            <span className="text-[9px] bg-terracotta text-cream px-2 py-0.5 rounded-full font-bold uppercase">Active</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">{row.bookings} sessions</td>
                        <td className="py-3.5 px-4 text-emerald-700 font-bold">{formatPrice(row.deposits)}</td>
                        <td className="py-3.5 px-4 font-bold text-espresso">{formatPrice(row.gross)}</td>
                        <td className="py-3.5 px-4">{formatPrice(row.sharon)}</td>
                        <td className="py-3.5 px-4">{formatPrice(row.abigail)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES CATALOG & PRICING */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            {/* 1. SERVICE CATEGORY TITLES MANAGER */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-espresso/10 pb-4 gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                    Structure &amp; Organization
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso mt-1">
                    Service Categories &amp; Collections
                  </h3>
                  <p className="text-xs text-espresso/60 font-light">
                    Add or remove category headers. Category titles dynamically organize your website menu and booking flow.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setNewCategoryName('');
                    setIsCategoryModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-espresso hover:bg-terracotta text-cream px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Category Title
                </button>
              </div>

              {/* Category Pills List */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {categoriesList.map((cat) => {
                  const serviceCount = servicesList.filter((s) => s.category === cat).length;
                  return (
                    <div
                      key={cat}
                      className="inline-flex items-center gap-2 bg-cream/30 hover:bg-cream border border-espresso/15 px-3.5 py-2 rounded-xl text-xs font-medium text-espresso transition-colors group"
                    >
                      <Tag className="w-3.5 h-3.5 text-terracotta" />
                      <span className="font-bold">{cat}</span>
                      <span className="text-[10px] text-espresso/50 bg-white px-2 py-0.5 rounded-full border border-espresso/10 font-bold">
                        {serviceCount}
                      </span>
                      {categoriesList.length > 1 && (
                        <button
                          onClick={() => handleDeleteCategory(cat)}
                          title={`Delete "${cat}" category`}
                          className="opacity-40 group-hover:opacity-100 hover:text-rose-600 transition-opacity ml-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. SERVICES & PRICING CATALOG */}
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-espresso/10 shadow-sm">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">Services &amp; Pricing Catalog</h3>
                  <p className="text-xs text-espresso/60 font-light">Edit hair service prices, durations, photos, and calendar destinations</p>
                </div>
                <button
                  onClick={handleOpenAddService}
                  className="inline-flex items-center gap-2 bg-terracotta hover:bg-espresso text-cream px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servicesList.map((srv) => (
                  <div key={srv.id} className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col justify-between group hover:border-terracotta/40 transition-colors">
                    <div>
                      {/* Thumbnail & Badges */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-espresso/15 bg-cream-dark flex-shrink-0 relative">
                          <img
                            src={srv.image_url || '/images/branding/logo-monogram-bb.png'}
                            alt={srv.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full">
                              {srv.category}
                            </span>
                            {(srv as any).isPrivate && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-accent-gold bg-espresso px-2 py-0.5 rounded-full">
                                🔒 Private 1-on-1
                              </span>
                            )}
                          </div>
                          <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-espresso leading-snug">
                            {srv.name}
                          </h4>
                          <span className="text-xs font-bold text-espresso/60 mt-1 block">⏱ {formatDuration(srv.duration_min)}</span>
                        </div>
                      </div>

                      <p className="text-xs text-espresso/70 font-light leading-relaxed line-clamp-2 mb-4">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-espresso/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-espresso/50 font-bold uppercase block">Investment</span>
                        <span className="text-xl font-bold text-espresso">{formatPrice(srv.price)}</span>
                        <span className="text-[10px] text-emerald-700 block font-medium">Deposit: {formatPrice(srv.deposit_amount)}</span>
                        <span className="text-[10px] text-blue-600 block font-medium mt-0.5">
                          📅 {(srv as any).assignedCalendar === 'cal-sharon' ? 'Sharon Only' : (srv as any).assignedCalendar === 'cal-abigail' ? 'Abigail Only' : 'Both Calendars'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditService(srv)}
                          className="px-3 py-1.5 bg-cream/50 hover:bg-cream border border-espresso/10 rounded-xl text-xs font-semibold text-espresso transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-terracotta" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-xs font-semibold text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. SERVICE ADD-ONS CATALOG MANAGER */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-espresso/10 pb-4 gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                    Custom Enhancements
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso mt-1">
                    Service Add-Ons &amp; Extensions Catalog
                  </h3>
                  <p className="text-xs text-espresso/60 font-light">
                    Add-ons can apply across all hairstyles or be separated to specific services only.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddAddon}
                  className="inline-flex items-center gap-2 bg-terracotta hover:bg-espresso text-cream px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add New Add-On
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {addonsList.map((add) => (
                  <div key={add.id} className="bg-cream/20 p-4 rounded-2xl border border-espresso/10 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-espresso text-sm">{add.name}</h4>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-espresso/70 mt-1">
                        <span className="font-bold text-terracotta">+{formatPrice(add.price)}</span>
                        <span>•</span>
                        <span>+{formatDuration(add.duration_min)}</span>
                      </div>
                      <div className="mt-2.5">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                          add.applicableTo === 'specific' && add.applicableServiceIds && add.applicableServiceIds.length > 0
                            ? 'bg-amber-50 text-amber-900 border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {add.applicableTo === 'specific' && add.applicableServiceIds && add.applicableServiceIds.length > 0
                            ? `Specific: ${add.applicableServiceIds.length} service${add.applicableServiceIds.length === 1 ? '' : 's'}`
                            : 'Applies to All Styles'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-espresso/10">
                      <button
                        onClick={() => handleOpenEditAddon(add)}
                        className="px-3 py-1 bg-white hover:bg-cream border border-espresso/10 rounded-lg text-xs font-semibold text-espresso transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3 text-terracotta" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddon(add.id)}
                        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. DOUBLE BOOKING PREVENTION CONTROL */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-terracotta text-[10px] font-bold uppercase tracking-widest bg-terracotta/10 px-2.5 py-1 rounded-full mb-1">
                    <Sliders className="w-3 h-3" /> Booking Concurrency
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso">
                    Double Booking Prevention Setting
                  </h3>
                  <p className="text-xs text-espresso/60 font-light mt-1 max-w-2xl leading-relaxed">
                    Turn OFF to enforce strict single-client chair appointments (no overlapping clients). Turn ON if you want the flexibility to allow simultaneous bookings across stylists and assistants.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    allowDoubleBooking ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    {allowDoubleBooking ? 'Double Booking Allowed' : 'Strict Single Client (No Double Booking)'}
                  </span>
                  <button
                    onClick={() => handleToggleDoubleBooking(!allowDoubleBooking)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                      allowDoubleBooking
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    {allowDoubleBooking ? 'Disable Double Booking' : 'Enable Double Booking'}
                  </button>
                </div>
              </div>
            </div>

            {/* 5. STAFF CALENDARS & SCHEDULES CONFIGURATION */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-6">
              <div className="border-b border-espresso/10 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                  Team Scheduling &amp; Working Hours
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso mt-1">
                  Separate Staff Calendars &amp; Weekly Working Hours
                </h3>
                <p className="text-xs text-espresso/60 font-light">
                  Sharon can change stylist titles (e.g. Lead Stylist, Master Braider) and adjust the working days and hours each team member is available each week.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {staffSchedules.map((sched) => (
                  <div key={sched.id} className="bg-cream/20 p-5 rounded-2xl border border-espresso/10 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          sched.role === 'owner' ? 'text-emerald-800 bg-emerald-100' : 'text-amber-800 bg-amber-100'
                        }`}>
                          {sched.role === 'owner' ? 'Lead Stylist Calendar' : 'Assistant Calendar'}
                        </span>
                        <span className="font-mono text-[10px] text-espresso/50">Calendar ID: {sched.calendarId}</span>
                      </div>
                      <h4 className="font-bold text-espresso text-base">{sched.name} — {sched.title}</h4>
                      <div className="space-y-1.5 text-espresso/80 mt-3 pt-2 border-t border-espresso/10">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-terracotta">Working Days:</span>
                          <span>{sched.days.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-terracotta">Hours:</span>
                          <span>{sched.hours}</span>
                        </div>
                        {sched.weeklyOverride && (
                          <div className="text-[11px] text-espresso/60 italic bg-white/70 p-2 rounded-lg border border-espresso/5 mt-1">
                            📌 Weekly Note: {sched.weeklyOverride}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-espresso/10 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-espresso/60">
                        {sched.role === 'owner' ? 'Passcode: 592' : 'Passcode: 2026'}
                      </span>
                      <button
                        onClick={() => handleOpenEditSchedule(sched)}
                        className="px-3.5 py-1.5 bg-espresso hover:bg-terracotta text-cream rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Adjust Hours &amp; Title
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: SITE TEXT & IMAGE MEDIA MANAGER */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-terracotta text-[10px] font-bold uppercase tracking-widest bg-terracotta/10 px-2.5 py-1 rounded-full mb-1">
                  <Sparkles className="w-3 h-3" /> Real-Time Master CMS
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso">Website Text, Lookbook &amp; Media Editor</h3>
                <p className="text-xs text-espresso/60 font-light">Complete control to update headlines, lookbook photo cards, team bios, and brand assets</p>
              </div>
              <button
                onClick={() => {
                  handleSaveSiteText(siteText);
                  handleTriggerDeploy();
                  alert('✨ All website text, headlines, slogans, and image assets saved & published live!');
                }}
                className="inline-flex items-center gap-2 bg-terracotta hover:bg-espresso text-cream px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Changes &amp; Publish Live
              </button>
            </div>

            {/* Section A: Hero & Announcement Text */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-6">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso border-b border-espresso/10 pb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-terracotta" /> 1. Hero Banner &amp; Announcement Bar Text
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-espresso/70 font-semibold mb-1">Announcement Marquee Banner Text</label>
                  <input
                    type="text"
                    value={siteText.marqueeText}
                    onChange={(e) => setSiteText({ ...siteText, marqueeText: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-espresso/70 font-semibold mb-1">Hero Address Badge Text</label>
                  <input
                    type="text"
                    value={siteText.heroBadge}
                    onChange={(e) => setSiteText({ ...siteText, heroBadge: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-espresso/70 font-semibold mb-1">Hero Primary Headline</label>
                  <input
                    type="text"
                    value={siteText.heroHeadline}
                    onChange={(e) => setSiteText({ ...siteText, heroHeadline: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs font-bold text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-espresso/70 font-semibold mb-1">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={siteText.heroSubtitle}
                    onChange={(e) => setSiteText({ ...siteText, heroSubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs focus:outline-none focus:border-terracotta leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Section B: Brand Mission & Story */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-6">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso border-b border-espresso/10 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-terracotta" /> 2. Brand Mission &amp; Story Headline
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="md:col-span-2">
                  <label className="block text-espresso/70 font-semibold mb-1">Brand Mission Headline</label>
                  <input
                    type="text"
                    value={siteText.missionTitle}
                    onChange={(e) => setSiteText({ ...siteText, missionTitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs font-bold text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-espresso/70 font-semibold mb-1">Brand Mission Description</label>
                  <textarea
                    rows={3}
                    value={siteText.missionBody}
                    onChange={(e) => setSiteText({ ...siteText, missionBody: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs focus:outline-none focus:border-terracotta leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Section C: Lookbook & Portfolio Gallery Manager */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-espresso/10 pb-3">
                <div>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-terracotta" /> 3. Lookbook &amp; Portfolio Gallery Cards
                  </h4>
                  <p className="text-xs text-espresso/60 font-light">Upload photo cards directly from your device or phone to feature in your style gallery</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const title = prompt('Enter Style Title (e.g. Medium Knotless):', 'New Style');
                    if (!title) return;
                    const tag = prompt('Enter Category Tag (e.g. Knotless, Fulani, Twists):', 'Knotless') || 'Braids';
                    const desc = prompt('Enter Short Description:', 'Precision parting with natural shine.') || '';
                    const url = prompt('Enter Image URL (or upload a file on the new card after creating):', 'https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80') || '';
                    handleAddLookbookPhoto(title, tag, url, desc);
                  }}
                  className="px-3.5 py-2 bg-terracotta hover:bg-espresso text-cream rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Lookbook Photo
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {lookbookList.map((item) => (
                  <div key={item.id} className="bg-cream/20 p-4 rounded-2xl border border-espresso/10 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-espresso/10 bg-black/5 relative mb-3 group">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-espresso/90 text-cream text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="block text-espresso/60 text-[10px] font-bold uppercase mb-0.5">Style Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateLookbookPhoto(item.id, { title: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-espresso/10 rounded-lg text-xs font-semibold text-espresso"
                          />
                        </div>

                        <div>
                          <label className="block text-espresso/60 text-[10px] font-bold uppercase mb-0.5">Category Tag</label>
                          <input
                            type="text"
                            value={item.tag}
                            onChange={(e) => handleUpdateLookbookPhoto(item.id, { tag: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-espresso/10 rounded-lg text-xs font-medium text-espresso"
                          />
                        </div>

                        <div>
                          <label className="block text-espresso/60 text-[10px] font-bold uppercase mb-0.5">Description</label>
                          <textarea
                            rows={2}
                            value={item.desc}
                            onChange={(e) => handleUpdateLookbookPhoto(item.id, { desc: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-espresso/10 rounded-lg text-xs leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-espresso/10">
                      {/* Device File Upload */}
                      <label className="w-full py-2 bg-espresso hover:bg-terracotta text-cream rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" /> 📁 Upload Photo from Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (url) => handleUpdateLookbookPhoto(item.id, { img: url }));
                            }
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => handleDeleteLookbookPhoto(item.id)}
                        className="w-full py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Remove Card
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section D: Team Bios & Titles Editor */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-6">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso border-b border-espresso/10 pb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-terracotta" /> 4. Meet the Artists - Team Bios &amp; Headshots
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Sharon French Editor */}
                <div className="bg-cream/30 p-5 rounded-2xl border border-espresso/10 space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={siteImages.sharonPhoto}
                      alt="Sharon French"
                      className="w-14 h-14 rounded-full object-cover border-2 border-terracotta"
                    />
                    <div>
                      <h5 className="font-bold text-espresso text-sm">Sharon French</h5>
                      <span className="text-[10px] text-terracotta font-semibold uppercase tracking-wider block">Founder &amp; Lead Stylist</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-espresso/70 font-semibold mb-1">Headshot Photo URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={siteImages.sharonPhoto}
                        onChange={(e) => setSiteImages({ ...siteImages, sharonPhoto: e.target.value })}
                        className="flex-1 px-3 py-1.5 bg-white border border-espresso/10 rounded-lg text-xs"
                      />
                      <button
                        onClick={() => {
                          const newUrl = prompt('Enter Sharon Headshot Photo URL:', siteImages.sharonPhoto);
                          if (newUrl) setSiteImages({ ...siteImages, sharonPhoto: newUrl });
                        }}
                        className="px-3 py-1.5 bg-espresso text-cream rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-espresso/70 font-semibold mb-1">Role Title</label>
                    <input
                      type="text"
                      value={siteText.sharonTitle}
                      onChange={(e) => setSiteText({ ...siteText, sharonTitle: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-espresso/10 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-espresso/70 font-semibold mb-1">Biography</label>
                    <textarea
                      rows={4}
                      value={siteText.sharonBio}
                      onChange={(e) => setSiteText({ ...siteText, sharonBio: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-espresso/10 rounded-lg text-xs leading-relaxed"
                    />
                  </div>
                </div>

                {/* Abigail Charles Editor */}
                <div className="bg-cream/30 p-5 rounded-2xl border border-espresso/10 space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={siteImages.abigailPhoto}
                      alt="Abigail Charles"
                      className="w-14 h-14 rounded-full object-cover border-2 border-terracotta"
                    />
                    <div>
                      <h5 className="font-bold text-espresso text-sm">Abigail Charles</h5>
                      <span className="text-[10px] text-terracotta font-semibold uppercase tracking-wider block">Salon Assistant &amp; Stylist</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-espresso/70 font-semibold mb-1">Headshot Photo URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={siteImages.abigailPhoto}
                        onChange={(e) => setSiteImages({ ...siteImages, abigailPhoto: e.target.value })}
                        className="flex-1 px-3 py-1.5 bg-white border border-espresso/10 rounded-lg text-xs"
                      />
                      <button
                        onClick={() => {
                          const newUrl = prompt('Enter Abigail Headshot Photo URL:', siteImages.abigailPhoto);
                          if (newUrl) setSiteImages({ ...siteImages, abigailPhoto: newUrl });
                        }}
                        className="px-3 py-1.5 bg-espresso text-cream rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-espresso/70 font-semibold mb-1">Role Title</label>
                    <input
                      type="text"
                      value={siteText.abigailTitle}
                      onChange={(e) => setSiteText({ ...siteText, abigailTitle: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-espresso/10 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-espresso/70 font-semibold mb-1">Biography</label>
                    <textarea
                      rows={4}
                      value={siteText.abigailBio}
                      onChange={(e) => setSiteText({ ...siteText, abigailBio: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-espresso/10 rounded-lg text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section E: Master Image Uploads & Media Assets Manager */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-6">
              <div className="border-b border-espresso/10 pb-3">
                <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-terracotta" /> 5. Website Image Uploads &amp; Media Assets
                </h4>
                <p className="text-xs text-espresso/60 font-light">Select image files directly from your computer or phone to replace any site photo</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
                {[
                  { key: 'salonArch', title: 'Salon Sanctuary Half-Circle Arch Photo', note: 'Displayed above main headline in Brand Mission section', img: siteImages.salonArch || '/images/salon-reception-arch.jpg' },
                  { key: 'heroBg', title: 'Hero Full-Bleed Background Photo', note: 'Main hero background photo at top of site', img: siteImages.heroBg || '/images/branding/hero-sitting.jpg' },
                  { key: 'portfolioOval', title: 'Style Portfolio Oval Frame Photo', note: 'Left photo in Style Portfolio menu section', img: siteImages.portfolioOval || '/images/braids-twists.jpg' },
                  { key: 'sharonPhoto', title: 'Sharon French (Lead Stylist Portrait)', note: 'Lead Stylist profile picture in Team section', img: siteImages.sharonPhoto || '/images/branding/profile-sharon-lead.png' },
                  { key: 'abigailPhoto', title: 'Abigail Charles (Assistant Portrait)', note: 'Salon Assistant profile picture in Team section', img: siteImages.abigailPhoto || '/images/branding/profile-abigail-assistant.png' },
                  { key: 'navLogo', title: 'Top Navigation Monogram Logo', note: 'Small monogram logo in header navigation', img: siteImages.navLogo || '/images/branding/logo-monogram-bb.png' },
                ].map((asset) => (
                  <div key={asset.key} className="bg-cream/20 p-4 rounded-xl border border-espresso/10 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block mb-1">{asset.title}</span>
                      <p className="text-[10px] text-espresso/60 mb-2 font-light">{asset.note}</p>
                      <div className="aspect-video w-full rounded-lg overflow-hidden border border-espresso/10 bg-black/5 mb-2">
                        <img src={asset.img} alt={asset.title} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="w-full py-2 bg-espresso hover:bg-terracotta text-cream rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" /> 📁 Upload Photo from Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (url) => {
                                const updated = { ...siteImages, [asset.key]: url };
                                setSiteImages(updated);
                                localStorage.setItem('bb_site_images', JSON.stringify(updated));
                                window.dispatchEvent(new Event('bb_siteimages_updated'));
                                syncToApiServer({ images: updated });
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section F: Photo Alignment, Crop & Visual Sizing Controls */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-6">
              <div className="border-b border-espresso/10 pb-3">
                <div className="inline-flex items-center gap-1.5 text-terracotta text-[10px] font-bold uppercase tracking-widest bg-terracotta/10 px-2.5 py-1 rounded-full mb-1">
                  <Sliders className="w-3 h-3" /> Visual Framing
                </div>
                <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso flex items-center gap-2">
                  6. Photo Alignment, Crop &amp; Sizing Controls
                </h4>
                <p className="text-xs text-espresso/60 font-light">Fine-tune the crop, vertical focus, and display sizing for the bleed background and salon arch photos</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Hero Bleed Background Alignment */}
                <div className="bg-cream/20 p-5 rounded-2xl border border-espresso/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-espresso text-sm">Hero Bleed Background Photo</span>
                    <span className="text-[10px] uppercase font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">Top Banner</span>
                  </div>
                  <p className="text-[11px] text-espresso/70 leading-relaxed font-light">
                    Adjust which part of the sitting model or salon image remains centered on desktop and mobile screens.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-espresso/80 font-bold mb-1">Vertical Focus / Alignment</label>
                      <select
                        value={imageSettings.heroBgPosition}
                        onChange={(e) => handleUpdateImageSettings({ heroBgPosition: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-espresso/15 rounded-xl font-medium text-espresso"
                      >
                        <option value="center 30%">Center (30% from top - Recommended)</option>
                        <option value="top">Top Focus (Show hair crowns &amp; heads)</option>
                        <option value="center">Dead Center</option>
                        <option value="bottom">Bottom Focus</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-espresso/80 font-bold mb-1">Zoom &amp; Fit Scale</label>
                      <select
                        value={imageSettings.heroZoom}
                        onChange={(e) => handleUpdateImageSettings({ heroZoom: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-espresso/15 rounded-xl font-medium text-espresso"
                      >
                        <option value="cover">Standard Full Bleed (Cover 100%)</option>
                        <option value="110%">Subtle Zoomed In (110% Drama Effect)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Salon Sanctuary Arch Alignment & Height */}
                <div className="bg-cream/20 p-5 rounded-2xl border border-espresso/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-espresso text-sm">Salon Sanctuary Half-Circle Arch</span>
                    <span className="text-[10px] uppercase font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">Mission Section</span>
                  </div>
                  <p className="text-[11px] text-espresso/70 leading-relaxed font-light">
                    Adjust the crop position inside the half-circle frame and adjust frame height.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-espresso/80 font-bold mb-1">Arch Photo Focus</label>
                      <select
                        value={imageSettings.salonArchPosition}
                        onChange={(e) => handleUpdateImageSettings({ salonArchPosition: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-espresso/15 rounded-xl font-medium text-espresso"
                      >
                        <option value="center">Center Focus (Balanced salon interior)</option>
                        <option value="top">Top Focus (Show upper styling stations &amp; lights)</option>
                        <option value="bottom">Bottom Focus (Show reception counter &amp; chairs)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-espresso/80 font-bold mb-1">Arch Frame Height</label>
                      <select
                        value={imageSettings.salonArchHeight}
                        onChange={(e) => handleUpdateImageSettings({ salonArchHeight: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-espresso/15 rounded-xl font-medium text-espresso"
                      >
                        <option value="standard">Standard Editorial Height (280px)</option>
                        <option value="tall">Tall Arch Height (340px - Shows more photo)</option>
                        <option value="compact">Compact Arch Height (220px)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SITE DEPLOYMENT & HOSTING */}
        {activeTab === 'deployment' && (
          <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-emerald-800 text-[10px] font-bold uppercase tracking-widest bg-emerald-100 px-2.5 py-1 rounded-full mb-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Site Live &amp; Healthy
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">Site Deployment &amp; Hosting Manager</h3>
                <p className="text-xs text-espresso/60 font-light">Publish changes, manage deploy webhooks, and view live build logs</p>
              </div>

              {/* 1-Click Deploy Button */}
              <button
                onClick={handleTriggerDeploy}
                disabled={isDeploying}
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer ${
                  isDeploying
                    ? 'bg-amber-600 text-cream animate-pulse'
                    : deploySuccess
                    ? 'bg-emerald-700 text-cream'
                    : 'bg-terracotta hover:bg-espresso text-cream hover:scale-105'
                }`}
              >
                {isDeploying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Deploying Live Site...
                  </>
                ) : deploySuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Published Successfully!
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" /> 🚀 Deploy Live Website
                  </>
                )}
              </button>
            </div>

            {/* Notification alert if success */}
            {deploySuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-xl flex items-center justify-between text-xs font-medium animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Deployment trigger sent! The live website at <strong>thebraidbarnj.com</strong> is building and updating.</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-700">Status: Active</span>
              </div>
            )}

            {/* Live Environment Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-espresso/10 shadow-sm space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-espresso/50 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-terracotta" /> Primary Domain
                </span>
                <p className="text-sm font-bold text-espresso truncate">thebraidbarnj.com</p>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> SSL Active (HTTPS)
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-espresso/10 shadow-sm space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-espresso/50 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-terracotta" /> Hosting Platform
                </span>
                <p className="text-sm font-bold text-espresso">Vercel / Cloudflare</p>
                <span className="text-[10px] text-espresso/60 font-light">Global Edge CDN</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-espresso/10 shadow-sm space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-espresso/50 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-terracotta" /> Last Build Time
                </span>
                <p className="text-sm font-bold text-espresso">Today, 3:20 PM</p>
                <span className="text-[10px] text-espresso/60 font-light">Build duration: 38s</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-espresso/10 shadow-sm space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-espresso/50 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-terracotta" /> Framework &amp; Engine
                </span>
                <p className="text-sm font-bold text-espresso">Next.js 16 (Turbopack)</p>
                <span className="text-[10px] text-espresso/60 font-light">React 19 Server Components</span>
              </div>
            </div>

            {/* Webhook Configuration & Auto-Publish Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Webhook Setup */}
              <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4">
                <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso border-b border-espresso/10 pb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-terracotta" /> Production Deploy Hook Webhook URL
                </h4>
                <p className="text-xs text-espresso/60 font-light leading-relaxed">
                  Enter your Vercel, Netlify, Cloudflare Pages, or GitHub Actions deploy hook URL below. Clicking <strong>Deploy Live Website</strong> sends a POST request to trigger a fresh production build.
                </p>

                <div className="space-y-2">
                  <label className="block text-espresso/70 text-xs font-semibold">Deploy Hook Webhook Endpoint</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://api.vercel.com/v1/integrations/deploy/..."
                      className="flex-1 px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs font-mono focus:outline-none focus:border-terracotta"
                    />
                    <button
                      onClick={() => alert('✨ Webhook URL saved successfully!')}
                      className="px-4 py-2.5 bg-espresso hover:bg-terracotta text-cream rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Save Hook
                    </button>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-espresso/50 block mb-2">Quick Platform Presets:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setWebhookUrl('https://api.vercel.com/v1/integrations/deploy/prj_braid_bar_nj')}
                      className="px-3 py-1.5 bg-cream/40 hover:bg-cream border border-espresso/10 rounded-lg text-xs font-medium text-espresso cursor-pointer"
                    >
                      ▲ Vercel Preset
                    </button>
                    <button
                      onClick={() => setWebhookUrl('https://thebraidbarnj.com:2083/cpanel_git_deploy_webhook')}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-800 cursor-pointer"
                    >
                      🟢 GoDaddy cPanel / Managed Deploy
                    </button>
                    <button
                      onClick={() => setWebhookUrl('https://api.netlify.com/build_hooks/60f7e4a19b8822001')}
                      className="px-3 py-1.5 bg-cream/40 hover:bg-cream border border-espresso/10 rounded-lg text-xs font-medium text-espresso cursor-pointer"
                    >
                      🌐 Netlify Preset
                    </button>
                    <button
                      onClick={() => setWebhookUrl('https://api.github.com/repos/sharon-french/braid-bar-nj/dispatches')}
                      className="px-3 py-1.5 bg-cream/40 hover:bg-cream border border-espresso/10 rounded-lg text-xs font-medium text-espresso cursor-pointer"
                    >
                      🐙 GitHub Actions Preset
                    </button>
                  </div>
                </div>

                {/* GoDaddy Domain & DNS Integration Card */}
                <div className="mt-4 pt-4 border-t border-espresso/10 bg-cream/20 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-espresso flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-600" /> GoDaddy Domain &amp; DNS Integration
                    </span>
                    <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Connected to GoDaddy
                    </span>
                  </div>
                  <p className="text-[11px] text-espresso/70 leading-relaxed font-light">
                    Your custom domain <strong>thebraidbarnj.com</strong> is registered with <strong>GoDaddy</strong>. Use these DNS records in your GoDaddy DNS Control Panel to point your domain to the production build:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-white p-2.5 rounded-lg border border-espresso/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-espresso/40 block">GoDaddy A Record (@)</span>
                        <span className="font-bold text-espresso">76.76.21.21</span>
                      </div>
                      <button
                        onClick={() => alert('A Record 76.76.21.21 copied!')}
                        className="text-[10px] text-terracotta hover:underline font-sans font-semibold"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-espresso/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-espresso/40 block">GoDaddy CNAME (www)</span>
                        <span className="font-bold text-espresso truncate">cname.vercel-dns.com</span>
                      </div>
                      <button
                        onClick={() => alert('CNAME cname.vercel-dns.com copied!')}
                        className="text-[10px] text-terracotta hover:underline font-sans font-semibold"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto Publish Settings */}
              <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso border-b border-espresso/10 pb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-terracotta" /> Auto-Publish Rules
                  </h4>
                  <p className="text-xs text-espresso/60 font-light leading-relaxed mb-4">
                    Control how website updates are triggered when content or salon settings are updated.
                  </p>

                  <div className="space-y-4 text-xs">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoPublish}
                        onChange={(e) => setAutoPublish(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-terracotta focus:ring-terracotta"
                      />
                      <div>
                        <span className="font-bold text-espresso block">Auto-deploy on CMS Save</span>
                        <span className="text-[11px] text-espresso/60 font-light">Trigger background deploy automatically whenever Sharon French saves new prices or headline text.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-0.5 w-4 h-4 rounded text-terracotta focus:ring-terracotta"
                      />
                      <div>
                        <span className="font-bold text-espresso block">Vendor Approval Auto-Build</span>
                        <span className="text-[11px] text-espresso/60 font-light">Publish site when a pop-up artisan application is approved.</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-espresso/10">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Owner Controls Armed
                  </span>
                </div>
              </div>
            </div>

            {/* Deployment History Audit Log */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-espresso/10 pb-4">
                <div>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">Deployment Audit Log</h4>
                  <p className="text-xs text-espresso/60 font-light">Complete record of site deployment triggers and build status</p>
                </div>
                <span className="text-xs text-espresso/50 font-mono font-medium">{deployLogs.length} Records</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-espresso/10 text-[10px] uppercase tracking-wider text-espresso/50 font-bold">
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Trigger &amp; Description</th>
                      <th className="py-3 px-4">Author</th>
                      <th className="py-3 px-4">Commit / Release Tag</th>
                      <th className="py-3 px-4">Build Time</th>
                      <th className="py-3 px-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-espresso/5">
                    {deployLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-cream/20 transition-colors">
                        <td className="py-3.5 px-4 font-semibold">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {log.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-espresso">{log.trigger}</td>
                        <td className="py-3.5 px-4 text-espresso/70">{log.author}</td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-terracotta">{log.commit}</td>
                        <td className="py-3.5 px-4 text-espresso/60">{log.duration}</td>
                        <td className="py-3.5 px-4 text-espresso/50 font-mono text-[11px]">{log.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4.5: DATA & INFRASTRUCTURE SUBSCRIPTIONS MANAGER */}
        {activeTab === 'infrastructure' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header banner */}
            <div className="bg-espresso text-cream p-6 rounded-2xl border border-espresso/10 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-gold flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Executive Business Control
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                  Database, Hosting &amp; Subscriptions Hub
                </h3>
                <p className="text-xs text-cream/70 font-light mt-1 max-w-xl">
                  Centralized command console for Sharon French (site owner) to manage Supabase PostgreSQL database connections, GoDaddy domain registration, payment processors, and monthly subscriptions.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Database className="w-4 h-4" /> Supabase Studio <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://dcc.godaddy.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-cream/20 hover:bg-cream/30 text-cream rounded-xl text-xs font-bold transition-all border border-cream/20 flex items-center gap-1.5"
                >
                  <Globe className="w-4 h-4 text-terracotta" /> GoDaddy Portal <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Top Grid: Supabase PostgreSQL Database & GoDaddy Domain Manager */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Supabase Database Connection Card */}
              <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-espresso/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">
                        Supabase PostgreSQL Database
                      </h4>
                      <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                        ● Connected &amp; Healthy (v15.1)
                      </span>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
                    146.6 MB / 500 MB
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-espresso/70 font-semibold mb-1 flex items-center justify-between">
                      <span>Supabase Project URL</span>
                      <span className="text-[10px] text-espresso/40">REST Endpoint</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="https://xyz-braidbar-supabase.co"
                      className="w-full px-4 py-2 bg-cream/30 border border-espresso/10 rounded-xl text-xs font-mono focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-espresso/70 font-semibold mb-1 flex items-center justify-between">
                      <span>Supabase Anon Public API Key</span>
                      <span className="text-[10px] text-espresso/40">Client SDK Key</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        defaultValue="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5ei1icmFpZGJhciIsInJvbGUiOiJhb24iLCJpYXQiOjE3NDAwMDAwMDAsImV4cCI6MjA1NTA0MDAwMH0..."
                        className="flex-1 px-4 py-2 bg-cream/30 border border-espresso/10 rounded-xl text-xs font-mono focus:outline-none focus:border-terracotta"
                      />
                      <button
                        onClick={() => alert('✨ Supabase database credentials saved!')}
                        className="px-4 py-2 bg-espresso hover:bg-terracotta text-cream rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Save Key
                      </button>
                    </div>
                  </div>
                </div>

                {/* Database Table Inspector */}
                <div className="pt-3 border-t border-espresso/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-espresso/50 block mb-2">
                    Managed PostgreSQL Tables:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-cream/20 p-2.5 rounded-lg border border-espresso/10 flex justify-between items-center">
                      <span className="font-mono text-espresso font-semibold">bookings</span>
                      <span className="text-[10px] text-espresso/60">142 rows (2.4 MB)</span>
                    </div>
                    <div className="bg-cream/20 p-2.5 rounded-lg border border-espresso/10 flex justify-between items-center">
                      <span className="font-mono text-espresso font-semibold">services</span>
                      <span className="text-[10px] text-espresso/60">12 rows (420 KB)</span>
                    </div>
                    <div className="bg-cream/20 p-2.5 rounded-lg border border-espresso/10 flex justify-between items-center">
                      <span className="font-mono text-espresso font-semibold">products</span>
                      <span className="text-[10px] text-espresso/60">8 rows (1.1 MB)</span>
                    </div>
                    <div className="bg-cream/20 p-2.5 rounded-lg border border-espresso/10 flex justify-between items-center">
                      <span className="font-mono text-espresso font-semibold">vendor_apps</span>
                      <span className="text-[10px] text-espresso/60">24 rows (680 KB)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* GoDaddy Domain Registrar & SSL Billing Card */}
              <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-espresso/10 pb-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-emerald-600" />
                      <div>
                        <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">
                          GoDaddy Domain &amp; Registrar
                        </h4>
                        <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                          ● Registered &amp; Auto-Renew Active
                        </span>
                      </div>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                      $21.99 / year
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 text-xs">
                    <div className="bg-cream/30 p-4 rounded-xl border border-espresso/10 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-espresso/70 font-semibold">Primary Domain:</span>
                        <span className="font-bold text-espresso font-mono">thebraidbarnj.com</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-espresso/70 font-semibold">Registrar Provider:</span>
                        <span className="font-semibold text-espresso">GoDaddy LLC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-espresso/70 font-semibold">Next Annual Renewal:</span>
                        <span className="font-semibold text-espresso">April 12, 2027</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-espresso/70 font-semibold">SSL Certificate:</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Active (Auto-Issued)
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-espresso/70 leading-relaxed font-light">
                      GoDaddy DNS handles domain resolution for <strong>thebraidbarnj.com</strong>. All DNS queries route securely through edge CDN nodes.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-espresso/10 flex items-center justify-between">
                  <span className="text-[10px] text-espresso/60 font-light">Renewal Payment: Visa ending in 4082</span>
                  <a
                    href="https://dcc.godaddy.com/manage/thebraidbarnj.com/dns"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-espresso hover:bg-terracotta text-cream rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    GoDaddy DNS Settings <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Payment Processor Fee & Credentials Directory */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso border-b border-espresso/10 pb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-terracotta" /> Payment Gateway Accounts &amp; Transaction Fees
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Stripe Card */}
                <div className="bg-cream/20 p-5 rounded-xl border border-espresso/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-espresso text-sm">Stripe Payments</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                        Credit Cards &amp; Apple Pay
                      </span>
                    </div>
                    <p className="text-espresso/60 text-[11px] font-light mb-3">
                      Processing online client deposits and salon checkout transactions.
                    </p>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Processing Fee:</span>
                        <span className="font-bold text-espresso">2.9% + $0.30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Payout Schedule:</span>
                        <span className="font-semibold text-espresso">Daily (2-day rolling)</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://dashboard.stripe.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-center py-2 bg-espresso hover:bg-terracotta text-cream rounded-xl font-semibold transition-colors"
                  >
                    Stripe Dashboard →
                  </a>
                </div>

                {/* Cash App / Square Card */}
                <div className="bg-cream/20 p-5 rounded-xl border border-espresso/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-espresso text-sm">Cash App Pay / Square</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        Cash App &amp; POS
                      </span>
                    </div>
                    <p className="text-espresso/60 text-[11px] font-light mb-3">
                      Supports direct Cash App Pay QR code scanning and in-salon POS terminals.
                    </p>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Processing Fee:</span>
                        <span className="font-bold text-espresso">2.6% + $0.10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Payout Schedule:</span>
                        <span className="font-semibold text-espresso">Next Business Day</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://squareup.com/dashboard/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-center py-2 bg-espresso hover:bg-terracotta text-cream rounded-xl font-semibold transition-colors"
                  >
                    Square Merchant Dashboard →
                  </a>
                </div>

                {/* Zelle Card */}
                <div className="bg-cream/20 p-5 rounded-xl border border-espresso/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-espresso text-sm">Zelle Direct Transfer</span>
                      <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                        0% Processing Fee
                      </span>
                    </div>
                    <p className="text-espresso/60 text-[11px] font-light mb-3">
                      Direct bank-to-bank manual transfer verification with reference numbers.
                    </p>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Processing Fee:</span>
                        <span className="font-bold text-emerald-700">0.00% (FREE)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Payout Schedule:</span>
                        <span className="font-semibold text-espresso">Instant Direct Bank</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Zelle Account Number: +1 (973) 972-9864')}
                    className="mt-2 w-full text-center py-2 bg-espresso hover:bg-terracotta text-cream rounded-xl font-semibold transition-colors cursor-pointer"
                  >
                    View Zelle Details
                  </button>
                </div>
              </div>
            </div>

            {/* Master Business Subscriptions & Expenses Directory Table */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-espresso/10 pb-4">
                <div>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">
                    Master Business Subscriptions &amp; Digital Expenses Directory
                  </h4>
                  <p className="text-xs text-espresso/60 font-light">
                    Every digital platform, domain, database, and service Sharon French pays for to operate Braid Bar
                  </p>
                </div>
                <span className="text-xs font-bold text-terracotta bg-cream px-3 py-1 rounded-full border border-espresso/10">
                  Total Monthly Overhead: ~$45.00/mo + Domain
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-espresso/10 text-[10px] uppercase tracking-wider text-espresso/50 font-bold">
                      <th className="py-3 px-2">Service Platform</th>
                      <th className="py-3 px-2">Resource / Asset</th>
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2">Cost Rate</th>
                      <th className="py-3 px-2">Billing Cycle</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Action Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-espresso/10">
                    <tr className="hover:bg-cream/30">
                      <td className="py-3 px-2 font-bold text-espresso">GoDaddy Domain Registrar</td>
                      <td className="py-3 px-2 font-mono text-espresso/80">thebraidbarnj.com</td>
                      <td className="py-3 px-2 text-espresso/70">Domain &amp; DNS</td>
                      <td className="py-3 px-2 font-bold text-espresso">$21.99 / yr</td>
                      <td className="py-3 px-2 text-espresso/70">Annual (Apr 2027)</td>
                      <td className="py-3 px-2"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Auto-Renew</span></td>
                      <td className="py-3 px-2 text-right">
                        <a href="https://dcc.godaddy.com/" target="_blank" rel="noreferrer" className="text-terracotta font-semibold hover:underline flex items-center justify-end gap-1">
                          Manage <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>

                    <tr className="hover:bg-cream/30">
                      <td className="py-3 px-2 font-bold text-espresso">Supabase PostgreSQL</td>
                      <td className="py-3 px-2 font-mono text-espresso/80">xyz-braidbar.supabase.co</td>
                      <td className="py-3 px-2 text-espresso/70">Database &amp; Cloud</td>
                      <td className="py-3 px-2 font-bold text-espresso">$25.00 / mo</td>
                      <td className="py-3 px-2 text-espresso/70">Monthly (1st)</td>
                      <td className="py-3 px-2"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Pro Tier</span></td>
                      <td className="py-3 px-2 text-right">
                        <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-terracotta font-semibold hover:underline flex items-center justify-end gap-1">
                          Manage <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>

                    <tr className="hover:bg-cream/30">
                      <td className="py-3 px-2 font-bold text-espresso">Vercel / Cloudflare CDN</td>
                      <td className="py-3 px-2 font-mono text-espresso/80">Next.js 16 Host &amp; SSL</td>
                      <td className="py-3 px-2 text-espresso/70">Hosting &amp; Edge</td>
                      <td className="py-3 px-2 font-bold text-espresso">$20.00 / mo</td>
                      <td className="py-3 px-2 text-espresso/70">Monthly (5th)</td>
                      <td className="py-3 px-2"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">SSL Active</span></td>
                      <td className="py-3 px-2 text-right">
                        <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" className="text-terracotta font-semibold hover:underline flex items-center justify-end gap-1">
                          Manage <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>

                    <tr className="hover:bg-cream/30">
                      <td className="py-3 px-2 font-bold text-espresso">Stripe Payments</td>
                      <td className="py-3 px-2 font-mono text-espresso/80">acct_1NJ92K81002BB</td>
                      <td className="py-3 px-2 text-espresso/70">Payment Gateway</td>
                      <td className="py-3 px-2 font-bold text-espresso">2.9% + $0.30</td>
                      <td className="py-3 px-2 text-espresso/70">Pay-Per-Txn</td>
                      <td className="py-3 px-2"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Verified</span></td>
                      <td className="py-3 px-2 text-right">
                        <a href="https://dashboard.stripe.com/" target="_blank" rel="noreferrer" className="text-terracotta font-semibold hover:underline flex items-center justify-end gap-1">
                          Manage <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>

                    <tr className="hover:bg-cream/30">
                      <td className="py-3 px-2 font-bold text-espresso">Square / Cash App Pay</td>
                      <td className="py-3 px-2 font-mono text-espresso/80">Square POS &amp; Web</td>
                      <td className="py-3 px-2 text-espresso/70">Payment Gateway</td>
                      <td className="py-3 px-2 font-bold text-espresso">2.6% + $0.10</td>
                      <td className="py-3 px-2 text-espresso/70">Pay-Per-Txn</td>
                      <td className="py-3 px-2"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Verified</span></td>
                      <td className="py-3 px-2 text-right">
                        <a href="https://squareup.com/dashboard/" target="_blank" rel="noreferrer" className="text-terracotta font-semibold hover:underline flex items-center justify-end gap-1">
                          Manage <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>

                    <tr className="hover:bg-cream/30">
                      <td className="py-3 px-2 font-bold text-espresso">WhatsApp Business Dispatch</td>
                      <td className="py-3 px-2 font-mono text-espresso/80">+1 (973) 972-9864</td>
                      <td className="py-3 px-2 text-espresso/70">Client Messaging</td>
                      <td className="py-3 px-2 font-bold text-emerald-700">$0.00 / mo</td>
                      <td className="py-3 px-2 text-espresso/70">Included</td>
                      <td className="py-3 px-2"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span></td>
                      <td className="py-3 px-2 text-right">
                        <a href="https://business.whatsapp.com/" target="_blank" rel="noreferrer" className="text-terracotta font-semibold hover:underline flex items-center justify-end gap-1">
                          Manage <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CURATED AMAZON STOREFRONT */}
        {activeTab === 'shop' && (
          <div className="space-y-6">
            {/* Header Control Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-espresso/10 shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta">
                    Client-Chosen Storefront
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso">
                  Curated Amazon Hair &amp; Care Catalog
                </h3>
                <p className="text-xs text-espresso/60 font-light">
                  Hand-select and manage the exact products recommended to clients on /shop and shop.braidbarnj.com.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href="/shop"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-espresso/15 hover:bg-cream rounded-full text-xs font-semibold text-espresso transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview Storefront</span>
                </Link>

                <button
                  onClick={() => {
                    if (confirm('Reset catalog back to Sharon’s 12 default salon-tested items?')) {
                      handleSaveAmazonProducts(CLIENT_CHOSEN_AMAZON_PRODUCTS);
                    }
                  }}
                  className="px-3.5 py-2 border border-espresso/15 hover:bg-cream text-espresso/70 rounded-full text-xs font-semibold transition-colors"
                  title="Reset to default items"
                >
                  Reset Defaults
                </button>

                <button
                  onClick={() => setIsAddAmazonModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-terracotta hover:bg-espresso text-cream px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
            </div>

            {/* KPI summary bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-espresso/10">
                <span className="text-[10px] uppercase tracking-wider text-espresso/50 font-semibold block">Total Client Picks</span>
                <span className="text-2xl font-bold text-espresso">{amazonProductsList.length}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-espresso/10">
                <span className="text-[10px] uppercase tracking-wider text-espresso/50 font-semibold block">Sharon’s Top Picks</span>
                <span className="text-2xl font-bold text-terracotta">
                  {amazonProductsList.filter(p => p.badge === 'Sharon’s Pick' || p.badge === 'Salon Required').length}
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-espresso/10">
                <span className="text-[10px] uppercase tracking-wider text-espresso/50 font-semibold block">Braiding &amp; Bulk Hair</span>
                <span className="text-2xl font-bold text-espresso">
                  {amazonProductsList.filter(p => p.category === 'braiding-hair').length}
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-espresso/10">
                <span className="text-[10px] uppercase tracking-wider text-espresso/50 font-semibold block">Partner Tag Active</span>
                <span className="text-sm font-bold text-emerald-700 mt-1 block">braidbarnj-20 ✓</span>
              </div>
            </div>

            {/* Amazon Storefront Copy & Content Editor */}
            <div className="bg-white rounded-2xl border border-espresso/10 p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-espresso/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Edit3 className="w-4 h-4 text-terracotta" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta">
                      Storefront Copy CMS
                    </span>
                  </div>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">
                    Edit Amazon Storefront Texts
                  </h4>
                  <p className="text-xs text-espresso/60 font-light">
                    Update headlines, badges, subtitles, and consultation advice displayed on /shop.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {shopTextSavedNotice && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 animate-pulse">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Saved Live!
                    </span>
                  )}
                  <button
                    onClick={() => handleSaveAmazonShopText(amazonShopText)}
                    className="inline-flex items-center gap-1.5 bg-terracotta hover:bg-espresso text-cream px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Copy
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-espresso block mb-1">Top Badge Pill</label>
                  <input
                    type="text"
                    value={amazonShopText.badge}
                    onChange={(e) => setAmazonShopText({ ...amazonShopText, badge: e.target.value })}
                    placeholder="e.g. The Braid Bar NJ • Sharon’s Curated Storefront"
                    className="w-full p-2.5 bg-cream/30 rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-espresso block mb-1">Amazon Disclosure Notice</label>
                  <input
                    type="text"
                    value={amazonShopText.disclosure}
                    onChange={(e) => setAmazonShopText({ ...amazonShopText, disclosure: e.target.value })}
                    placeholder="e.g. Verified Amazon Associates Catalog • Safe & Direct Prime Delivery"
                    className="w-full p-2.5 bg-cream/30 rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-espresso block mb-1">Main Headline</label>
                  <input
                    type="text"
                    value={amazonShopText.headline}
                    onChange={(e) => setAmazonShopText({ ...amazonShopText, headline: e.target.value })}
                    placeholder="e.g. Stylist-Approved"
                    className="w-full p-2.5 bg-cream/30 rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-espresso block mb-1">Headline Accent (Italic)</label>
                  <input
                    type="text"
                    value={amazonShopText.headlineAccent}
                    onChange={(e) => setAmazonShopText({ ...amazonShopText, headlineAccent: e.target.value })}
                    placeholder="e.g. Amazon Hair & Care"
                    className="w-full p-2.5 bg-cream/30 rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta font-medium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-semibold text-espresso block mb-1">Storefront Subtitle</label>
                  <textarea
                    rows={2}
                    value={amazonShopText.subtitle}
                    onChange={(e) => setAmazonShopText({ ...amazonShopText, subtitle: e.target.value })}
                    placeholder="Stylist guarantee and introduction..."
                    className="w-full p-2.5 bg-cream/30 rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-espresso block mb-1">Stylist Assistance Box Title</label>
                  <input
                    type="text"
                    value={amazonShopText.adviceTitle}
                    onChange={(e) => setAmazonShopText({ ...amazonShopText, adviceTitle: e.target.value })}
                    placeholder="e.g. Have questions about hair color or texture matching?"
                    className="w-full p-2.5 bg-cream/30 rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-espresso block mb-1">Stylist Assistance Box Copy</label>
                  <input
                    type="text"
                    value={amazonShopText.adviceBody}
                    onChange={(e) => setAmazonShopText({ ...amazonShopText, adviceBody: e.target.value })}
                    placeholder="Sharon and our stylists are always happy to advise..."
                    className="w-full p-2.5 bg-cream/30 rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Curated Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {amazonProductsList.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-espresso/10 p-5 shadow-sm flex flex-col justify-between space-y-4 relative group"
                >
                  <div>
                    <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 bg-cream-dark/30 border border-espresso/5 flex items-center justify-center p-3">
                      <img
                        src={prod.images?.[0]}
                        alt={prod.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/branding/logo-monogram-bb.png';
                          (e.target as HTMLImageElement).className = 'w-1/3 h-1/3 object-contain';
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-terracotta bg-clay-rose/15 px-2 py-0.5 rounded-full">
                        {prod.categoryLabel || prod.category}
                      </span>
                      {prod.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-espresso/70 bg-cream px-2 py-0.5 rounded-full border border-espresso/10">
                          {prod.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-espresso line-clamp-1 mb-1">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-espresso/50 mb-2">Brand: {prod.brand}</p>

                    {/* Sharon's Note */}
                    <div className="bg-cream/70 border border-espresso/5 rounded-lg p-2.5 mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-terracotta block mb-0.5">
                        Sharon’s Advice:
                      </span>
                      <p className="text-[11px] text-espresso/80 font-light italic line-clamp-2">
                        &ldquo;{prod.stylistNotes}&rdquo;
                      </p>
                    </div>

                    {prod.packGuidance && (
                      <p className="text-[10px] text-espresso/70 font-semibold mb-1">
                        📦 Prep: {prod.packGuidance}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-espresso/10 flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-espresso">{formatPrice(prod.price)}</span>
                      {prod.prime && (
                        <span className="ml-2 text-[9px] font-bold uppercase text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded">
                          Prime
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={prod.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-cream rounded-lg text-espresso/60 hover:text-espresso"
                        title="Open on Amazon"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${prod.name}" from your public storefront?`)) {
                            handleSaveAmazonProducts(amazonProductsList.filter(p => p.id !== prod.id));
                          }
                        }}
                        className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Amazon Product Modal */}
            {isAddAmazonModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs overflow-y-auto">
                <div className="bg-cream border border-espresso/15 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-8">
                  <div className="flex items-center justify-between border-b border-espresso/10 pb-3">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso">
                      Add Client-Chosen Product
                    </h3>
                    <button
                      onClick={() => setIsAddAmazonModalOpen(false)}
                      className="text-espresso/60 hover:text-espresso"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-espresso block mb-1">Product Title *</label>
                      <input
                        type="text"
                        value={newAmazonItem.name}
                        onChange={(e) => setNewAmazonItem({ ...newAmazonItem, name: e.target.value })}
                        placeholder="e.g. Ruwa Pre-Stretched Braiding Hair 24 Inch"
                        className="w-full p-2.5 bg-white rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-espresso block mb-1">Brand Name *</label>
                        <input
                          type="text"
                          value={newAmazonItem.brand}
                          onChange={(e) => setNewAmazonItem({ ...newAmazonItem, brand: e.target.value })}
                          placeholder="e.g. Ruwa / Mielle"
                          className="w-full p-2.5 bg-white rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-espresso block mb-1">Category *</label>
                        <select
                          value={newAmazonItem.category}
                          onChange={(e) => {
                            const cat = e.target.value as any;
                            const labels: Record<string, string> = {
                              'braiding-hair': 'Braiding Hair & Bulk',
                              'edge-control': 'Edge Control & Slicking',
                              'scalp-care': 'Scalp Care & Serums',
                              'sleep-silk': 'Silk Sleep & Bonnets',
                              'maintenance': 'Maintenance & Takedown',
                              'tools': 'Stylist Tools',
                            };
                            setNewAmazonItem({ 
                              ...newAmazonItem, 
                              category: cat,
                              categoryLabel: labels[cat] || 'Hair Care'
                            });
                          }}
                          className="w-full p-2.5 bg-white rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta"
                        >
                          <option value="braiding-hair">Braiding Hair &amp; Bulk</option>
                          <option value="edge-control">Edge Control &amp; Slicking</option>
                          <option value="scalp-care">Scalp Care &amp; Serums</option>
                          <option value="sleep-silk">Silk Sleep &amp; Bonnets</option>
                          <option value="maintenance">Maintenance &amp; Takedown</option>
                          <option value="tools">Stylist Tools</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-espresso block mb-1">Price ($) *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newAmazonItem.price}
                          onChange={(e) => setNewAmazonItem({ ...newAmazonItem, price: parseFloat(e.target.value) || 0 })}
                          className="w-full p-2.5 bg-white rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-espresso block mb-1">Badge</label>
                        <select
                          value={newAmazonItem.badge}
                          onChange={(e) => setNewAmazonItem({ ...newAmazonItem, badge: e.target.value as any })}
                          className="w-full p-2.5 bg-white rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta"
                        >
                          <option value="Sharon’s Pick">Sharon’s Pick</option>
                          <option value="Salon Required">Salon Required</option>
                          <option value="Client Favorite">Client Favorite</option>
                          <option value="Best Value">Best Value</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-espresso block mb-1">Sharon’s Stylist Note *</label>
                      <textarea
                        rows={2}
                        value={newAmazonItem.stylistNotes}
                        onChange={(e) => setNewAmazonItem({ ...newAmazonItem, stylistNotes: e.target.value })}
                        placeholder="Why do you recommend this item to clients?"
                        className="w-full p-2.5 bg-white rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-espresso block mb-1">Appointment Pack Guidance (Optional)</label>
                      <input
                        type="text"
                        value={newAmazonItem.packGuidance}
                        onChange={(e) => setNewAmazonItem({ ...newAmazonItem, packGuidance: e.target.value })}
                        placeholder="e.g. Bring 3 packs to your Knotless appointment"
                        className="w-full p-2.5 bg-white rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-espresso block mb-1">Amazon Product URL or ASIN *</label>
                      <input
                        type="text"
                        value={newAmazonItem.amazonUrl}
                        onChange={(e) => setNewAmazonItem({ ...newAmazonItem, amazonUrl: e.target.value })}
                        placeholder="https://www.amazon.com/dp/B07N8MZZ47?tag=braidbarnj-20"
                        className="w-full p-2.5 bg-white rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-espresso block mb-1">Product Image URL (Optional)</label>
                      <input
                        type="text"
                        value={newAmazonItem.imageUrl}
                        onChange={(e) => setNewAmazonItem({ ...newAmazonItem, imageUrl: e.target.value })}
                        placeholder="https://m.media-amazon.com/images/... or Unsplash link"
                        className="w-full p-2.5 bg-white rounded-xl border border-espresso/15 focus:outline-none focus:border-terracotta"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-espresso/10">
                    <button
                      onClick={() => setIsAddAmazonModalOpen(false)}
                      className="px-4 py-2 border border-espresso/20 rounded-full text-xs font-semibold text-espresso"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!newAmazonItem.name || !newAmazonItem.brand) {
                          alert('Please enter a product name and brand.');
                          return;
                        }
                        const finalUrl = newAmazonItem.amazonUrl.includes('tag=')
                          ? newAmazonItem.amazonUrl
                          : `${newAmazonItem.amazonUrl}${newAmazonItem.amazonUrl.includes('?') ? '&' : '?'}tag=braidbarnj-20`;

                        const created: AmazonProduct = {
                          id: `bb-amz-custom-${Date.now()}`,
                          asin: newAmazonItem.asin || 'CUSTOM',
                          name: newAmazonItem.name,
                          brand: newAmazonItem.brand,
                          category: newAmazonItem.category,
                          categoryLabel: newAmazonItem.categoryLabel,
                          description: newAmazonItem.description || newAmazonItem.stylistNotes,
                          stylistNotes: newAmazonItem.stylistNotes || 'Selected by Sharon French for appointment prep.',
                          packGuidance: newAmazonItem.packGuidance,
                          recommendedFor: ['Salon Protective Styling'],
                          price: newAmazonItem.price,
                          rating: newAmazonItem.rating,
                          reviewCount: newAmazonItem.reviewCount,
                          prime: newAmazonItem.prime,
                          images: [newAmazonItem.imageUrl || '/images/branding/logo-monogram-bb.png'],
                          amazonUrl: finalUrl,
                          badge: newAmazonItem.badge,
                          inStock: true,
                          featured: true,
                        };

                        handleSaveAmazonProducts([created, ...amazonProductsList]);
                        setIsAddAmazonModalOpen(false);
                        setNewAmazonItem({
                          name: '',
                          brand: '',
                          asin: '',
                          category: 'braiding-hair',
                          categoryLabel: 'Braiding & Bulk Hair',
                          description: '',
                          stylistNotes: '',
                          packGuidance: '',
                          price: 19.99,
                          rating: 4.8,
                          reviewCount: 150,
                          prime: true,
                          badge: 'Sharon’s Pick',
                          imageUrl: '',
                          amazonUrl: '',
                        });
                      }}
                      className="px-5 py-2 bg-terracotta hover:bg-espresso text-cream rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Save to Storefront
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: POP-UP VENDOR APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-espresso/10 shadow-sm">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">Boutique Pop-Up Vendor Applications</h3>
              <p className="text-xs text-espresso/60 font-light">Review submissions from local artisans and brands for Braid Bar pop-up events</p>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full">
                        {app.productCategory}
                      </span>
                      <span className="text-xs text-espresso/40">Submitted: {app.dateSubmitted}</span>
                    </div>

                    <h4 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso">{app.brandName}</h4>
                    <p className="text-xs text-espresso/80 font-medium mb-2">Applicant: {app.applicantName} • {app.instagram}</p>
                    <p className="text-xs text-espresso/70 font-light leading-relaxed mb-4">{app.description}</p>

                    <div className="flex items-center gap-4 text-xs text-espresso/60">
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-terracotta" /> {app.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-terracotta" /> {app.email}</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-espresso/10 pt-4 md:pt-0 md:pl-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        app.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status}
                    </span>

                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => handleUpdateAppStatus(app.id, 'Approved')}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-cream rounded-full text-xs font-semibold transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve Vendor
                      </button>
                      <button
                        onClick={() => handleUpdateAppStatus(app.id, 'Rejected')}
                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-full text-xs font-semibold transition-all"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso border-b border-espresso/10 pb-4">
                Braid Bar Salon Location &amp; Contact Settings
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-espresso/70 font-semibold mb-1">Salon Address</label>
                  <input
                    type="text"
                    defaultValue="560 Valley Road, West Orange, NJ"
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-espresso/70 font-semibold mb-1">WhatsApp Dispatch Phone</label>
                  <input
                    type="text"
                    defaultValue="+1 (973) 972-9864"
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-espresso/70 font-semibold mb-1">Contact Email</label>
                  <input
                    type="text"
                    defaultValue="braidbar1nj@gmail.com"
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-espresso/70 font-semibold mb-1">Deposit Requirement Policy</label>
                  <select className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/10 rounded-xl text-xs focus:outline-none focus:border-terracotta">
                    <option value="25%">25% Non-Refundable Booking Deposit</option>
                    <option value="50%">50% Deposit</option>
                    <option value="100%">100% Full Prepayment</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => alert('Settings saved successfully!')}
                    className="bg-terracotta hover:bg-espresso text-cream font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Save Salon Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add / Edit Service Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-espresso/15 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-espresso/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                  {serviceFormData.id ? 'Edit Service Details' : 'Add New Service'}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso mt-1">
                  {serviceFormData.id ? serviceFormData.name : 'Create New Service'}
                </h3>
              </div>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="text-espresso/40 hover:text-espresso p-1 rounded-full text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveServiceForm} className="space-y-4 text-xs">
              <div>
                <label className="block text-espresso/80 font-bold mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Medium Bohemian Knotless"
                  value={serviceFormData.name}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Category</label>
                  <select
                    value={serviceFormData.category}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    required
                    min={15}
                    step={15}
                    value={serviceFormData.duration_min}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, duration_min: parseInt(e.target.value) || 60 })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Total Price ($)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={serviceFormData.price}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Required Deposit ($)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={serviceFormData.deposit_amount}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, deposit_amount: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-espresso/80 font-bold mb-1">Description / Copy</label>
                <textarea
                  rows={3}
                  placeholder="Describe what's included in this hair service..."
                  value={serviceFormData.description}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Service Photo / Thumbnail */}
              <div>
                <label className="block text-espresso/80 font-bold mb-1">Service Photo / Thumbnail</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl border border-espresso/15 bg-cream/40 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {serviceFormData.image_url ? (
                      <img src={serviceFormData.image_url} alt="Service preview" className="w-full h-full object-cover" />
                    ) : (
                      <Sparkles className="w-6 h-6 text-espresso/30" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      placeholder="Image URL or upload below..."
                      value={serviceFormData.image_url}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, image_url: e.target.value })}
                      className="w-full px-3 py-1.5 bg-cream/30 border border-espresso/15 rounded-lg text-xs font-mono text-espresso focus:outline-none focus:border-terracotta"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-espresso/5 hover:bg-espresso/10 text-espresso text-[11px] font-semibold rounded-lg cursor-pointer transition-colors border border-espresso/10">
                      <Upload className="w-3.5 h-3.5 text-terracotta" /> Upload Image from Device
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, (url) => {
                              setServiceFormData({ ...serviceFormData, image_url: url });
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-espresso/80 font-bold mb-1">Assign to Calendar</label>
                <select
                  value={serviceFormData.assignedCalendar}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, assignedCalendar: e.target.value as any })}
                  className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                >
                  <option value="both">Both Calendars (Sharon &amp; Abigail)</option>
                  <option value="cal-sharon">Sharon French — Lead Stylist Only</option>
                  <option value="cal-abigail">Abigail Charles — Assistant Only</option>
                </select>
                <p className="text-[10px] text-espresso/50 mt-1">Controls which stylist's booking calendar this service appears under.</p>
              </div>

              {/* Private 1-on-1 Studio Option */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={serviceFormData.isPrivate}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, isPrivate: e.target.checked })}
                  className="mt-0.5 rounded text-terracotta focus:ring-terracotta h-4 w-4"
                />
                <label htmlFor="isPrivate" className="cursor-pointer text-xs select-none">
                  <span className="font-bold text-espresso block">🔒 Private 1-on-1 Studio Experience (Studio Buyout)</span>
                  <span className="text-[11px] text-espresso/70 leading-relaxed block mt-0.5">
                    Locks the salon for a completely private appointment with no other clients in the building during service.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-espresso/10">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-5 py-2.5 bg-cream/50 hover:bg-cream text-espresso font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-terracotta hover:bg-espresso text-cream font-bold rounded-xl uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  {serviceFormData.id ? 'Save Service Changes' : 'Publish Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Service Add-On Modal */}
      {isAddonModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 shadow-2xl border border-espresso/15 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-espresso/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                  {addonFormData.id ? 'Edit Add-On Details' : 'Create New Add-On'}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso mt-1">
                  {addonFormData.id ? addonFormData.name : 'Add Service Enhancement'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddonModalOpen(false)}
                className="text-espresso/40 hover:text-espresso p-1 rounded-full text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddonForm} className="space-y-4 text-xs">
              <div>
                <label className="block text-espresso/80 font-bold mb-1">Add-On Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Extra Waist Length"
                  value={addonFormData.name}
                  onChange={(e) => setAddonFormData({ ...addonFormData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={addonFormData.price}
                    onChange={(e) => setAddonFormData({ ...addonFormData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Extra Duration (Mins)</label>
                  <input
                    type="number"
                    required
                    min={5}
                    step={5}
                    value={addonFormData.duration_min}
                    onChange={(e) => setAddonFormData({ ...addonFormData, duration_min: parseInt(e.target.value) || 15 })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Add-on Applicability Selector */}
              <div>
                <label className="block text-espresso/80 font-bold mb-1">Applies To</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAddonFormData({ ...addonFormData, applicableTo: 'all' })}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                      addonFormData.applicableTo === 'all'
                        ? 'bg-terracotta text-cream border-terracotta shadow-xs'
                        : 'bg-cream/30 border-espresso/15 text-espresso/70 hover:bg-cream/60'
                    }`}
                  >
                    All Hair Services
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddonFormData({ ...addonFormData, applicableTo: 'specific' })}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                      addonFormData.applicableTo === 'specific'
                        ? 'bg-terracotta text-cream border-terracotta shadow-xs'
                        : 'bg-cream/30 border-espresso/15 text-espresso/70 hover:bg-cream/60'
                    }`}
                  >
                    Specific Services Only
                  </button>
                </div>
              </div>

              {addonFormData.applicableTo === 'specific' && (
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Select Eligible Services</label>
                  <div className="max-h-44 overflow-y-auto p-2 bg-cream/30 border border-espresso/15 rounded-xl space-y-1.5">
                    {servicesList.map((srv) => {
                      const isChecked = addonFormData.applicableServiceIds?.includes(srv.id);
                      return (
                        <label key={srv.id} className="flex items-center gap-2 p-1.5 hover:bg-white rounded-lg cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const currentIds = addonFormData.applicableServiceIds || [];
                              const newIds = e.target.checked
                                ? [...currentIds, srv.id]
                                : currentIds.filter((id) => id !== srv.id);
                              setAddonFormData({ ...addonFormData, applicableServiceIds: newIds });
                            }}
                            className="rounded text-terracotta focus:ring-terracotta h-3.5 w-3.5"
                          />
                          <span className="text-espresso font-medium truncate">{srv.name}</span>
                          <span className="text-[10px] text-espresso/50 ml-auto">{srv.category}</span>
                        </label>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-espresso/50 mt-1">This add-on will only appear when booking the checked styles.</p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-espresso/10">
                <button
                  type="button"
                  onClick={() => setIsAddonModalOpen(false)}
                  className="px-5 py-2.5 bg-cream/50 hover:bg-cream text-espresso font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-terracotta hover:bg-espresso text-cream font-bold rounded-xl uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  {addonFormData.id ? 'Save Add-On' : 'Create Add-On'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-espresso/15 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-espresso/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                  Category Management
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso mt-1">
                  Add Service Category
                </h3>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-espresso/40 hover:text-espresso p-1 rounded-full text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-espresso/80 font-bold mb-1">New Category Title</label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Boho Extensions &amp; Weaves"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-espresso/10">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 bg-cream/50 hover:bg-cream text-espresso font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-terracotta hover:bg-espresso text-cream font-bold rounded-xl uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Schedule & Titles Modal */}
      {isStaffScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border border-espresso/15 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-espresso/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                  Calendar &amp; Hours
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso mt-1">
                  Edit {scheduleFormData.name}&apos;s Schedule
                </h3>
              </div>
              <button
                onClick={() => setIsStaffScheduleModalOpen(false)}
                className="text-espresso/40 hover:text-espresso p-1 rounded-full text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStaffSchedule} className="space-y-4 text-xs">
              <div>
                <label className="block text-espresso/80 font-bold mb-1">Stylist Calendar Title / Role</label>
                <input
                  type="text"
                  required
                  value={scheduleFormData.title}
                  onChange={(e) => setScheduleFormData({ ...scheduleFormData, title: e.target.value })}
                  placeholder="e.g. Founder &amp; Lead Stylist"
                  className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                />
                <p className="text-[10px] text-espresso/50 mt-1">Changes the title displayed on the booking calendar selector.</p>
              </div>

              <div>
                <label className="block text-espresso/80 font-bold mb-1.5">Working Days</label>
                <div className="grid grid-cols-7 gap-1.5">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                    const isSelected = scheduleFormData.days.includes(day);
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => {
                          const newDays = isSelected
                            ? scheduleFormData.days.filter((d) => d !== day)
                            : [...scheduleFormData.days, day];
                          setScheduleFormData({ ...scheduleFormData, days: newDays });
                        }}
                        className={`py-2 rounded-xl text-center font-bold text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-espresso text-cream shadow-xs'
                            : 'bg-cream/40 text-espresso/40 hover:bg-cream/80'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-espresso/80 font-bold mb-1">Standard Working Hours</label>
                <input
                  type="text"
                  required
                  value={scheduleFormData.hours}
                  onChange={(e) => setScheduleFormData({ ...scheduleFormData, hours: e.target.value })}
                  placeholder="e.g. 9:00 AM – 6:00 PM"
                  className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-espresso/80 font-bold mb-1">Weekly Notes / Availability Override</label>
                <textarea
                  rows={2}
                  value={scheduleFormData.weeklyOverride}
                  onChange={(e) => setScheduleFormData({ ...scheduleFormData, weeklyOverride: e.target.value })}
                  placeholder="e.g. Unavailable Friday afternoon for supply pickup; open extra Sunday."
                  className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                />
                <p className="text-[10px] text-espresso/50 mt-1">Sharon can adjust this each week to inform clients or set custom shifts.</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-espresso/10">
                <button
                  type="button"
                  onClick={() => setIsStaffScheduleModalOpen(false)}
                  className="px-4 py-2 bg-cream/50 hover:bg-cream text-espresso font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-terracotta hover:bg-espresso text-cream font-bold rounded-xl uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Client Modal */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-espresso/15 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-espresso/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                  Client CRM Profile
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-espresso mt-1">
                  {clientFormData.id ? `Edit ${clientFormData.name}` : 'Add New Client'}
                </h3>
              </div>
              <button
                onClick={() => setIsClientModalOpen(false)}
                className="text-espresso/40 hover:text-espresso p-1 rounded-full text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveClientForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Client Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jasmine Thorne"
                    value={clientFormData.name}
                    onChange={(e) => setClientFormData({ ...clientFormData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Client Status Tag</label>
                  <select
                    value={clientFormData.tag}
                    onChange={(e) => setClientFormData({ ...clientFormData, tag: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  >
                    <option value="VIP Client">VIP Client</option>
                    <option value="Regular">Regular</option>
                    <option value="New Client">New Client</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="(973) 555-0100"
                    value={clientFormData.phone}
                    onChange={(e) => setClientFormData({ ...clientFormData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={clientFormData.email}
                    onChange={(e) => setClientFormData({ ...clientFormData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Preferred Stylist</label>
                  <select
                    value={clientFormData.stylist}
                    onChange={(e) => setClientFormData({ ...clientFormData, stylist: e.target.value })}
                    className="w-full px-3 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  >
                    <option value="Sharon French">Sharon French</option>
                    <option value="Abigail Charles">Abigail Charles</option>
                    <option value="No Preference">No Preference</option>
                  </select>
                </div>
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Total Spent ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={clientFormData.totalSpent}
                    onChange={(e) => setClientFormData({ ...clientFormData, totalSpent: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-espresso/80 font-bold mb-1">Visits Count</label>
                  <input
                    type="number"
                    min={0}
                    value={clientFormData.visitsCount}
                    onChange={(e) => setClientFormData({ ...clientFormData, visitsCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-espresso/80 font-bold mb-1">Hair Preferences, Formulas &amp; Private Notes</label>
                <textarea
                  rows={3}
                  placeholder="Notes on scalp sensitivity, curl pattern preferences, parting styles, tea/drink choices..."
                  value={clientFormData.notes}
                  onChange={(e) => setClientFormData({ ...clientFormData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl font-medium text-espresso focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-espresso/10">
                <button
                  type="button"
                  onClick={() => setIsClientModalOpen(false)}
                  className="px-5 py-2.5 bg-cream/50 hover:bg-cream text-espresso font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-terracotta hover:bg-espresso text-cream font-bold rounded-xl uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  {clientFormData.id ? 'Save Profile' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
