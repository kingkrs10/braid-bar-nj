/**
 * Products API Route
 * ==================
 * Returns products from the boutique catalog.
 * In production, fetches from Supabase. Currently uses mock data.
 */

import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/data';

/**
 * GET /api/products?category=shirts
 * Returns products, optionally filtered by category
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let filtered = products;

  if (category && category !== 'all') {
    filtered = products.filter((p) => p.category === category);
  }

  return NextResponse.json({ products: filtered });
}
