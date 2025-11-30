
import { useCheckoutStore } from '@/app/store/checkoutStore';


const ShippingForm = ({ onContinue, fieldErrors, mode="checkout", onDelete }) => {
    const { shippingInfo, setShippingInfo, saveAddress, setSaveAddress } = useCheckoutStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({ ...shippingInfo, [name]: value });

    }


    return (
        <div className="bg-white text-black shadow-md rounded-xl m-4 sm:m-6 p-4 sm:p-6 tew-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center sm:text-left">
                {`${mode==="checkout" ? "Shipping Address" : "Edit Address"}`}
            </h1>

            <form onSubmit={onContinue} className="flex flex-col gap-4 w-full">
                {/* Name */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* First name */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            name="first_name"
                            placeholder="First Name"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            value={shippingInfo.firstName}
                            onChange={handleChange}
                        />
                        {fieldErrors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>
                        )}

                    </div>
                    {/* Last name */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            name="last_name"
                            placeholder="Last Name"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            value={shippingInfo.lastName}
                            onChange={handleChange} />

                        {fieldErrors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>
                        )}

                    </div>


                </div>
                {/* Email & Phone */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Email */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            value={shippingInfo.email}
                            onChange={handleChange}

                        />
                        {fieldErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                        )}

                    </div>
                    {/* Phone number */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="phone_no" className="text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            name="phone_no"
                            type="tel"
                            inputMode="numeric"
                            maxLength={17}
                            placeholder="+90 555 123 4567"
                            required
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            value={shippingInfo.phone_no}
                            onChange={(e) => {
                                let value = e.target.value;

                                // Remove all non-digit except '+'
                                value = value.replace(/[^\d+]/g, '');

                                // Allow full delete: if user cleared everything, don't reinsert +90
                                // If user deletes everything — keep it empty
                                if (value === '') {
                                    handleChange({ target: { name: 'phone_no', value: '' } });
                                    return;
                                }

                                // If user only typed '+' or '+9' (trying to delete the prefix) → allow it
                                if (value === '+' || value === '+9' || value === '+90') {
                                    handleChange({ target: { name: 'phone_no', value } });
                                    return;
                                }

                                // Ensure it starts with +90
                                if (!value.startsWith('+90')) {
                                    // Remove any leading + or 90 then re-add correctly
                                    value = '+90' + value.replace(/^(\+?90)?/, '');
                                }

                                // Extract the digits after +90 (max 10)
                                const digits = value.replace('+90', '').replace(/\D/g, '').substring(0, 10);

                                // Format as +90 555 555 55 55
                                let formatted = '+90';
                                if (digits.length > 0) formatted += ' ' + digits.substring(0, 3);
                                if (digits.length >= 4) formatted += ' ' + digits.substring(3, 6);
                                if (digits.length >= 7) formatted += ' ' + digits.substring(6, 8);
                                if (digits.length >= 9) formatted += ' ' + digits.substring(8, 10);

                                handleChange({ target: { name: 'phone_no', value: formatted } });
                            }}

                        />
                        {fieldErrors.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.phoneNumber}</p>
                        )}

                    </div>



                </div>

                {/* Address */}
                {/* Country */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="country" className="text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <input
                            name="country"
                            placeholder="Country"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            value={shippingInfo.country}
                            onChange={handleChange}
                        />
                        {fieldErrors.country && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.country}</p>
                        )}
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="city" className="text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            name="city"
                            placeholder="City"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            value={shippingInfo.city}
                            onChange={handleChange}
                        />
                        {fieldErrors.city && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.city}</p>
                        )}
                    </div>

                    {/* State */}
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="state" className="text-sm font-medium text-gray-700">
                            State
                        </label>
                        <input
                            name="state"
                            placeholder="State"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            value={shippingInfo.state}
                            onChange={handleChange}
                        />
                        {fieldErrors.state && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.state}</p>
                        )}
                    </div>

                    {/* Zip code */}
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="zip_code" className="text-sm font-medium text-gray-700">
                            Zip Code
                        </label>
                        <input
                            name="zip_code"
                            type="text"
                            placeholder="Zip Code"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            value={shippingInfo.zip_code}
                            onChange={handleChange}
                        />
                        {fieldErrors.zipCode && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.zipCode}</p>
                        )}
                    </div>

                    {/* address name */}
                    <div className="flex flex-col gap-2 sm:col-span-2">
                        <label htmlFor="street" className="text-sm font-medium text-gray-700">
                            Street Address
                        </label>
                        <input
                            name="street"
                            type="text"
                            placeholder="Street Address"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            value={shippingInfo.street}
                            onChange={handleChange}
                        />
                        {fieldErrors.street && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.street}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 sm:col-span-2">
                        <label htmlFor="Address Name" className="text-sm font-medium text-gray-700">
                            Address Name
                        </label>
                        <input
                            name="address_name"
                            type="text"
                            placeholder="Address Name"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            value={shippingInfo.address_name || ''}
                            onChange={handleChange}
                        />
                        {fieldErrors.addressName && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.addressName}</p>
                        )}
                    </div>

                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="description"
                        className="text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="border border-gray-300 rounded-md p-2 min-h-[80px] focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        onChange={handleChange}
                    />
                </div>


                {/* Save Address Checkbox */}
                {mode === "checkout" && <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        id="saveAddress"
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                        className="w-4 h-4 accent-yellow-500"
                    />
                    <label htmlFor="saveAddress" className="text-gray-700">
                        Save this address for future orders
                    </label>
                </div>}
                {/* Checkout button */}
                { mode === "checkout" && <button
                    type="submit"
                    className="w-full mt-6 bg-yellow-500 text-neutral-900 font-bold uppercase text-lg py-3 px-4 rounded-md hover:bg-yellow-600 active:bg-yellow-600 active:scale-105 shadow-lg transform hover:scale-105 transition"
                >
                    Continue to Payment
                </button>}

                { mode === "edit" && (
                    <div>
                        <button
                            type="submit"
                            className="w-full mt-6 bg-yellow-500 text-neutral-900 font-bold uppercase text-lg py-3 px-4 rounded-md hover:bg-yellow-600 active:bg-yellow-600 active:scale-105 shadow-lg transform hover:scale-105 transition"
                        >
                            Save address
                        </button>

                        <button
                            onClick={() => {onDelete(editingAddress.id)}}
                            className="w-full mt-2 bg-red-700 text-white font-bold uppercase text-lg py-3 px-4 rounded-md hover:bg-red-800 active:bg-red-800 active:scale-105 shadow-lg transform hover:scale-105 transition"
                        >
                            Delete address
                        </button>
                    </div>
                )}


            </form>
        </div>
    );
}
export default ShippingForm;