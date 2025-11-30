'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import ProductCard from "./ProductCard";
import { getProducts } from '@/app/utils/getProducts';
import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaChevronRight } from 'react-icons/fa';

export default function ProductsCarousel({ cols }) {
    const [products, setProducts] = useState([]);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        getProducts().then(setProducts).catch(console.error);
    }, []);
// Wait for refs to mount before enabling navigation
    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
            swiperRef.current.slideToLoop(0, 0); // ensure first slide is selected
        }
    }, [products]); 

    return (
        <div className='bg-gray-100 py-8 px-4 items shadow-md'>
            <h1 className="text-3xl font-bold text-stone-800 mb-4 text-center">Explore Our Best Seller Collection</h1>
            <p className="text-stone-600 text-lg mb-12 text-center">Discover the most popular products chosen by our customers.</p>

            <Swiper
                spaceBetween={20}
                slidesPerGroup={1}
                initialSlide={0}
                onSwiper={(swiper) => swiperRef.current = swiper}
                modules={[Navigation, Pagination, A11y]}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                scrollbar={{ draggable: true }}
                pagination={{ clickable: true }}
                loop={true}
                className='py-16  px-4 bg-stone-50 [&_.swiper-pagination]:mt-8'
                breakpoints={
                    {
                        // small screen
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,

                        },

                        //medium
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 15,

                        },

                        //large
                        1024: {
                            slidesPerView: cols || 3,
                            spaceBetween: 20,

                        }
                    }
                }
                

            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
                {/* Custom Navigation Buttons */}
                <div ref={prevRef} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-amber-500 hover:text-amber-600 hover:scale-105 transition cursor-pointer text-5xl select-none">
                    <FiChevronLeft />
                </div>
                <div ref={nextRef} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-amber-500 hover:text-amber-600 hover:scale-105 transition cursor-pointer text-5xl select-none">
                    <FiChevronRight />
                </div>

            </Swiper>

        </div>
    )
} 