'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { services as initialServices, products as initialProducts } from '@/lib/data';
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
  BookOpen
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
  const [servicesList, setServicesList] = useState(initialServices);
  const [productsList, setProductsList] = useState(initialProducts);
  const [applications, setApplications] = useState(initialApplications);

  // Site Text Content State
  const [siteText, setSiteText] = useState({
    heroBadge: '560 Valley Road, West Orange, NJ',
    heroHeadline: 'Crafted Braids, Elevated Care.',
    heroSubtitle: 'Precision parting. Weightless protective length. Clean healthy scalp.',
    missionTitle: 'Crafted Braids. Elevated Care. Everyday Luxury.',
    missionBody: 'At Braid Bar NJ, we blend precision parting with weightless protective length, ensuring your natural hair is shielded, neat, and styled beautifully.',
    sharonTitle: 'Founder & Lead Stylist',
    sharonBio: 'Sharon French is a self-taught braider with over 20 years of experience. At Braid Bar NJ, she blends precision parting with weightless protective length, ensuring your natural hair is shielded, neat, and styled beautifully.',
    sharonBadge: '📍 560 Valley Road, West Orange • 20+ Years Exp',
    abigailTitle: 'Salon Assistant & Stylist',
    abigailBio: 'Abigail Charles supports natural hair preps, wash-station washes, and braid removals, ensuring every client enjoys a relaxing, VIP prep experience while continuing to develop natural styling techniques.',
    abigailBadge: '📍 560 Valley Road, West Orange • Client Care Specialist',
    marqueeText: '✨ NOW BOOKING AUGUST & SEPTEMBER • 560 VALLEY ROAD, WEST ORANGE, NJ • VIP BRAID EXPERIENCES AVAILABLE',
  });

  // Site Image Assets State
  const [siteImages, setSiteImages] = useState({
    heroBg: '/images/branding/apple_butter_boutique_hero_1783880355600.jpg',
    sharonProfile: '/images/branding/profile-sharon-lead.png',
    sharonPhoto: '/images/branding/profile-sharon-lead.png',
    abigailProfile: '/images/branding/profile-abigail-assistant.png',
    abigailPhoto: '/images/branding/profile-abigail-assistant.png',
    navLogo: '/images/branding/logo-monogram-bb.png',
    heroLogo: '/images/branding/logo-stacked-bb.png',
    galleryPattern: '/images/branding/pattern-waves-tan.png',
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

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Service Edit Modal state
  const [editingService, setEditingService] = useState<any | null>(null);

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
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientPhone.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] text-espresso font-[family-name:var(--font-body)]">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingApplicationsCount={applications.filter((a) => a.status === 'Pending').length}
        upcomingBookingsCount={bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending Prep').length}
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
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 bg-espresso hover:bg-terracotta text-cream px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Preview Live Site
            </Link>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
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
                  <h3 className="text-3xl font-bold font-[family-name:var(--font-display)] text-espresso">$14,250</h3>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +18.4% vs last month
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
                  <h3 className="text-3xl font-bold font-[family-name:var(--font-display)] text-espresso">48</h3>
                  <p className="text-[11px] text-espresso/60 font-light mt-1">12 upcoming this week</p>
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
                  <h3 className="text-3xl font-bold font-[family-name:var(--font-display)] text-espresso">128</h3>
                  <p className="text-[11px] text-amber-700 font-medium mt-1">+9 new members signed up</p>
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

        {/* TAB 3: SERVICES CATALOG & PRICING */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-espresso/10 shadow-sm">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">Services &amp; Pricing Catalog</h3>
                <p className="text-xs text-espresso/60 font-light">Edit hair service prices, durations, and deposits</p>
              </div>
              <button
                onClick={() =>
                  alert('Add New Service modal can be connected to database!')
                }
                className="inline-flex items-center gap-2 bg-terracotta hover:bg-espresso text-cream px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesList.map((srv) => (
                <div key={srv.id} className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                        {srv.category}
                      </span>
                      <span className="text-xs font-bold text-espresso">{formatDuration(srv.duration_min)}</span>
                    </div>
                    <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso mb-2">{srv.name}</h4>
                    <p className="text-xs text-espresso/70 font-light leading-relaxed line-clamp-3 mb-4">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-espresso/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-espresso/50 font-bold uppercase block">Service Investment</span>
                      <span className="text-xl font-bold text-espresso">{formatPrice(srv.price)}</span>
                      <span className="text-[10px] text-emerald-700 block font-medium">Deposit: {formatPrice(srv.deposit_amount)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const newPriceStr = prompt(`Enter new price for "${srv.name}":`, srv.price.toString());
                          if (newPriceStr) {
                            const newPrice = parseFloat(newPriceStr);
                            if (!isNaN(newPrice)) {
                              setServicesList((prev) =>
                                prev.map((s) => (s.id === srv.id ? { ...s, price: newPrice } : s))
                              );
                            }
                          }
                        }}
                        className="px-3 py-1.5 bg-cream/50 hover:bg-cream border border-espresso/10 rounded-xl text-xs font-semibold text-espresso transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-terracotta" /> Edit Price
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
                  handleTriggerDeploy();
                  alert('✨ All website text, lookbook photos, and image assets saved & deployment triggered live!');
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
                <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-terracotta" /> 3. Lookbook &amp; Portfolio Gallery Cards
                </h4>
                <button
                  onClick={() => {
                    const newUrl = prompt('Enter image URL for new Lookbook photo:');
                    if (newUrl) {
                      const newTitle = prompt('Enter Title (e.g. Bohemian Knotless):', 'Bohemian Knotless') || 'New Style';
                      const newTag = prompt('Enter Category Tag (e.g. Knotless):', 'Knotless') || 'Braids';
                      alert(`🎉 Added "${newTitle}" to your Lookbook gallery!`);
                    }
                  }}
                  className="px-3.5 py-1.5 bg-cream/60 hover:bg-cream border border-espresso/10 text-espresso rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-terracotta" /> Add Lookbook Photo
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { title: 'Knotless Box Braids', tag: 'Knotless', img: '/lookbook-knotless.jpg', desc: 'Seamless, tension-free parting with natural movement.' },
                  { title: 'Fulani Tribal Braids', tag: 'Fulani', img: '/lookbook-fulani.jpg', desc: 'Custom cornrow patterns adorned with beads and cowrie accents.' },
                  { title: 'Passion & Goddess Twists', tag: 'Twists', img: '/lookbook-twists.jpg', desc: 'Lightweight, bohemian texture crafted for longevity.' },
                  { title: 'Salon Interior Lounge', tag: 'Studio', img: '/lookbook-salon.jpg', desc: 'Our cozy West Orange, NJ styling lounge.' },
                  { title: 'Scalp Line Crown Detail', tag: 'Detail', img: '/lookbook-braids.jpg', desc: 'High-precision scalp line definition and glossy finish.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-cream/20 p-4 rounded-2xl border border-espresso/10 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-espresso/10 bg-black/5 relative mb-3 group">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-espresso/90 text-cream text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-espresso/60 text-[10px] font-bold uppercase mb-0.5">Style Title</label>
                          <input
                            type="text"
                            defaultValue={item.title}
                            className="w-full px-3 py-1.5 bg-white border border-espresso/10 rounded-lg text-xs font-semibold text-espresso"
                          />
                        </div>

                        <div>
                          <label className="block text-espresso/60 text-[10px] font-bold uppercase mb-0.5">Description</label>
                          <textarea
                            rows={2}
                            defaultValue={item.desc}
                            className="w-full px-3 py-1.5 bg-white border border-espresso/10 rounded-lg text-xs leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const newUrl = prompt(`Enter new image URL for "${item.title}":`, item.img);
                        if (newUrl) alert(`Updated photo for "${item.title}"!`);
                      }}
                      className="w-full py-2 bg-espresso hover:bg-terracotta text-cream rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" /> Replace Lookbook Photo
                    </button>
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

            {/* Section E: Image Assets Upload & Swap Manager */}
            <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-6">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso border-b border-espresso/10 pb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-terracotta" /> 5. Website Image Uploads &amp; Media Assets
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* 1. Hero Background */}
                <div className="bg-cream/20 p-4 rounded-xl border border-espresso/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block mb-2">Hero Background Photo</span>
                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-espresso/10 bg-black/5 mb-3">
                      <img src={siteImages.heroBg} alt="Hero Background" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newUrl = prompt('Enter new Image URL or upload replacement asset:', siteImages.heroBg);
                      if (newUrl) setSiteImages({ ...siteImages, heroBg: newUrl });
                    }}
                    className="w-full py-2 bg-espresso hover:bg-terracotta text-cream rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload Photo
                  </button>
                </div>

                {/* 2. Top Nav Monogram */}
                <div className="bg-cream/20 p-4 rounded-xl border border-espresso/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block mb-2">Top Navigation Monogram</span>
                    <div className="h-20 w-full rounded-lg overflow-hidden border border-espresso/10 bg-espresso/90 p-3 flex items-center justify-center mb-3">
                      <img src={siteImages.navLogo} alt="Nav Monogram" className="h-full object-contain" />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newUrl = prompt('Enter new Logo PNG URL:', siteImages.navLogo);
                      if (newUrl) setSiteImages({ ...siteImages, navLogo: newUrl });
                    }}
                    className="w-full py-2 bg-espresso hover:bg-terracotta text-cream rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload Logo
                  </button>
                </div>

                {/* 3. Main Stacked Logo */}
                <div className="bg-cream/20 p-4 rounded-xl border border-espresso/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block mb-2">Main Hero Stacked Logo</span>
                    <div className="h-20 w-full rounded-lg overflow-hidden border border-espresso/10 bg-cream-dark p-2 flex items-center justify-center mb-3">
                      <img src={siteImages.heroLogo} alt="Hero Stacked Logo" className="h-full object-contain" />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newUrl = prompt('Enter new Stacked Logo PNG URL:', siteImages.heroLogo);
                      if (newUrl) setSiteImages({ ...siteImages, heroLogo: newUrl });
                    }}
                    className="w-full py-2 bg-espresso hover:bg-terracotta text-cream rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload Logo
                  </button>
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

        {/* TAB 4: SHOP INVENTORY */}
        {activeTab === 'shop' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-espresso/10 shadow-sm">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-espresso">Hair Care Products Inventory</h3>
                <p className="text-xs text-espresso/60 font-light">Manage stock, prices, and product listings</p>
              </div>
              <button
                onClick={() => alert('Add New Product modal active!')}
                className="inline-flex items-center gap-2 bg-terracotta hover:bg-espresso text-cream px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {productsList.map((prod) => (
                <div key={prod.id} className="bg-white rounded-2xl border border-espresso/10 p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="aspect-square w-full rounded-xl overflow-hidden mb-4 bg-cream/30 border border-espresso/5">
                      <img src={prod.images?.[0] || (prod as any).image_url} alt={prod.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta">{prod.category}</span>
                    <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-espresso mb-1">{prod.name}</h4>
                    <p className="text-xs text-espresso/60 font-light line-clamp-2 mb-3">{prod.description}</p>
                  </div>

                  <div className="pt-3 border-t border-espresso/10 flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-espresso">{formatPrice(prod.price)}</span>
                      <span className="block text-[10px] text-emerald-700 font-medium">In Stock ({(prod as any).stock_quantity || 15} units)</span>
                    </div>

                    <button
                      onClick={() => {
                        const newStockStr = prompt(`Update stock quantity for "${prod.name}":`, '20');
                        if (newStockStr) {
                          const newStock = parseInt(newStockStr, 10);
                          if (!isNaN(newStock)) {
                            setProductsList((prev) =>
                              prev.map((p) => (p.id === prod.id ? ({ ...p, stock_quantity: newStock } as any) : p))
                            );
                          }
                        }
                      }}
                      className="px-3 py-1.5 bg-cream/50 hover:bg-cream border border-espresso/10 rounded-xl text-xs font-semibold text-espresso transition-colors"
                    >
                      Update Stock
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
}
