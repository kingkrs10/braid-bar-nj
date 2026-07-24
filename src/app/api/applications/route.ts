/**
 * Pop-Up Application API Route
 * =============================
 * Handles designer/maker applications for pop-up space in the boutique.
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/applications
 * Body: { designerName, brandName, email, phone, productCategory, socialMedia, portfolioUrl?, pitch }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { designerName, brandName, email, phone, productCategory, socialMedia, portfolioUrl, pitch } = body;

    // --- Validation ---
    if (!designerName || !brandName || !email || !phone || !productCategory || !pitch) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // --- Store application (mock — in production, insert into Supabase) ---
    const application = {
      id: `app-${Date.now()}`,
      designer_name: designerName,
      brand_name: brandName,
      email,
      phone,
      product_category: productCategory,
      social_media: socialMedia || '',
      portfolio_url: portfolioUrl || '',
      pitch,
      status: 'submitted',
      created_at: new Date().toISOString(),
    };

    console.log('New pop-up application:', application);

    return NextResponse.json({
      application,
      message: 'Application submitted successfully! We\'ll review and get back to you within 5 business days.',
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
