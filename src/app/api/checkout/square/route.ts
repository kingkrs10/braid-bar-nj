/**
 * Square/Cash App Pay API Route
 * ==============================
 * Processes payment tokens from the Square Web Payments SDK (Cash App Pay).
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/checkout/square
 * Body: { token, amount, referenceId? }
 * Processes a Cash App Pay token via Square Payments API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, amount, referenceId } = body;

    if (!token || !amount) {
      return NextResponse.json(
        { error: 'Token and amount are required' },
        { status: 400 }
      );
    }

    // --- Check for Square credentials ---
    const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
    if (!squareAccessToken) {
      // Return mock response for development
      return NextResponse.json({
        paymentId: 'sq_mock_' + Date.now(),
        status: 'COMPLETED',
        message: 'Mock payment (Square not configured)',
        mock: true,
      });
    }

    // --- Process real payment via Square API ---
    const response = await fetch('https://connect.squareup.com/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${squareAccessToken}`,
        'Square-Version': '2024-01-18',
      },
      body: JSON.stringify({
        source_id: token,
        idempotency_key: `${referenceId || 'order'}-${Date.now()}`,
        amount_money: {
          amount: Math.round(amount * 100), // Square expects cents
          currency: 'USD',
        },
        location_id: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        reference_id: referenceId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.errors?.[0]?.detail || 'Payment failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      paymentId: data.payment.id,
      status: data.payment.status,
    });
  } catch (error: unknown) {
    console.error('Square error:', error);
    const message = error instanceof Error ? error.message : 'Payment processing failed';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
