/**
 * Stripe Checkout API Route
 * ==========================
 * Creates a Stripe PaymentIntent for processing credit/debit and Apple Pay.
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/checkout/stripe
 * Body: { amount, currency?, description?, metadata? }
 * Returns: { clientSecret }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'usd', description, metadata } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // --- Check for Stripe secret key ---
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey || stripeSecretKey.startsWith('sk_test_placeholder')) {
      // Return a mock response for development
      return NextResponse.json({
        clientSecret: 'pi_mock_secret_' + Date.now(),
        message: 'Mock payment intent (Stripe not configured)',
        mock: true,
      });
    }

    // --- Create real PaymentIntent with Stripe ---
    const stripe = require('stripe')(stripeSecretKey);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency,
      description: description || 'Braid Bar purchase',
      metadata: metadata || {},
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: unknown) {
    console.error('Stripe error:', error);
    const message = error instanceof Error ? error.message : 'Payment processing failed';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
