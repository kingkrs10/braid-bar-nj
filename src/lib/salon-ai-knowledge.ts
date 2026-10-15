/**
 * The Braid Bar NJ — Comprehensive Salon & Technical Knowledge Base
 * =================================================================
 * Used by the AI Concierge (for clients) and the AI Salon Copilot (for admins/Sharon).
 */

export const SALON_INFO = {
  name: "The Braid Bar NJ",
  boutique: "Apple Butter Boutique",
  owner: "Sharon French",
  title: "Owner, Master Stylist & Natural Hair Specialist",
  address: "560 Valley Road, West Orange, NJ 07052",
  phone: "+1 (551) 339-3637",
  altPhone: "+1 (973) 972-9864",
  email: "braidbar1nj@gmail.com",
  appointmentEmail: "appointments@braidbarnj.com",
  website: "https://braidbarnj.com",
  adminUrl: "https://braidbarnj.com/admin",
  ownerPasscode: "592",
  hours: {
    tuesdayToSaturday: "9:00 AM – 7:00 PM",
    sunday: "By VIP Private Appointment Only",
    monday: "Closed (Rest & Education)",
  },
  amenities: [
    "Private luxury VIP styling suite",
    "Complimentary organic herbal tea & espresso bar",
    "High-speed Wi-Fi & laptop charging station for remote work",
    "Ergonomic luxury styling chairs for long protective sessions",
    "Gentle scalp tension-free technique and scalp care",
  ],
};

export const SERVICES_CATALOG = [
  {
    name: "VIP Private Braid Bar Experience",
    price: "$400.00",
    duration: "6–7 hrs",
    description: "Exclusive 1-on-1 private salon session with Sharon French. Includes customized hair scalp analysis, organic detox wash, deep steam conditioning treatment, precision blow-dry, and signature knotless or custom design with complimentary refreshments.",
  },
  {
    name: "Signature Fulani Braids",
    price: "$325.00",
    duration: "5–6 hrs",
    description: "Intricate forward and backward cornrow patterns with individual knotless box braids in the back. Includes clean geometric grid partings and optional gold/wooden bead embellishments.",
  },
  {
    name: "Knotless Box Braids (Smedium)",
    price: "$275.00",
    duration: "5 hrs",
    description: "Seamless, tension-free box braids that start naturally at the root with your real hair. Featherweight feel with zero headache tension.",
  },
  {
    name: "Knotless Box Braids (Medium / Large)",
    price: "$240.00 – $260.00",
    duration: "4–5 hrs",
    description: "Classic clean square or triangle grid parts with sleek, long-lasting protective plaits.",
  },
  {
    name: "Boho / Bohemian Goddess Curls (Add-on)",
    price: "+$50.00 – $75.00",
    duration: "+45 mins",
    description: "Human hair or premium synthetic deep-wave curly tendrils delicately fed into knotless or feed-in braids for an effortless island glow.",
  },
  {
    name: "Loc Retwist & Crown Care",
    price: "$150.00",
    duration: "2.5 hrs",
    description: "Thorough organic residue-free wash, herbal hot towel scalp treatment, palm-rolled neat root maintenance, and protective styling.",
  },
  {
    name: "Organic Scalp Wash, Steam & Blow Out",
    price: "$75.00",
    duration: "1.5 hrs",
    description: "Deep clarifying cleanse, therapeutic steam hydration infusion, and blowout to prep natural textures for protective styling.",
  },
];

export const SALON_POLICIES = {
  prepRules: [
    "HAIR MUST BE CLEAN: Freshly washed within 24 hours of your appointment.",
    "BLOW DRY STRAIGHT: Hair must be completely detangled and blown out straight from roots to ends with a comb attachment.",
    "NO HEAVY OILS: Avoid heavy butters, greases, or oils prior to arrival (we apply professional lightweight scalp elixirs during your service).",
    "PRE-SERVICE WASH ADD-ON: If you prefer us to wash and blow out your hair, please select the 'Wash, Steam & Blow Out' add-on when booking.",
  ],
  bookingAndDeposit: [
    "A 25% non-refundable deposit is required at booking to secure your appointment slot.",
    "The remaining balance is due chair-side upon service completion.",
    "Accepted in-salon payment methods: Major Credit/Debit Cards, Apple Pay, Cash App Pay, or Zelle.",
  ],
  lateAndCancellation: [
    "15-Minute Grace Period: Please contact us immediately if you are running behind.",
    "Arrivals after 15 minutes may incur a $25 late fee or need to be rescheduled to protect the next client's schedule.",
    "48 Hours Notice is required for cancellations or date transfers.",
  ],
  parkingAndDirections: [
    "Location: 560 Valley Road, West Orange, NJ 07052.",
    "Street parking and dedicated lot parking are available directly adjacent to the boutique building.",
    "Located in the vibrant Valley Road corridor, easily accessible via Route 280, Garden State Parkway, and NJ Transit bus stops.",
  ],
};

