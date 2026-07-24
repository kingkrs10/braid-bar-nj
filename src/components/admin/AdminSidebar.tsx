'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  ShoppingBag, 
  Store, 
  Settings, 
  ExternalLink,
  ShieldCheck,
  LogOut,
  FileText,
  Image as ImageIcon,
  Rocket,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingApplicationsCount?: number;
  upcomingBookingsCount?: number;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  pendingApplicationsCount = 5,
  upcomingBookingsCount = 12
}: AdminSidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: upcomingBookingsCount },
    { id: 'services', label: 'Service Catalog', icon: Scissors },
    { id: 'content', label: 'Site Text & Images', icon: FileText },
    { id: 'deployment', label: 'Site Deployment', icon: Rocket },
    { id: 'infrastructure', label: 'Data & Subscriptions', icon: Database },
    { id: 'shop', label: 'Shop Inventory', icon: ShoppingBag },
    { id: 'applications', label: 'Pop-Up Vendors', icon: Store, badge: pendingApplicationsCount },
    { id: 'settings', label: 'Salon Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-espresso text-cream flex flex-col h-screen sticky top-0 border-r border-cream/10 z-40 select-none">
      {/* Top Header & Branding */}
      <div className="p-6 border-b border-cream/10 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img
            src="/images/branding/logo-monogram-bb.png"
            alt="Braid Bar Monogram Logo"
            className="h-10 w-auto object-contain filter drop-shadow-sm"
          />
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-wider text-cream">
              BRAID BAR
            </h1>
            <span className="text-[9px] uppercase tracking-[0.25em] text-accent-gold font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Owner Portal
            </span>
          </div>
        </div>

        {/* Logged in User Badge */}
        <div className="mt-2 bg-cream/5 border border-cream/10 rounded-xl p-3 flex items-center gap-3">
          <img
            src="/images/branding/profile-sharon-lead.png"
            alt="Sharon French"
            className="w-9 h-9 rounded-full object-cover border border-clay-rose/40"
          />
          <div className="overflow-hidden">
            <h2 className="text-xs font-bold text-cream truncate">Sharon French</h2>
            <p className="text-[10px] text-cream/60 truncate font-light">Owner &amp; Lead Stylist</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-2 text-[9px] uppercase tracking-[0.25em] text-cream/40 font-bold">
          Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all text-xs font-medium cursor-pointer',
                isActive
                  ? 'bg-terracotta text-cream shadow-md font-semibold'
                  : 'text-cream/70 hover:text-cream hover:bg-cream/5'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn('w-4 h-4', isActive ? 'text-cream' : 'text-cream/50')} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded-full',
                    isActive ? 'bg-cream text-terracotta' : 'bg-terracotta/30 text-accent-gold'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Quick Links & Logout */}
      <div className="p-4 border-t border-cream/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-cream/5 hover:bg-cream/10 text-cream/80 hover:text-cream transition-all text-xs font-medium"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-accent-gold" />
            View Live Site
          </span>
          <span className="text-[9px] text-cream/40">↗</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 text-xs text-rose-300 hover:text-rose-200 transition-colors w-full font-light"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Dashboard</span>
        </Link>
      </div>
    </aside>
  );
}
