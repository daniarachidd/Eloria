'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/app/store/cartStore';
import toast from 'react-hot-toast';
import { supabase, getImageUrl } from '@/app/utils/supabaseClient';
import {useUserStore} from '@/app/store/userStore';
import { requireAuth } from '@/app/utils/checkAuth';
import {  Heart } from "lucide-react";
export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useUserStore((state) => state.user);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const imageUrl = getImageUrl(product.image_path);
  useEffect(() => {
  const loadWishlistStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return; 

    const { data, error } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .maybeSingle();  

    if (data) setIsWishlisted(true);
  };

  loadWishlistStatus();
}, [product.id]);

  const handleAddToCart = async () => {
    const user = await requireAuth();
    if (!user) return;

    
    
    if (product.sizes.length > 0) {
      if ( !selectedSize) {
      toast.error('Please select a  size');
      return;
    }
    }

    if (product.colors.length > 0) {
      if (!selectedColor) {
        toast.error('Please select a color');
      }
    }

    const orderItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      image: product.image_path,
      size: selectedSize,
      quantity,
    };

    addToCart(orderItem);
    toast.success(`${product.name} added to cart!`);
  };



  const handleAddToWishlist = async () => {
    const user = await requireAuth();
    if (!user) return;

    if(isWishlisted) {
      //remove
      const {error} = await supabase
      .from('wishlist')
      .delete()
      .eq("user_id", user.id).
      eq("product_id", product.id);

      if (error ) {
        console.log("Error removing from wishlist", error);
      return toast.error("Failed to remove from wishlist");
      }

      setIsWishlisted(false);
      toast.success('Removed from wishlist');
      return;
    }

    //add to wishlist
    const { error} = await supabase.from('wishlist')
    .insert({
      product_id: product.id,
      user_id: user.id,
    }).select();

    if (error) {
      console.log(
        'error adding to wishlist', error
      );
  } else {
    setIsWishlisted(true);
    toast.success(`${product.name} added to wishlist!`);
  }
}
  

  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Images */}
        <div className="w-full p-4 border border-stone-200 rounded-2xl">
          <div className="flex justify-center">
            <Image
              src={imageUrl}
              alt={product.name}
              width={500}
              height={400}
              className="h-auto w-full rounded-lg shadow-md object-contain max-h-[400px]"
            />
          </div>

          {product.image_paths?.length > 0 && (
            <div className="flex justify-center space-x-3 mt-4 overflow-x-auto pb-2">
              {product.image_paths.map((img, index) => (
                <Image
                  key={index}
                  src={getImageUrl(img)}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20 border border-stone-200 object-cover rounded-lg cursor-pointer hover:opacity-80 flex-shrink-0"
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="border border-stone-200 p-5 rounded-2xl">
          <div className="flex justify-between">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800">{product.name}</h1>
            <div className="cursor-pointer" onClick={handleAddToWishlist}>
              <Heart
    className={`w-8 h-8 mb-4 transition ${
      isWishlisted ? "text-amber-600 fill-amber-600" : "text-gray-300"
    }`}
  />
            </div>
          </div>
          <p className="text-lg md:text-xl text-stone-600 font-semibold mt-2">${product.price}</p>
          
          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mt-4">
              <h2 className="text-stone-800 text-sm md:text-base">Available colors</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`px-3 py-1 text-sm text-stone-900 rounded-md border border-stone-300 cursor-pointer hover:opacity-80 transition ${
                      selectedColor === color ? 'bg-stone-900 text-white border-stone-900' : ''
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mt-4">
              <h2 className="text-stone-800 text-sm md:text-base">Available sizes</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className={`px-3 py-1 text-sm text-stone-900 rounded-md border border-stone-300 cursor-pointer hover:opacity-80 transition ${
                      selectedSize === size ? 'bg-stone-900 text-white border-stone-900' : ''
                    }`}
                    onClick={() =>
                      setSelectedSize((prev) => (prev === size ? null : size))
                    }
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mt-5">
            <h2 className="text-stone-800 text-sm md:text-base">Description</h2>
            <p className="text-gray-600 mt-2 text-sm md:text-base leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            {/* Quantity */}
            <div className="flex items-center bg-stone-100 text-neutral-900 px-4 py-2 rounded-lg text-md font-bold uppercase">
              <button
                className="px-2 py-1 rounded-full hover:bg-stone-400 transition"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4 text-center">{quantity}</span>
              <button
                className="px-2 py-1 rounded-full hover:bg-stone-400 transition"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <button
              className="w-full sm:w-auto bg-yellow-500 text-neutral-900 px-4 py-2 rounded-lg text-sm md:text-md font-bold uppercase hover:bg-yellow-600 transition-colors shadow-lg transform hover:scale-105"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
}
