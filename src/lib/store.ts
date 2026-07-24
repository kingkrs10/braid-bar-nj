/**
 * Zustand State Management
 * ========================
 * Central state stores for cart, booking, and UI state.
 * Uses Zustand v5 with slice pattern for modularity.
 */

import { create } from 'zustand';
import type { Service, Product, OrderItem, ServiceAddon } from './supabase';

/* =============================================
   Cart Store — E-Commerce Shopping Cart
   ============================================= */

interface CartItem extends OrderItem {
  image?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;

  // Computed
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) =>
    set((state) => {
      // Check if item with same product_id, size, and color exists
      const existingIndex = state.items.findIndex(
        (i) =>
          i.product_id === item.product_id &&
          i.size === item.size &&
          i.color === item.color
      );

      if (existingIndex >= 0) {
        // Update quantity of existing item
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
        };
        return { items: updated };
      }

      // Add new item
      return { items: [...state.items, item] };
    }),

  removeItem: (productId, size, color) =>
    set((state) => ({
      items: state.items.filter(
        (i) =>
          !(i.product_id === productId && i.size === size && i.color === color)
      ),
    })),

  updateQuantity: (productId, quantity, size, color) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product_id === productId && i.size === size && i.color === color
          ? { ...i, quantity: Math.max(0, quantity) }
          : i
      ).filter((i) => i.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setCartOpen: (open) => set({ isOpen: open }),

  getTotal: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  getItemCount: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),
}));


/* =============================================
   Booking Store — Braid Bar Appointment Booking
   ============================================= */

interface BookingStore {
  // Selection state
  selectedService: Service | null;
  selectedAddons: ServiceAddon[];
  selectedDate: Date | null;
  selectedTime: string | null;
  
  // Customer info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes: string;

  // Checkout policies
  cancellationPolicyAgreed: boolean;

  // Flow state
  step: 'service' | 'datetime' | 'info' | 'checkout' | 'confirmation';
  isSubmitting: boolean;

  // Actions
  setService: (service: Service | null) => void;
  toggleAddon: (addon: ServiceAddon) => void;
  setDate: (date: Date | null) => void;
  setTime: (time: string | null) => void;
  setCustomerInfo: (info: Partial<{
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerNotes: string;
  }>) => void;
  setCancellationPolicyAgreed: (agreed: boolean) => void;
  setStep: (step: BookingStore['step']) => void;
  setSubmitting: (submitting: boolean) => void;
  resetBooking: () => void;

  // Computed helper
  getBookingTotal: () => number;
  getDepositAmount: () => number;
}

const initialBookingState = {
  selectedService: null,
  selectedAddons: [],
  selectedDate: null,
  selectedTime: null,
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  customerNotes: '',
  cancellationPolicyAgreed: false,
  step: 'service' as const,
  isSubmitting: false,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initialBookingState,

  setService: (service) => set({ selectedService: service, selectedAddons: [] }),
  toggleAddon: (addon) =>
    set((state) => {
      const exists = state.selectedAddons.find((a) => a.id === addon.id);
      if (exists) {
        return { selectedAddons: state.selectedAddons.filter((a) => a.id !== addon.id) };
      } else {
        return { selectedAddons: [...state.selectedAddons, addon] };
      }
    }),
  setDate: (date) => set({ selectedDate: date, selectedTime: null }),
  setTime: (time) => set({ selectedTime: time }),
  setCustomerInfo: (info) => set((state) => ({ ...state, ...info })),
  setCancellationPolicyAgreed: (agreed) => set({ cancellationPolicyAgreed: agreed }),
  setStep: (step) => set({ step }),
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),
  resetBooking: () => set(initialBookingState),

  getBookingTotal: () => {
    const servicePrice = get().selectedService?.price || 0;
    const addonsPrice = get().selectedAddons.reduce((sum, a) => sum + Number(a.price), 0);
    return Number(servicePrice) + addonsPrice;
  },

  getDepositAmount: () => {
    return Number(get().selectedService?.deposit_amount || 0);
  },
}));


/* =============================================
   UI Store — Global UI State
   ============================================= */

interface UIStore {
  // Navigation
  isMobileMenuOpen: boolean;
  activeSection: string;
  
  // Modals
  activeModal: string | null;
  
  // Scroll state
  scrollProgress: number;
  isScrolled: boolean;

  // Actions
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setActiveSection: (section: string) => void;
  setActiveModal: (modal: string | null) => void;
  setScrollProgress: (progress: number) => void;
  setIsScrolled: (scrolled: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  activeSection: 'hero',
  activeModal: null,
  scrollProgress: 0,
  isScrolled: false,

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
}));
