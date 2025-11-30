import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import { getImageUrl } from "@/app/utils/supabaseClient";
export default function CartItem({ item, onQuantityChange }) {
    // const [quantity, setQuantity] = useState(item.quantity);
    const cartItems = useCartStore((state) => state.cart);
const removeFromCart = useCartStore((state) => state.removeFromCart);
const updateQuantity = useCartStore((state) => state.updateQuantity);

const quantity = cartItems.find((cartItem) => cartItem.id === item.id)?.quantity || 0;
    const imageUrl = getImageUrl(item.image);

    const handleDecrement = () => {
        if (quantity > 1) {
            
            updateQuantity(item.id, quantity  -1 );
        }
    };

    const handleIncrement = () => {
        updateQuantity(item.id, quantity + 1);
    }

    const handleDelete = () => {
        removeFromCart(item.id);
        // onQuantityChange(item.id, 0); // Notify parent about deletion
    }

    return (
        <div
            key={item.id}
            className="flex space-x-4 border-b pb-4 hover:bg-stone-50 transition"
        >
            <div className="relative w-16 h-20 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-amber-600 font-medium">
                        ${item.price.toFixed(2)}
                    </p>
                </div>

                <div className="flex gap-2 mt-1">
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <span className="text-sm text-gray-500">•</span>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                </div>

                {/* Quantity Adjuster & Delete */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-sm font-medium text-gray-700">QTY</p>
                        <button
                            onClick={handleDecrement}
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            -
                        </button>
                        <span className="px-4 py-1 border rounded text-gray-700">
                            {quantity}
                        </span>
                        <button
                            onClick={handleIncrement}
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            +
                        </button>
                    </div>


                    <button className="text-stone-900 tracking-wider underline hover:text-amber-500 uppercase font-medium text-sm" onClick={handleDelete}>delete</button>

                </div>

            </div>
        </div>
    );
}
