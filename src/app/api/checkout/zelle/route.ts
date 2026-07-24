/**
 * Zelle Verification API Route
 * ==============================
 * Stores Zelle transaction IDs for manual admin verification.
 * Since Zelle has no automated e-commerce API, customers submit
 * their transaction confirmation ID after sending payment.
 */

import { NextRequest, NextResponse } from 'next/server';

// --- In-memory store (in production, use Supabase) ---
interface ZelleSubmission {
  id: string;
  orderId: string;
  zelleTransactionId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'pending_verification' | 'verified' | 'rejected';
  submittedAt: string;
}

const submissions: ZelleSubmission[] = [];

/**
 * POST /api/checkout/zelle
 * Body: { orderId, zelleTransactionId, customerName, customerEmail, amount }
 * Stores a Zelle payment submission for admin verification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, zelleTransactionId, customerName, customerEmail, amount } = body;

    // --- Validation ---
    if (!zelleTransactionId || !customerName || !customerEmail || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: zelleTransactionId, customerName, customerEmail, amount' },
        { status: 400 }
      );
    }

    // --- Check for duplicate submission ---
    const existing = submissions.find((s) => s.zelleTransactionId === zelleTransactionId);
    if (existing) {
      return NextResponse.json(
        { error: 'This transaction ID has already been submitted', submission: existing },
        { status: 409 }
      );
    }

    // --- Store submission ---
    const submission: ZelleSubmission = {
      id: `zl-${Date.now()}`,
      orderId: orderId || `order-${Date.now()}`,
      zelleTransactionId,
      customerName,
      customerEmail,
      amount,
      status: 'pending_verification',
      submittedAt: new Date().toISOString(),
    };

    submissions.push(submission);

    return NextResponse.json({
      submission,
      message: 'Zelle payment submitted for verification. You will receive confirmation once verified.',
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

/**
 * GET /api/checkout/zelle?transactionId=xxx
 * Check the status of a Zelle payment submission
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const transactionId = searchParams.get('transactionId');

  if (!transactionId) {
    return NextResponse.json(
      { error: 'transactionId parameter is required' },
      { status: 400 }
    );
  }

  const submission = submissions.find((s) => s.zelleTransactionId === transactionId);

  if (!submission) {
    return NextResponse.json(
      { error: 'Transaction not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ submission });
}
