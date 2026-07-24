/**
 * Booking API Route
 * =================
 * Handles booking creation and time slot availability queries.
 * In production, connects to Supabase. Currently uses mock data.
 */

import { NextRequest, NextResponse } from 'next/server';

// --- Mock booked slots (in production, query Supabase) ---
const bookedSlots: Record<string, string[]> = {};

/**
 * GET /api/booking?date=2024-01-15
 * Returns available time slots for a given date
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');

  if (!dateStr) {
    return NextResponse.json(
      { error: 'Date parameter is required' },
      { status: 400 }
    );
  }

  const date = new Date(dateStr);
  const dayOfWeek = date.getDay();

  // Sunday — closed
  if (dayOfWeek === 0) {
    return NextResponse.json({ slots: [], message: 'Closed on Sundays' });
  }

  // Generate base slots
  const baseSlots =
    dayOfWeek === 6
      ? ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM']
      : ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

  // Filter out already booked slots
  const booked = bookedSlots[dateStr] || [];
  const available = baseSlots.filter((slot) => !booked.includes(slot));

  return NextResponse.json({ slots: available, date: dateStr });
}

/**
 * POST /api/booking
 * Creates a new booking
 * Body: { serviceId, customerName, customerEmail, customerPhone, date, time, notes? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceId, customerName, customerEmail, customerPhone, date, time, notes } = body;

    // --- Validation ---
    if (!serviceId || !customerName || !customerEmail || !customerPhone || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // --- Check slot availability ---
    const booked = bookedSlots[date] || [];
    if (booked.includes(time)) {
      return NextResponse.json(
        { error: 'This time slot is no longer available' },
        { status: 409 }
      );
    }

    // --- Lookup Service details to get pricing and name ---
    const { services } = require('@/lib/data');
    const service = services.find((s: any) => s.id === serviceId);
    const serviceName = service ? service.name : 'Salon Styling';
    const depositStr = service ? `$${service.deposit_amount}` : '$50.00';
    const totalStr = service ? `$${service.price}` : '$240.00';

    // --- Create booking (mock — in production, insert into Supabase) ---
    const booking = {
      id: `bk-${Date.now()}`,
      service_id: serviceId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      date,
      time,
      notes: notes || '',
      status: 'pending',
      payment_status: 'unpaid',
      created_at: new Date().toISOString(),
    };

    // Mark slot as booked
    if (!bookedSlots[date]) bookedSlots[date] = [];
    bookedSlots[date].push(time);

    // --- Trigger Email Service Dispatch ---
    try {
      const { sendBookingEmail } = require('@/lib/email');
      sendBookingEmail({
        customerName,
        customerEmail,
        serviceName,
        date,
        time,
        deposit: depositStr,
        total: totalStr,
        bookingId: booking.id,
      }).catch((err: any) => console.warn('[API Booking] Email dispatch warning:', err));
    } catch (err) {
      console.warn('[API Booking] Email module error:', err);
    }

    // --- Trigger standalone open-wa worker API ---
    try {
      const WHATSAPP_WORKER_PORT = process.env.WHATSAPP_WORKER_PORT || 5001;
      const API_SECRET = process.env.WHATSAPP_API_SECRET || 'super_secret_braid_token_123';

      console.log(`[API Booking] Triggering open-wa worker at port ${WHATSAPP_WORKER_PORT}...`);
      fetch(`http://localhost:${WHATSAPP_WORKER_PORT}/send-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_SECRET}`,
        },
        body: JSON.stringify({
          customerPhone,
          customerName,
          serviceName,
          date,
          time,
          deposit: depositStr,
          total: totalStr,
        }),
      }).catch(err => {
        console.warn('[API Booking] WhatsApp worker warning (offline or unreachable):', err.message);
      });
    } catch (err) {
      console.warn('[API Booking] Failed to initiate WhatsApp notification fetch:', err);
    }

    return NextResponse.json({ booking, message: 'Booking created successfully' }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