export const ADMIN_TECHNICAL_GUIDE = {
  passcode: "592",
  comingSoonMode: "Controlled on the Admin Overview tab. When OFF (Coming Soon), visitors see a VIP launch splash page. When ON (Live Mode), visitors can freely book and browse. Owner can bypass anytime via braidbarnj.com/?preview=true.",
  editingContent: "Go to the 'Site Text & Images' tab in /admin. You can edit announcement headlines, brand text, service descriptions, and replace photo URLs. Click 'Save Changes & Publish Live' when done.",
  servicePricing: "Go to the 'Service Catalog' tab in /admin. You can edit prices, duration, add new braids, or toggle visibility.",
  emailSetup: "Automated booking receipts are sent via Mailgun/Resend in src/lib/email.ts. Ensure MAILGUN_API_KEY or RESEND_API_KEY is present in your Vercel project environment settings.",
  freeGeminiKey: "To power this AI with infinite free requests, get a free API key at https://aistudio.google.com and add GEMINI_API_KEY to your environment variables. It allows 1,500 free queries every single day ($0 cost).",
};

export const CLIENT_SYSTEM_PROMPT = `
You are the "Crown Concierge", the official luxury virtual assistant for The Braid Bar NJ located in West Orange, New Jersey.
Salon Owner & Lead Stylist: Sharon French (Master Braider & Natural Hair Specialist).
Salon Address: 560 Valley Road, West Orange, NJ 07052.
Phone: +1 (551) 339-3637.
Website: https://braidbarnj.com.

BRAND TONE:
- Sophisticated, warm, encouraging, and luxurious with a 90's Vogue high-fashion aesthetic.
- You celebrate textured hair, protective styling, healthy scalp rituals, and clean precision parts.
- Keep answers clear, friendly, and concise (2-4 brief paragraphs or clean bullet points).

YOUR CORE RESPONSIBILITIES:
1. Explain braid styles, pricing, and timing (Knotless, Fulani, Boho, Locs, VIP experience).
2. Clearly explain Hair Prep Rules (hair must be washed clean, completely detangled, and blown out straight from roots to ends with NO heavy grease/oil).
3. Explain deposit requirements (25% deposit required online to secure slot, balance paid in person).
4. Provide directions and parking info for 560 Valley Road, West Orange, NJ.
5. Guide clients to book at https://braidbarnj.com/book.
`;

export const ADMIN_SYSTEM_PROMPT = `
You are the "Salon Ops & Technical Copilot" for Sharon French and the administrators of The Braid Bar NJ.
You are embedded inside the secured /admin portal.
Your job is to assist the salon owner with both daily salon operations and website management.

ADMIN PASSCODE: 592
SALON LOCATION: 560 Valley Road, West Orange, NJ 07052.

YOUR CAPABILITIES:
1. Website Technical Support:
   - Explain how to edit site text, announcement banners, and lookbook images in the 'Site Text & Images' tab.
   - Explain how to toggle between 'Coming Soon Mode' and 'Live Production Mode' on the Overview tab.
   - Explain how Sharon can preview the full website anytime using 'braidbarnj.com/?preview=true'.
   - Explain how to add or adjust service prices in the 'Service Catalog' tab.
   - Explain that automated booking emails use Mailgun/Resend and where to check environment variables.
2. Salon Operations & Client Communication:
   - Draft polite, professional text/WhatsApp reminders for clients (e.g. hair prep reminders, deposit confirmations).
   - Help calculate revenue, booking percentages, and chair schedules.
   - Assist in formulating salon policies (grace period, deposits, wash add-ons).

TONE:
Supportive, direct, knowledgeable, executive, and encouraging. Always provide clear step-by-step instructions.
`;
