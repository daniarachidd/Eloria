'use client';
import { useCartStore } from "@/app/store/cartStore";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import OrderSummaryItem from "./OrderSummaryItem";
const OrderSummary = () => {
    const cartItems = useCartStore((state) => state.cart);
    const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const step = useCheckoutStore((state) => state.step);
    
    return (
        <div className="shadow-md rounded-xl m-4 sm:m-6 border bg-white border-stone-200 text-xl flex flex-col p-4 sm:p-6 text-black items-center justify-center w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left"> Order Summary </h2>

            <div className="flex flex-col gap-4 w-full">
                {cartItems.map((item) => (
                    <OrderSummaryItem key={item.id} item={item} />
                ))}
            </div>
            {/* Divider */}
            <div className="w-full h-[1px] bg-stone-300 my-4"></div>

            {/* Subtotal */}
            <div className="flex justify-between text-base sm:text-lg font-medium w-full">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-base sm:text-lg font-medium w-full">
                <span>Shipping</span>
                <span>${(subTotal * 0.1).toFixed(2)}</span>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-stone-300 my-4"></div>

            {/* Total */}
            <div className="flex justify-between text-base sm:text-lg font-medium w-full">
                <span>Total</span>
                <span>${(subTotal * 1.1).toFixed(2)}</span>
            </div>
            

        </div>
    );
}
export default OrderSummary;