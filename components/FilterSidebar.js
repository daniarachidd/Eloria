import { useState, useEffect } from 'react';
import { getCollections } from '@/app/utils/getCollections';
import {useProductStore} from '@/app/store/productStore';
import FilterCard from './FilterCard';
function FilterSidebar({
    selectedCategories, toggleCategory, selectedSubcategories, selectedSizes, toggleSize, toggleSubcategory,
    selectedColors, toggleColor, selectedPriceRanges, togglePriceRange, clearAll
}) {

    const [collections, setCollections] = useState([]);
    const { filters, setFilter, clearAllFilters, fetchProducts } = useProductStore();

    useEffect(() => {
        getCollections().then(setCollections).catch(console.error);

    }, []);
    const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const COLORS = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange'];
    const PRICE_RANGES = [
        { label: '$0 - $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$101 - $200', min: 100, max: 200 },
        { label: '$200 - $500', min: 200, max: 500 },
        { label: '$500+', min: 501, max: Infinity },
    ];

    const handleFilterChange = (type, value) => {
        setFilter(type, value);
        fetchProducts();
    };




    return (
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">

            {/* Header / Reset Button */}
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                {/* Placeholder for a "Clear All" function */}
                <button
                    onClick={() => {
                        clearAllFilters();
                        fetchProducts();
                    }}
                    className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
                    Clear All
                </button>
            </div>

            <FilterCard title="Collection"> 
                <div className="space-y-3">
                    {collections.map((collection) => (

                        <div key={collection.id} >
                            {/* Collection  */}
                            <div className="flex items-center group ">
                                <input
                                    id={`cat-${collection}`}
                                    type="checkbox"
                                    checked={filters.collections.includes(collection.id)}
                                    onChange={() => handleFilterChange('collections', collection.id)}
                                    className="w-4 h-4 text-stone-700 bg-gray-100 border-gray-300 rounded-sm focus:ring-stone-500 cursor-pointer transition-colors"
                                />
                                <label
                                    htmlFor={`cat-${collection}`}
                                    className={`ml-3 text-sm font-medium  transition-colors cursor-pointer ${selectedCategories.includes(collection)
                                            ? 'text-stone-900'
                                            : 'text-gray-600 group-hover:text-stone-800'
                                        }`}
                                >
                                    {collection.title}
                                </label>
                            </div>
                            {/* Subcollections */}
                            {collection.subcollections?.length > 0 && (
                                <div className="ml-6 mt-2 space-y-2">
                                    {collection.subcollections.map((sub) => (
                                        <div key={sub.title} className="flex items-center group ">
                                            <input
                                                id={`sub-${sub.id}`}
                                                type="checkbox"
                                                checked={filters.subcollections.includes(sub.id)}
                                                onChange={() => handleFilterChange('subcollections', sub.id)}
                                                className="w-4 h-4 text-stone-700 bg-gray-100 border-gray-300 rounded-sm focus:ring-stone-500 cursor-pointer transition-colors"
                                            />
                                            <label
                                                htmlFor={`sub-${sub.id}`}
                                                className={`ml-3 text-sm font-medium cursor-pointer transition-colors ${selectedSubcategories.includes(sub.title)
                                                        ? 'text-stone-900'
                                                        : 'text-gray-500 group-hover:text-stone-800'
                                                    }`}
                                            >
                                                {sub.title}
                                            </label>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </FilterCard>

            

            {/* 2. Size Filter */}
            <FilterCard title="Size">
                <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                        <button
                            key={size}
                            onClick={() => handleFilterChange('sizes', size)}
                            className={`flex items-center justify-center px-4 py-2 w-12 text-sm font-semibold rounded-full border transition-all duration-200 shadow-sm ${
                                filters.sizes.includes(size)
                                    ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </FilterCard>

            {/* 3. Color Filter  */}
           <FilterCard title="Color">
            <div className="flex flex-wrap gap-3">
                    {COLORS.map((color) => (
                        <button
                            key={color}
                            onClick={() => handleFilterChange('colors', color)}
                            className={`w-7 h-7 rounded-full border-2 transition-all duration-200 focus:outline-none ${
                                filters.colors.includes(color)
                                    ? 'ring-2 ring-offset-2 ring-stone-900 scale-110 border-white'
                                    : 'border-gray-200 hover:scale-105'
                            }`}
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                        >
                            {/* Empty button for color swatch */}
                        </button>
                    ))}
                </div>
            </FilterCard>

            {/* 4. Price Filter */}
                  <FilterCard title="Price Change">
                  <div className="space-y-3">
                    {PRICE_RANGES.map((range) => (
                        <div key={range.label} className="flex items-center group">
                            <input
                                id={`price-${range.label}`}
                                type="checkbox"
                                checked={filters.priceRanges.some(
                                    (selectedRange) =>
                                        selectedRange.min === range.min &&
                                        selectedRange.max === range.max
                                )}
                                onChange={() => handleFilterChange('priceRanges', range)}
                                className="w-4 h-4 text-stone-700 bg-gray-100 border-gray-300 rounded-sm focus:ring-stone-500 cursor-pointer transition-colors"
                            />
                            <label
                                htmlFor={`price-${range.label}`}
                                className="ml-3 text-sm font-medium text-gray-600 group-hover:text-stone-800 cursor-pointer"
                            >
                                {range.label}
                            </label>
                        </div>
                    ))}
                </div>
            </FilterCard>

        </div>
    );
}
export default FilterSidebar;