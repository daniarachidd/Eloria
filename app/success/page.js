'use client';
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";

export default function SuccessPage() {
  const params = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);
  const cartItems = useCartStore((state) => state.cart);
  const hasSavedOrder = useRef(false);
  const [hydrated, setHydrated] = useState(false);
  console.log('Cart items on success page:', cartItems);
useEffect(() => {
    const unsub = useCartStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // If already hydrated
    if (useCartStore.persist.hasHydrated()) setHydrated(true);

    return () => unsub();
  }, []);

  useEffect(() => {
     if (!hydrated || hasSavedOrder.current) return;
    
    hasSavedOrder.current = true;

    if (cartItems.length === 0) {
      console.warn("Cart still empty after hydration");
      return;
    }


    // const currentItems = [...cartItems];
    // console.log('Current cart items:', currentItems);

    const saveOrder = async () => {
      console.log('Saving order...');
      const paymentIntentId = params.get('payment_intent');
      if (!paymentIntentId) return;

      // Fetch payment intent from your backend (to get amount, status)
      const res = await fetch(`/api/retrieve-payment-intent?payment_intent=${paymentIntentId}`);
      const { paymentIntent } = await res.json();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: order, error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            total_amount: paymentIntent.amount / 100,
            status: paymentIntent.status,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error saving order:', error);
        return;
      }
      console.log('Saved order:', order);
      console.log('cart items:', cartItems);


      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }
      )
      );

      const { data: insertedItems, error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) {
        console.error('Error saving order items:', itemsError);
      } else {
        console.log('Order items saved successfully:', insertedItems);
      }
      clearCart();
    };

    saveOrder();
  }, [cartItems, params, clearCart]);



  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      <p className="text-lg text-gray-700 mb-8">
        Thank you for your purchase! Your order has been placed successfully.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-yellow-500 text-neutral-900 font-bold rounded-md hover:bg-yellow-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
