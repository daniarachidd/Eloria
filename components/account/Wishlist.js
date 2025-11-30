'use client';
import { useEffect, useState } from "react";
import {getImageUrl, supabase } from "@/app/utils/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("user_wishlist") // ✅ use the view with product details
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
    } else {
      setWishlist(data);
    }
    setLoading(false);
  };

  const removeFromWishlist = async (product_id) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .match({ user_id: user.id, product_id });

    if (error) {
      toast.error("Failed to remove item");
    } else {
      toast.success("Removed from wishlist");
      setWishlist((prev) => prev.filter((item) => item.product_id !== product_id));
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 py-8">Loading your wishlist...</p>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Heart className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg mb-4">Your wishlist is empty.</p>
        <Link
          href="/products"
          className="bg-yellow-500 text-neutral-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-600 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
  <>
    <h1 className="text-2xl md:text-3xl font-semibold mb-10 text-center md:text-left">
      My Wishlist
    </h1>

    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
      {wishlist.map((item) => (
        <div
          key={item.id}
          className="relative group bg-white border border-gray-200 rounded-xl shadow-sm 
          hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          {/* Image */}
          <Link href={`/product/${item.product_id}`}>
            <div className="relative w-full h-60 md:h-64">
              <Image
                src={getImageUrl(item.image_path)}
                alt={item.name}
                fill
                className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-base font-semibold text-neutral-900 line-clamp-1">
              {item.name}
            </h3>

            <p className="text-gray-600 text-sm mt-1">${item.price}</p>

            <button
              className="mt-4 w-full flex items-center justify-center gap-2 bg-yellow-500 
              text-neutral-900 py-2.5 rounded-lg font-semibold text-sm 
              hover:bg-yellow-600 shadow-sm hover:shadow-md transition"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromWishlist(item.product_id)}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full shadow 
            hover:bg-red-100 transition"
          >
            <Heart size={18} className="text-red-500 fill-red-500" />
          </button>
        </div>
      ))}
    </div>
  </>
);

  // );
}

export default Wishlist;