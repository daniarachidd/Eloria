import Image from "next/image";
import {getImageUrl} from "@/app/utils/supabaseClient";
import { useCartStore } from "@/app/store/cartStore";
export default function OrderSummaryItem({ item}) {
   
    const cartItems = useCartStore((state) => state.cart);
const imgUrl = getImageUrl(item.image);
const quantity = cartItems.find((cartItem) => cartItem.id === item.id)?.quantity || 0;




    return (
        <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-3 sm:gap-4 pb-4 border-b border-stone-200 last:border-b-0 hover:bg-stone-50 transition w-full rounded-lg p-2 sm:p-3"
        >   
            {/* Image Section */}
            <div className="relative w-full sm:w-20 h-40 sm:h-24 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                    src={imgUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
                {/* Quantity Badge */}
                <div className="absolute top-1 right-2 bg-yellow-500 text-white sm:text-sm text-xs font-bold w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center rounded-full shadow-sm">
                    {quantity}
                </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <p className="font-medium text-base sm:text-lg text-gray-800">{item.name}</p>
                    <p className="text-yellow-600 font-semibold text-sm sm:text-base">
                        ${item.price.toFixed(2)}
                    </p>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>


                

            </div>
        </div>
    );
}
