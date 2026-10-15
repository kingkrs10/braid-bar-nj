import { NextResponse } from 'next/server';
import {
  SALON_INFO,
  SERVICES_CATALOG,
  SALON_POLICIES,
  ADMIN_TECHNICAL_GUIDE,
  CLIENT_SYSTEM_PROMPT,
  ADMIN_SYSTEM_PROMPT,
} from '@/lib/salon-ai-knowledge';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Smart local fallback matcher for 100% offline/free uptime without external API keys
function getSmartFallbackResponse(query: string, role: 'client' | 'admin'): string {
  const q = query.toLowerCase();

  if (role === 'admin') {
    if (q.includes('price') || q.includes('service') || q.includes('catalog')) {
      return `### ✂️ How to Update Service Pricing & Catalog
1. Click the **Service Catalog** tab in the admin sidebar.
2. Find the style (e.g., Knotless, Fulani, Locs) or click **+ Add New Service**.
3. Adjust the **Base Price**, **Duration (hours)**, or description.
4. Click **Save Changes & Publish Live**. The updates will immediately sync to your booking page.`;
    }

    if (q.includes('photo') || q.includes('image') || q.includes('picture') || q.includes('lookbook') || q.includes('text')) {
      return `### 📸 How to Update Site Photos & Text
1. Navigate to the **Site Text & Images** tab in the sidebar.
2. To replace a photo, find the target image slot (Hero, Lookbook, or Salon Sanctuary) and click **Replace Photo** or paste the new image URL.
3. To update text, edit the headline or paragraph in the corresponding input box.
4. Click **Save Changes & Publish Live** at the top right to deploy your edits.`;
    }

    if (q.includes('coming soon') || q.includes('live') || q.includes('launch') || q.includes('preview')) {
      return `### 🚀 Managing Site Launch & Preview Mode
- **Master Launch Toggle**: Located on the **Overview** tab in \`/admin\`. You can flip between **🔴 COMING SOON MODE** and **🟢 LIVE PRODUCTION MODE** with one click.
- **Owner Preview**: While in Coming Soon mode, only visitors see the countdown splash. You (Sharon) can preview and test the full live site anytime by navigating to **[https://braidbarnj.com/?preview=true](https://braidbarnj.com/?preview=true)**.`;
    }

    if (q.includes('email') || q.includes('mailgun') || q.includes('resend') || q.includes('receipt')) {
      return `### 📩 Booking Confirmation Email Diagnostics
- Email templates are sent via **Mailgun** or **Resend** (configured in \`src/lib/email.ts\`).
- Automated receipts are sent from \`appointments@braidbarnj.com\` whenever a client completes a deposit.
- **Verify Credentials**: Check your Vercel project settings to ensure \`MAILGUN_API_KEY\` or \`RESEND_API_KEY\` is populated.`;
    }

    if (q.includes('remind') || q.includes('draft') || q.includes('message') || q.includes('text')) {
      return `### 📱 Suggested Client Appointment Reminder Text
*"Hi [Client Name]! This is Sharon from The Braid Bar NJ confirming your appointment for [Style Name] on [Date] at [Time].*

*Gentle reminder: Please arrive with your hair freshly washed, completely detangled, and blown out straight from roots to ends with NO heavy oils or waxes.*

*📍 Location: 560 Valley Road, West Orange, NJ. Looking forward to crowning you! ✨"*`;
    }

    if (q.includes('passcode') || q.includes('code') || q.includes('lock')) {
      return `### 🔒 Admin Security Details
- The owner passcode to unlock the \`/admin\` portal is **592**.
- You can lock the admin session anytime by clicking **🔒 Lock Admin Portal (Code: 592)** in the bottom of the sidebar.`;
    }

    return `### 👋 Welcome to the Salon Operations Copilot!
I am your dedicated technical and salon management assistant. You can ask me:
- **"How do I update service pricing or add a new style?"**
- **"How do I change lookbook photos or website headlines?"**
- **"How do I switch the website between Coming Soon and Live mode?"**
- **"Draft a hair prep reminder message to text a client"**
- **"How do I set up my free Google Gemini API key?"** (Get free unlimited queries at [aistudio.google.com](https://aistudio.google.com))`;
  }

  // CLIENT ROLE FALLBACKS:
  if (q.includes('prep') || q.includes('wash') || q.includes('ready') || q.includes('clean') || q.includes('rule')) {
    return `### ✨ Hair Preparation Guidelines
To ensure your protective styling session is flawless, tension-free, and timely, please follow our salon prep ritual:
1. **Freshly Washed**: Wash your hair clean within 24 hours of your appointment.
2. **Blown Out Straight**: Fully detangle and blow dry your hair straight from root to end with a comb attachment.
3. **No Heavy Products**: Please do not apply heavy greases, butters, or oils prior to arrival. We apply lightweight organic scalp elixirs during your service.

*(Need us to wash your hair? Select the **"Organic Scalp Wash, Steam & Blow Out"** add-on when booking!)*`;
  }

  if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('rate') || q.includes('menu')) {
    return `### 💇‍♀️ Signature Protective Styles & Pricing
- **VIP Private Braid Bar Experience**: $400.00 *(Private 1-on-1 session with Sharon, scalp detox, steam hydration & styling)*
- **Signature Fulani Braids**: $325.00 *(Artisanal feed-in patterns & knotless back)*
- **Knotless Box Braids (Smedium)**: $275.00
- **Knotless Box Braids (Medium / Large)**: $240.00 – $260.00
- **Loc Retwist & Crown Care**: $150.00
- **Bohemian / Boho Curls Add-on**: +$50.00 – $75.00
- **Wash, Steam & Blow Dry**: $75.00

*A 25% non-refundable deposit is required at booking to hold your chair.* [Click here to book your session](/book).`;
  }

  if (q.includes('deposit') || q.includes('pay') || q.includes('card') || q.includes('zelle') || q.includes('cash app')) {
    return `### 💳 Deposit & Payment Policies
- **Deposit**: A **25% deposit** is required online when scheduling your appointment to reserve your stylist and chair.
- **Balance Payment**: The remaining balance is paid at the salon after your crown is completed.
- **Accepted Payments**: We gladly accept Visa, Mastercard, American Express, Apple Pay, Cash App Pay, and Zelle.`;
  }

  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('direction') || q.includes('parking')) {
    return `### 📍 Location & Parking
- **Address**: **560 Valley Road, West Orange, NJ 07052** (Inside Apple Butter Boutique).
- **Parking**: Convenient parking is available directly adjacent to the building along the Valley Road business corridor.
- **Transit**: Easily accessible from Route 280, Garden State Parkway, and local NJ Transit bus lines.`;
  }

  if (q.includes('book') || q.includes('appointment') || q.includes('schedule') || q.includes('availability')) {
    return `### 📅 Ready to Book Your Crown?
You can reserve your protective styling appointment directly on our website!
👉 **[Click Here to Schedule an Appointment](/book)**

Select your service, choose your preferred stylist and date, and secure your session with a 25% deposit. We look forward to welcoming you!`;
  }

  if (q.includes('knotless') || q.includes('fulani') || q.includes('loc') || q.includes('boho')) {
    return `### 👑 Our Signature Braiding Techniques
- **Knotless Braids**: Done with a seamless feed-in technique that eliminates heavy knot tension at the scalp, promoting hair retention and painless installation.
- **Fulani Braids**: Striking tribal cornrow geometry framing the face paired with flowing knotless braids in the back.
- **Boho Goddess Tendrils**: Luxe curly strands woven throughout the braids for texture and volume.

Ready to view our work? Check out the **[Lookbook Gallery](/#lookbook)** or **[Book Now](/book)**!`;
  }

  return `### ✨ Welcome to The Braid Bar NJ
I am your **Crown Concierge**! How can I assist you with your protective styling journey today?

Here are some helpful things you can ask me:
- **"What are the hair prep requirements?"**
- **"How much are Knotless Braids or Fulani styles?"**
- **"Where is the salon located and what is parking like?"**
- **"How do deposits and payments work?"**

Or tap **[Book an Appointment](/book)** to select your date and time!`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages = [], role = 'client' } = body;

    const userMessage = messages[messages.length - 1]?.content || '';
    const geminiApiKey = process.env.GEMINI_API_KEY;

    // 1. If Gemini API key is available, query Google Gemini (100% Free Tier: 1,500 requests/day)
    if (geminiApiKey && userMessage.trim()) {
      try {
        const systemPrompt = role === 'admin' ? ADMIN_SYSTEM_PROMPT : CLIENT_SYSTEM_PROMPT;

        const contents = [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nUser Question:\n${userMessage}` }],
          },
        ];

        // Gemini 2.0 Flash / 1.5 Flash REST endpoint
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.6,
                maxOutputTokens: 800,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            return NextResponse.json({
              reply: aiText,
              provider: 'Google Gemini 2.0 Flash (Free Tier)',
            });
          }
        }
      } catch (geminiError) {
        console.error('Gemini API query error, falling back to local intelligence:', geminiError);
      }
    }

    // 2. Intelligent local knowledge fallback (Zero configuration, 100% free forever)
    const reply = getSmartFallbackResponse(userMessage, role);

    return NextResponse.json({
      reply,
      provider: geminiApiKey ? 'Gemini/Local Hybrid' : 'Salon Knowledge Engine (100% Free)',
    });
  } catch (error) {
    console.error('AI chat endpoint error:', error);
    return NextResponse.json(
      { reply: 'I apologize, but I encountered a momentary connection issue. Please feel free to call our salon directly at (551) 339-3637 or visit our booking page.' },
      { status: 500 }
    );
  }
}
