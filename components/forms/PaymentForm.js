'use client';
import { useEffect, useState, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });
    if (error) {
      console.error('Payment error:', error);
      setError(error.message);
      setIsProcessing(false);
      return;
    }
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent);

      

    }
    setIsProcessing(false);
  };

  return (
    <div className="shadow-md rounded-xl m-4 sm:m-6 bg-white text-xl flex flex-col p-4 sm:p-6 text-black max-w-3xl mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 text-center sm:text-left"> Payment details </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="border border-gray-200 rounded-md p-4 sm:p-6">
          <PaymentElement />
        </div>
        
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full mt-4 bg-yellow-500 text-neutral-900 font-bold uppercase text-lg py-3 px-4 rounded-md hover:bg-yellow-600 active:bg-yellow-600  shadow-lg transform hover:scale-105 active:scale-105 transition"      >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}

export default function PaymentForm({ cart }) {
  const [clientSecret, setClientSecret] = useState('');
  const hasCreatedIntent = useRef(false);
  useEffect(() => {
    if (hasCreatedIntent.current) return;
    hasCreatedIntent.current = true;

    const createPaymentIntent = async () => {
      console.log('Creating payment intent...');
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cart }),
        });
        const data = await res.json();
        if (data.error) {
          console.error('Error creating payment intent:', data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        console.error('Error fetching payment intent:', error);
      }
    };
    createPaymentIntent();
  }, []);

  const options = {
     clientSecret,
     appearance: {
      theme: 'flat',
      variables: {
        colorPrimary: '#FBBF24',
        colorBackground: '#FFFFFF',
        colorText: '#111827', 
        borderRadius: '8px',
      }
    } };

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  ) : (
        <div className="text-gray-700 text-center p-6 text-lg">Loading payment form...</div>
  );
}