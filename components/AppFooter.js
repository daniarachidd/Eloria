'use client'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
const AppFooter = () => {
    return (
        <footer className="bg-stone-900 text-gray-300 border-t border-stone-700 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <h2 className="text-3xl font-serif tracking-widest uppercase text-white"> Eloria </h2>
                    <p className="mt-4 text-gray-400 text-sm leading-relaxed"> Elevate your lifestyle with curated pieces designed for timeless elegance. </p>

                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-6">
                        
                        <Link href="#" className="hover:text-amber-400 transition-colors"><FaFacebookF className="w-5 h-5" /> </Link>
                        <Link href="#" className="hover:text-amber-400 transition-colors"><FaTwitter className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-amber-400 transition-colors"><FaInstagram className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-amber-400 transition-colors"><FaLinkedinIn className="w-5 h-5" /></Link>
                    </div>
                </div>


                {/* Shop */}
                <div>
                    <h3 className="text-lg text-white font-medium mb-4 uppercase tracking-wider">
                        Shop
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
                        <li><Link href="/products" className="hover:text-amber-400 transition-colors">New Arrivals</Link></li>
                        
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-lg text-white font-medium mb-4 uppercase tracking-wider">
                        Customer Care
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/account" className="hover:text-amber-400 transition-colors">My Account</Link></li>
                        <li><Link href="/account?menu=My%20Orders" className="hover:text-amber-400 transition-colors">Orders & Shipping</Link></li>
                        <li><Link href="/account?menu=My%20Wishlist" className="hover:text-amber-400 transition-colors">Wishlist</Link></li>
                        
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg text-white font-medium mb-4 uppercase tracking-wider">
                        Stay Updated
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Subscribe to our newsletter for exclusive offers.
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-3 py-2 rounded-l-lg bg-stone-800 text-gray-300 focus:outline-none"
                        />
                        <button className="px-4 py-2 bg-amber-500 text-black font-medium rounded-r-lg hover:bg-amber-400">
                            Join
                        </button>
                    </div>
                </div>
            </div>
            {/* Bottom Bar */}
            <div className="border-t border-stone-700">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Eloria. All rights reserved.</p>
                    <div className="flex space-x-6 mt-2 md:mt-0">
                        <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-amber-400 transition-colors">Contact</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}

export default AppFooter;