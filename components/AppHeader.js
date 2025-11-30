
'use client'
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Collections from "./Collections";
import { useState, useEffect } from "react";
import CartSidebar from "./CartSidebar";
import { useCartStore } from "@/app/store/cartStore";
import {useRouter} from "next/navigation";

function AppHeader() {
    const router = useRouter();

    const [showCollections, setShowCollections] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [animateCart, setAnimateCart] = useState(false);

    const openCart = () => setShowCart(true);
    const closeCart = () => setShowCart(false);

    
    const cartUpdated = useCartStore((state) => state.cartUpdated);
    const resetCartUpdated = useCartStore((state) => state.resetCartUpdated)
    const cart = useCartStore((state) => state.cart);

    useEffect(() => {
        if (cartUpdated) {

            setAnimateCart(true);

            const timer = setTimeout(() => {

                setAnimateCart(false);
                resetCartUpdated();
            }, 600); // reset after 0.6s
            return () => clearTimeout(timer);
        }
    }, [cartUpdated]);


    const toggleCollections = () => {
        setShowCollections(!showCollections);
    }

    const closeCollections = () => {
        setShowCollections(false);
    }

    const toggleMobileMenu = () => {
        setShowMobileMenu((prev) => !prev);
    }

    const toggleShowSearch = () => {
        setShowSearch((prev) => !prev);
    }

    const handleSearch = () => {
        if (searchQuery.trim() === '') return;
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        setShowSearch(false);
        setSearchQuery('');

    }

    return (
        <header className="fixed left-0 top-0 w-full z-50 shadow-lg bg-stone-900 text-white backdrop-blur-md">

            {/* Top Bar: Logo and Icons */}
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* Hamburger Menu Button */}
                <button
                    className="p-3 md:hidden hover:text-amber-400 transition-colors"
                    onClick={toggleMobileMenu}
                >
                    {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}

                </button>
                <h1
                    className={`text-3xl font-serif font-light tracking-widest uppercase 
              ${showSearch ? 'hidden' : 'block'} 
              md:block`}
                >
                    Eloria
                </h1>

                {/* Icons on the right */}
                <div className="flex items-center space-x-6">
                    {showSearch && (
                        <input
                            type="text"
                            value={searchQuery}
                            className="w-full h-full px-4 py-2 rounded-xl bg-stone-700 focus:outline-none"
                            placeholder="Search products..."
                             onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown = {(e) => {
                                if (e.key === "Enter") handleSearch();

                            }}
                        />
                    )}

                    <button
                        className="flex items-center space-x-2 text-sm hover:text-amber-400 active:text-amber-300 transition-colors"
                        onClick={toggleShowSearch}
                    >
                        <Search className="w-5 h-5" />
                        
                    </button>
                    <button className="flex items-center space-x-2 text-sm hover:text-amber-400 transition-colors"
                        onClick={() => window.location.href = '/account'}
                    >
                        <User className="w-5 h-5" />
                    </button>

                    <button
                        className={
                            `relative hover:text-amber-400 transition-transform ${animateCart ? "animate-bounce" : ""
                            }`}
                        onClick={openCart}>
                        <ShoppingCart className="w-6 h-6" />
                        {/* Cart Count Badge */}
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </button>


                </div>
            </div>

            {/* Desktop Bottom Bar Navigation */}
            <nav className=" bg-stone-800 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <ul className="flex justify-center space-x-12">
                        <li><a href="/" className="text-sm uppercase tracking-wider font-medium hover:text-amber-400 transition-colors">Home</a></li>

                        <li><a href="/products" className="text-sm uppercase tracking-wider font-medium hover:text-amber-400 transition-colors">New Arrivals</a></li>
                        <li>
                            <button
                                className="text-sm uppercase tracking-wider font-medium hover:text-amber-400 transition-colors"
                                onClick={toggleCollections}
                            >
                                Collections
                            </button>
                        </li>
                        {/* <li><a href="/sale" className="text-sm uppercase tracking-wider font-medium text-amber-500 hover:text-white transition-colors" >Sale</a></li> */}
                    </ul>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {showMobileMenu && (
                <div className={`md:hidden bg-white text-neutral-900 fixed left-0 z-100 h-screen w-full transform transition-transform duration-300 ease-in-out ${showMobileMenu ? "translate-x-0" : "-translate-x-full"
                    }`}>
                        {/* <h2 className="text-xl font-serif tracking-widest uppercase text-neutral-900"> Eloria </h2> */}

                    <ul className="flex flex-col px-4 space-y-4 py-6">
                        <li className="font-serif tracking-widest uppercase font-bold"> Eloria</li>
                        <li>
                            <a
                                href="/"
                                className="text-sm uppercase tracking-wider font-medium"
                                onClick={toggleMobileMenu}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/products"
                                className="text-sm uppercase tracking-wider font-medium"
                                onClick={toggleMobileMenu}
                            >
                                New Arrivals
                            </a>
                        </li>
                        <li>
                            <button
                                className="text-sm uppercase tracking-wider font-medium"
                                onClick={() => {
                                    toggleCollections();
                                    toggleMobileMenu();
                                }}
                            >
                                Collections
                            </button>
                        </li>
                        
                    </ul>



                    {/* social media icons */}
                    <div className="flex ml-4 space-x-4 mt-8">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-900"
                        >
                            <FaFacebookF className="w-5 h-5" />
                        </a>
                        <FaTwitter className="w-5 h-5" />
                        <FaInstagram className="w-5 h-5 hover:text-amber-500" />
                        <FaLinkedinIn className="w-5 h-5" />

                    </div>
                </div>

            )}

            {showCollections && (
                <Collections key={Collections.title} open={showCollections} closeCollections={closeCollections} />
            )}

            <CartSidebar isOpen={showCart} onClose={closeCart} />
        </header>
    );
}

export default AppHeader;
