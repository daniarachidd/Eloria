'use client'
import { useState } from "react";
import ProductCard from "./ProductCard";
import products from "../app/data/products.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

function BestSeller() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const cardsPerSlide = 3;
    const totalSlides = Math.ceil(products.length / cardsPerSlide);

    // Group products into slides
    const slides = [];
    for (let i = 0; i < products.length; i += cardsPerSlide) {
        slides.push(products.slice(i, i + cardsPerSlide));
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
    };

    return (
        <section className="flex flex-col items-center justify-center py-16 px-4 bg-stone-50">
            <h1 className="text-3xl font-bold text-stone-800 mb-4">Explore Our Best Seller Collection</h1>
            <p className="text-stone-600 text-lg mb-12 text-center">Discover the most popular products chosen by our customers.</p>

            {/* Carousel Container */}
            <div className="relative w-full max-w-6xl">
                <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0 flex justify-center gap-6">
                            {slide.map((product) => (
                                <ProductCard key={product.id} product={{
                                    ...product,
                                    price: `$${product.price.toFixed(2)}`
                                }} />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Carousel Navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-stone-800 text-white shadow-lg rounded-full p-3 hover:bg-stone-700 transition-colors"
                    disabled={totalSlides <= 1}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-stone-800 text-white shadow-lg rounded-full p-3 hover:bg-stone-700 transition-colors"
                    disabled={totalSlides <= 1}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Pagination Dots */}
            {totalSlides > 1 && (
                <div className="flex justify-center mt-8 space-x-3 ">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-200 ${
                                currentSlide === index 
                                    ? 'bg-stone-800 scale-110' 
                                    : 'bg-stone-300 hover:bg-stone-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default BestSeller;