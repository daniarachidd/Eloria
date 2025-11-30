'use client';
import { useState, useEffect, Suspense } from "react";
import { supabase } from "../utils/supabaseClient";
import AccountMenu from "@/components/account/AccountMenu";
import PersonalDetails from "@/components/account/PersonalDetails";
import OrderHistory from "@/components/account/OrderHistory";
import { useUserStore } from "@/app/store/userStore";
import Wishlist from '@/components/account/Wishlist';
import ChangePassword from "@/components/account/ChangePassword";
import AddressDetails from "@/components/account/AddressDetails";
import { useSearchParams } from "next/navigation";

export default function AccountPage() {
    const searchParams = useSearchParams();
    const menuFromUrl = searchParams.get("menu");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);
    // const [user, setUser] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(menuFromUrl || 'Profile');
    const [isMenuView, setIsMenuView] = useState(true);

    const { user, setUser } = useUserStore();
    useEffect(() => {
        // Check if there's a logged-in user
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setUser(data.session.user);
            }
        };
        getSession();
        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setUser(session.user);
            } else {
                setUser(null);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) setMessage(error.message);
            else setMessage('Sign up successful! Please check your email to confirm your account.');
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setMessage(error.message);
            else {
                setMessage('Login successful! Welcome back.');
                setUser(supabase.auth.getUser());
            }
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setMessage('You have been logged out.');
    };


    const renderContent = () => {
        switch (selectedMenu) {
            case 'Personal Details':
                return (
                    <PersonalDetails />
                );
            case 'My Orders':
                return (
                    <OrderHistory />
                );

            case 'My Wishlist':
                return (
                    <Wishlist />
                );
            case 'Change Password':
                return (
                    <ChangePassword />
                );
            case 'Saved Addresses':
                return (
                    <AddressDetails />
                )
            default:
                return <p>Select a menu item to view details.</p>;
        }
    };


    if (user) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <div className="hidden md:flex flex-col md:flex-row justify-center md:mt-8 mx-4 md:mx-20 max-w-6xl w-full">
                    {/* Left Column: Account Menu */}
                    <div className="md:w-1/3 mx-2 md:mr-6 mb-6 md:mb-0">
                        <AccountMenu onClick={(menu) => setSelectedMenu(menu)} />
                    </div>

                    {/* Right Column: Dynamic Content */}
                    <div className="hidden md:block md:w-2/3 bg-white text-neutral-900 rounded-md p-6 shadow-md">
                        {<div className="flex flex-col  min-h-screen px-4 sm:px-6 md:px-10 py-4 text-neutral-900">
                            {renderContent()}
                        </div>}
                    </div>
                </div>

                {/* // Mobile View */}
                <div className="block md:hidden w-full p-4">
                    {isMenuView ? (
                        <AccountMenu
                            onClick={(menu) => {
                                setSelectedMenu(menu);
                                // Only switch to content view for REAL pages
                                const isParentMenu = menu === "Account Settings";
                                if (!isParentMenu) {
                                    setIsMenuView(false);
                                }
                            }}
                        />
                    )
                        : (
                            <div className="bg-white text-neutral-900 rounded-md p-4 shadow-md relative">
                                <button
                                    onClick={() => setIsMenuView(true)}
                                    className="absolute top-2 left-2 text-yellow-600 font-semibold text-sm"
                                >
                                    ← Back
                                </button>
                                <div className="mt-6 ">{renderContent()}</div>
                            </div>
                        )}


                </div>
            </Suspense>
        );
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col items-center min-h-screen p-6 text-black">
            <h1 className="text-2xl font-semibold mb-6 text-neutral-900">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 items-center flex justify-center flex-col text-black">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full mt-6 bg-yellow-500 text-neutral-900 font-bold uppercase text-lg py-3 px-4 rounded-md hover:bg-yellow-600 active:bg-yellow-600 active:scale-105 shadow-lg transform hover:scale-105 transition"
                >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
            </form>

            <p className="mt-4 text-sm">
                {isSignUp ? 'Already have an account?' : 'No account yet?'}{' '}
                <button onClick={() => setIsSignUp(!isSignUp)} className="underline">
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>

            {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
        </div>
        </Suspense>
    );
}