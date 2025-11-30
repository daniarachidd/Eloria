import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const payment_intent = searchParams.get('payment_intent');

  if (!payment_intent) {
    return NextResponse.json({ error: 'Missing payment_intent' }, { status: 400 });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    return NextResponse.json({ paymentIntent });
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
