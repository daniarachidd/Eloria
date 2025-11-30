'use client';
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useProductStore} from "@/app/store/productStore";
import FilterSidebar from "@/components/FilterSidebar";
import { useSearchParams } from 'next/navigation';


export default function ProductsPage() {  
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { products, filters, fetchProducts, setFilter, clearAllFilters } = useProductStore();
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const subcollectionId = searchParams.get('subcollection');
    const searchQuery = searchParams.get("search");

useEffect(() => {
  if (subcollectionId) {
    setFilter('subcollections', subcollectionId);
  }
  if (searchQuery) {
    setFilter("search", searchQuery);  
  }
}, [subcollectionId]);
useEffect(() => {
     console.log("Current filters:", filters);
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    loadProducts();
  }, [filters]);

    useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isSidebarOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isSidebarOpen]);




    return (
        <main className="min-h-screen" style={{ backgroundColor: '#faf9f7' }}>
            <div className="grid grid-cols-1 md:grid-cols-4">
                {/* Sidebar Toggle Button  */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="z-50 md:hidden fixed bottom-6 right-6 flex items-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-full shadow-xl hover:shadow-2xl hover:bg-stone-800 active:scale-95 transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 10h12M10 16h4" />
                    </svg>
                    <span className="font-medium">Filters</span>
                </button>


                {/* Filter Sidebar */}

                <div
                    className={`fixed inset-0 mt-16 md:mt-2 z-40 p-6 md:relative md:col-span-1
                        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
                        ${isSidebarOpen ? "transition-transform duration-300" : "transition-none"}
                        md:translate-x-0 md:transform-none md:transition-none`}
                    style={{overflowY: isSidebarOpen ? "auto" : "hidden"}}
                >

                    
                    
                    <FilterSidebar
                        selectedCategories={filters.collections}
                        toggleCategory={(value) => setFilter('collections', value)}
                        selectedSizes={filters.sizes}
                        toggleSize={(value) => setFilter('sizes', value)}
                        selectedColors={filters.colors}
                        toggleColor={(value) => setFilter('colors', value)}
                        selectedPriceRanges={filters.priceRanges}
                        togglePriceRange={(value) => setFilter('priceRanges', value)}
                        selectedSubcategories={filters.subcollections}
                        toggleSubcategory={(value) => setFilter('subcollections', value)}
                        clearAll={clearAllFilters} />
                </div>

                {/* Product grid (3 columns on desktop) */}
                <div className="md:col-span-3 grid grid-cols-1 items-start auto-rows-fr md:grid-cols-2 mt-4 gap-6">
                    { loading? (
                        <p> Loaing products ...</p>
                    ) : (
                        products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    )) )}
                </div>



            </div>


        </main>
    );

}



