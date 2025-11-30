import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {

  
    try {
      const { items , existingPaymentIntentId} = await request.json();

    // Validate `items`
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid items array' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

// Calculate the total amount
    const totalAmount = items.reduce((sum, i) => {
      if (!i.price || !i.quantity) {
        throw new Error('Each item must have a price and quantity');
      }
      return sum + i.price * i.quantity;
    }, 0);
    const totalAmountInCents = Math.round(totalAmount * 100);
    if (existingPaymentIntentId) {
       try {
        const updatedIntent = await stripe.paymentIntents.update(existingPaymentIntentId, {
          amount: totalAmountInCents,
        });
        return new Response(
          JSON.stringify({ clientSecret: updatedIntent.client_secret }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.log('error updating payment intent:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to update payment intent' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmountInCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    } catch (error) {
      console.error('Error creating payment intent: ', error);
      return new Response(
        JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    
      );
    }

}