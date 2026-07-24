/**
 * Supabase Client Configuration
 * ==============================
 * Creates and exports Supabase client instances for both
 * client-side and server-side usage in Next.js App Router.
 */

import { createClient } from '@supabase/supabase-js';

// --- Environment Variables ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key';

/**
 * Browser-side Supabase client (uses anon key)
 * Safe to use in client components with 'use client'
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Creates a server-side Supabase client with service role key
 * Use ONLY in API routes and server components — never expose to client
 */
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_key';
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Database type definitions
 * These match the Supabase schema for type safety
 */
export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'client' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration_min: number;
  price: number;
  deposit_amount: number; // Mandatory deposit amount to secure appointment
  category: string;
  image_url?: string;
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  duration_min: number;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface Booking {
  id: string;
  client_id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  stripe_payment_intent?: string; // Verification token for deposit payment
  client_notes?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'shirts' | 'pants' | 'jumpsuits' | 'outerwear' | 'accessories';
  sizes: string[];
  colors: string[];
  images: string[];
  model_url?: string;
  in_stock: boolean;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  payment_method: 'stripe' | 'cashapp' | 'zelle';
  payment_status: 'pending' | 'paid' | 'verified' | 'failed';
  zelle_txn_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface PopUpApplication {
  id: string;
  designer_name: string;
  brand_name: string;
  email: string;
  phone: string;
  product_category: string;
  social_media: string;
  portfolio_url?: string;
  pitch: string;
  status: 'submitted' | 'reviewed' | 'approved' | 'rejected';
  created_at: string;
}
