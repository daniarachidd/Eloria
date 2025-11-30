'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useProductStore } from '@/app/store/productStore';
import { getProducts } from '@/app/utils/getProducts';
import ProductDetails from '@/components/ProductDetails';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products, setProducts } = useProductStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() { 
      
      if (products.length > 0) {
        
        const found = products.find((p) => p.id === id);
        if (found) {
          setProduct(found);
          setLoading(false);
          return;
        }
      }

      //  fallback if user refreshed or came directly
      try {
        const data = await getProducts();
        setProducts(data);
        const found = data.find((p) => p.id === parseInt(id));
        setProduct(found);
      } catch (err) {
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id, products, setProducts]);

  if (loading) return <div className="p-10 text-center text-neutral-900">Loading product...</div>;
  if (!product) return <div className="p-10 text-center text-neutral-900">Product not found.</div>;

  return <ProductDetails product={product} />;
}
