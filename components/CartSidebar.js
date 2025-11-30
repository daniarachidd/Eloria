'use client';
import { X } from "lucide-react";
import { useCartStore } from "../app/store/cartStore";
import CartItem from "./CartItem";



export default function CartSidebar({ isOpen, onClose }) {
  const cartItems = useCartStore((state) => state.cart);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Implement checkout logic here
    window.location.href = "/checkout";
    console.log("Proceeding to checkout...");
  }
  return (
    <div
      className={`fixed inset-0 z-[9999] ${isOpen ? "visible" : "invisible"}`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0  bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      {/* <div
        className={`absolute right-0 top-0 h-full w-100 bg-white text-stone-900 shadow-2xl 
        transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      > */}
       <div
    className={`fixed right-0 top-0 h-screen w-full sm:w-[420px] bg-white text-stone-900 shadow-2xl
    transform transition-transform duration-300 ease-in-out 
    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
  >
        {/* Cart Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold tracking-wide uppercase">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="overflow-y-auto h-[calc(100%-180px)] p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>

        {/* Cart Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-4 bg-white">
          <div className="flex justify-between mb-3 text-sm">
            <span>Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <button className="uppercase tracking-wider w-full bg-stone-900 text-white py-2 rounded-md hover:bg-amber-600 transition" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
