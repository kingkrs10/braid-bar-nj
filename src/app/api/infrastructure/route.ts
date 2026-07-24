import { NextResponse } from 'next/server';

let infrastructureConfig = {
  supabaseUrl: 'https://xyz-braidbar-supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  godaddyDomain: 'thebraidbarnj.com',
  godaddyRenewalDate: '2027-04-12',
  godaddyRenewalCost: 21.99,
  hostingPlan: 'Edge Pro CDN',
  hostingCost: 20.0,
  stripeConnected: true,
  stripeAccountId: 'acct_1NJ92K81002BB',
  squareConnected: true,
  zelleNumber: '+1 (973) 972-9864',
};

const subscriptionsDirectory = [
  {
    id: 'sub_1',
    service: 'GoDaddy Domain Registrar',
    resource: 'thebraidbarnj.com',
    category: 'Domain & DNS',
    cycle: 'Annual',
    cost: '$21.99 / year',
    nextBilling: 'April 12, 2027',
    status: 'Active (Auto-Renew)',
    manageUrl: 'https://dcc.godaddy.com/manage/thebraidbarnj.com/dns',
  },
  {
    id: 'sub_2',
    service: 'Supabase Database & Auth',
    resource: 'PostgreSQL & Cloud Storage',
    category: 'Database & Backend',
    cycle: 'Monthly',
    cost: '$25.00 / month',
    nextBilling: 'August 1, 2026',
    status: 'Active (Pro Tier)',
    manageUrl: 'https://supabase.com/dashboard/project/xyz-braidbar',
  },
  {
    id: 'sub_3',
    service: 'Vercel / Cloudflare Edge CDN',
    resource: 'Web Hosting & SSL Certificate',
    category: 'Hosting & Infrastructure',
    cycle: 'Monthly',
    cost: '$20.00 / month',
    nextBilling: 'August 5, 2026',
    status: 'Active (SSL Secured)',
    manageUrl: 'https://vercel.com/dashboard',
  },
  {
    id: 'sub_4',
    service: 'Stripe Payment Processing',
    resource: 'Credit Card & Apple Pay Gateways',
    category: 'Payment Gateway',
    cycle: 'Pay-Per-Txn',
    cost: '2.9% + $0.30 per booking',
    nextBilling: 'Daily Auto-Payout',
    status: 'Active (Verified)',
    manageUrl: 'https://dashboard.stripe.com/',
  },
  {
    id: 'sub_5',
    service: 'Square / Cash App Pay',
    resource: 'In-Salon POS & Cash App Pay',
    category: 'Payment Gateway',
    cycle: 'Pay-Per-Txn',
    cost: '2.6% + $0.10 per booking',
    nextBilling: 'Daily Auto-Payout',
    status: 'Active (Verified)',
    manageUrl: 'https://squareup.com/dashboard/',
  },
  {
    id: 'sub_6',
    service: 'WhatsApp Business Dispatch',
    resource: '+1 (973) 972-9864',
    category: 'Client Communications',
    cycle: 'Free',
    cost: '$0.00 / month',
    nextBilling: 'N/A (Included)',
    status: 'Active',
    manageUrl: 'https://business.whatsapp.com/',
  },
];

export async function GET() {
  return NextResponse.json({
    config: infrastructureConfig,
    subscriptions: subscriptionsDirectory,
    databaseStats: {
      status: 'Healthy',
      engine: 'PostgreSQL 15.1',
      tables: [
        { name: 'bookings', rows: 142, size: '2.4 MB' },
        { name: 'services', rows: 12, size: '420 KB' },
        { name: 'products', rows: 8, size: '1.1 MB' },
        { name: 'vendor_applications', rows: 24, size: '680 KB' },
        { name: 'site_media_storage', rows: 118, size: '142 MB' },
      ],
      storageUsedMb: 146.6,
      storageQuotaMb: 500.0,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    infrastructureConfig = { ...infrastructureConfig, ...body };
    return NextResponse.json({
      success: true,
      message: 'Infrastructure configuration updated successfully!',
      config: infrastructureConfig,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update infrastructure configuration' },
      { status: 500 }
    );
  }
}
