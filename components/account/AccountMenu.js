import { FaUser, FaShoppingBag, FaCog, FaHeart, FaSignOutAlt, FaChevronCircleDown, FaKey, FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';
import { supabase } from "@/app/utils/supabaseClient";
const AccountMenu = ({ onClick }) => {
    const [selectedMenu, setSelectedMenu] = useState('Profile');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const menuItems = [
        // { name: 'Profile', icon: <FaUser /> },
        // { name: 'My Address', icon: <FaMapMarkerAlt /> },
        { name: 'My Orders', icon: <FaShoppingBag /> },
        { name: 'My Wishlist', icon: <FaHeart /> },
        { name: 'Account Settings', icon: <FaCog /> },
        { name: 'Logout', icon: <FaSignOutAlt /> },
    ];

    const settingMenuItems = [
        { name: 'Personal Details', icon: <FaUser /> },
        { name: 'Change Password', icon: <FaKey /> },
        { name: 'Saved Addresses', icon: <FaMapMarkerAlt /> },

    ]
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setMessage('You have been logged out.');
    };

    const handleMenuClick = (menuItem) => {
        if (menuItem === "Account Settings") {
            setIsSettingsOpen(prev => !prev);
        } 
        if (menuItem === "Logout") {
            handleLogout();
        }

        setSelectedMenu(menuItem);
        onClick(menuItem);
    }
    return (
        <div className="flex flex-col items-start justify-center rounded-md p-4 shadow-md">
            {menuItems.map((item) => (

                <div key={item.name} className="w-full">
                    <div
                        onClick={() => handleMenuClick(item.name)}
                        className={`w-full flex items-center cursor-pointer transition mb-2 px-3 py-2 rounded-md ${selectedMenu === item.name
                            ? 'bg-amber-100 text-yellow-500'
                            : 'text-neutral-700 hover:text-yellow-500'
                            }`}                >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                        {item.name === 'Account Settings' && (
                            <FaChevronCircleDown
                                className={`ml-auto transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        )}
                    </div>
                    {/* Submenu */}
                    {item.name === 'Account Settings' && isSettingsOpen && (
                        <div className="ml-6 mt-2 flex flex-col space-y-1">
                            {settingMenuItems.map((subItem) => (
                                <div
                                    key={subItem.name}
                                    onClick={() => handleMenuClick(subItem.name)}
                                    className={`flex items-center cursor-pointer px-3 py-1 rounded-md text-neutral-700 hover:text-yellow-500 ${selectedMenu === subItem.name ? 'bg-amber-50 text-yellow-500' : ''
                                        }`}
                                >
                                    <span className="mr-2 text-sm">{subItem.icon}</span>
                                    <span className="text-sm">{subItem.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>



            ))}
        </div>
    );
};

export default AccountMenu;