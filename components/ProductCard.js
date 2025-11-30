'use client';
import Image from 'next/image';
import {getImageUrl} from '@/app/utils/supabaseClient';
import {useRouter} from 'next/navigation';

function ProductCard({ product }) {
    const imageUrl = getImageUrl(product.image_path);
    const router = useRouter();
    
     const handleClick = () => {
    router.push(`/products/${product.id}`, { scroll: true });

    // store product in sessionStorage before navigating
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
  };
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-80 h-[480px] bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                
                {/* Product Image Area */}
                <div className="w-full h-full bg-pink-50 flex items-center justify-center relative" onClick={handleClick}>
                    {product?.image_path ? (
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            
                            width={300}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-pink-300 font-medium text-sm">
                            No Image Available
                        </div>
                    )}
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-yellow-400 text-gray-800 text-sm font-bold px-3 py-1 rounded-full shadow-md">
                        ${product.price}
                    </div>
                </div>

                
            </div>

            {/* Product Info Area */}
                <div className="p-5 flex flex-col items-start">
                    <h2 className="text-xl font-bold text-center text-gray-800 truncate w-full mb-1">{product.name}</h2>
                    <p className="text-sm text-center text-gray-500 line-clamp-3 leading-snug">{product.description}</p>
                </div>
        </div>
    );
}

export default ProductCard;