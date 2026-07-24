import wa from '@open-wa/wa-automate';
import express from 'express';
import bodyParser from 'body-parser';

/**
 * The Braid Bar NJ — WhatsApp Worker Service
 * ==========================================
 * A long-running persistent background process that launches a headless
 * Chromium instance to run wa-automate. It exposes a local HTTP endpoint
 * (port 5001) for the Next.js API routes to trigger real-time WhatsApp confirmations.
 */

const app = express();
const PORT = process.env.WHATSAPP_WORKER_PORT || 5001;
const API_SECRET = process.env.WHATSAPP_API_SECRET || 'super_secret_braid_token_123';

app.use(bodyParser.json());

let waClient: any = null;

// Initialize wa-automate WhatsApp Web client
async function initWhatsapp() {
  try {
    console.log('[WhatsApp Worker] Initializing wa-automate Web Client...');
    waClient = await wa.create({
      sessionId: 'braid-bar-nj-session',
      multiDevice: true,
      authTimeout: 60,
      blockCrashLogs: true,
      disableSpins: true,
      headless: true,
      qrTimeout: 0, // Never timeout scanning QR code
    });
    console.log('[WhatsApp Worker] WhatsApp Web client successfully linked and ready! 🚀');
  } catch (err) {
    console.error('[WhatsApp Worker] Error initializing WhatsApp client:', err);
  }
}

// Helper to format raw phone numbers into WhatsApp JID (e.g., '19735550199@c.us')
function formatWhatsappJid(phone: string): string {
  // Remove non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Standardize US numbers: if 10 digits (e.g., 9735550199), prepend US country code '1'
  if (cleaned.length === 10) {
    cleaned = '1' + cleaned;
  }
  
  return `${cleaned}@c.us`;
}

// POST endpoint to trigger sending booking confirmations
app.post('/send-confirmation', async (req: express.Request, res: express.Response) => {
  const authHeader = req.headers.authorization;
  
  // Simple token authorization check
  if (!authHeader || authHeader !== `Bearer ${API_SECRET}`) {
    res.status(401).json({ error: 'Unauthorized secret token' });
    return;
  }

  const {
    customerPhone,
    customerName,
    serviceName,
    date,
    time,
    deposit,
    total,
  } = req.body;

  if (!customerPhone || !customerName || !serviceName || !date || !time) {
    res.status(400).json({ error: 'Missing required parameters' });
    return;
  }

  if (!waClient) {
    res.status(503).json({ error: 'WhatsApp client is offline or initializing' });
    return;
  }

  const jid = formatWhatsappJid(customerPhone);
  
  // High-converting luxury editorial message template
  const message = `✨ *The Braid Bar NJ* ✨
Hello ${customerName},

Your appointment has been successfully secured! Here are your booking details:

💇‍♀️ *Service:* ${serviceName}
📅 *Date:* ${date}
⏰ *Time:* ${time}

💵 *Deposit Paid:* ${deposit} (Non-refundable)
💳 *Remaining Salon Balance:* ${total}

📍 *Location:* West Orange, New Jersey
🚨 *Policy Reminder:* Please arrive with clean, blow-dried hair unless a wash add-on was selected. Late arrivals exceeding 15 minutes may incur fee penalties.

See you soon,
*The Braid Bar NJ Team*
_“Knot just braids, it’s a vibe.”_ 🖤`;

  try {
    console.log(`[WhatsApp Worker] Dispatching confirmation message to JID: ${jid}`);
    await waClient.sendText(jid, message);
    res.status(200).json({ success: true, message: 'WhatsApp message sent successfully' });
  } catch (err) {
    console.error('[WhatsApp Worker] Error sending WhatsApp text:', err);
    res.status(500).json({ error: 'Failed to send WhatsApp message', details: err });
  }
});

// Start Express HTTP Server
app.listen(PORT, () => {
  console.log(`[WhatsApp Worker] API server listening locally on port ${PORT}`);
  initWhatsapp();
});
