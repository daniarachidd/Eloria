'use client';
import { useState } from "react";
import OrderSummary from "@/components/OrderSummary";
import ShippingForm from "@/components/forms/ShippingForm";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { useCartStore } from "@/app/store/cartStore";
import { useUserStore } from "@/app/store/userStore";
import PaymentForm from "@/components/forms/PaymentForm";
import { supabase } from "@/app/utils/supabaseClient";
import toast from 'react-hot-toast';
import { validateShippingInfo } from "@/app/utils/validateShippingInfo";

const CheckoutPage = () => {
    const { step, setStep, shippingInfo, saveAddress } = useCheckoutStore();
    const { cart } = useCartStore();
    const [fieldErrors, setFieldErrors] = useState({});
    const { user } = useUserStore();


    async function saveAddressToDB(shippingInfo, userId) {
       
        const { data, error } = await supabase.from('user_addresses')
            .insert([
                {
                    user_id: userId,
                    first_name: shippingInfo.first_name,
                    last_name: shippingInfo.last_name,
                    email: shippingInfo.email,
                    phone_no: shippingInfo.phone_no,
                    country: shippingInfo.country,
                    city: shippingInfo.city,
                    state: shippingInfo.state,
                    zip_code: shippingInfo.zip_code,
                    street: shippingInfo.street,
                    description: shippingInfo.description,
                    address_name: shippingInfo.address_name || '',
                }
            ])
            .select();

        if (error) {
            if (error.code === "23505") {
                toast.error('Address already exists, skipping.');
            }
            toast.error('Unable to save address, please try again.');
            throw error;
        } else {
            toast.success('Address successfully saved');
        }

        return data;


    }

    const handleContinue = async (event) => {
        event.preventDefault();

        // Validation logic
        const errors = validateShippingInfo;
       

        // If there are errors, update the state and stop the process
        if (Object.keys(errors).length > 0) {
            console.log('Validation errors:', errors);
            setFieldErrors(errors);
            return;
        }

        if (saveAddress) {
            try {
            await saveAddressToDB(shippingInfo, user.id);
        } catch (error) {
            toast.error("Failed to save address");
            return;
        }
        }

        setFieldErrors({});
        setStep(2);

    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-6">

            <div className="flex-1">
                {step === 1 &&

                    <ShippingForm onContinue={handleContinue} fieldErrors={fieldErrors} />

                }
                {step === 2 && <PaymentForm cart={cart} />}
            </div>

            <div className="w-full lg:w-1/3 sticky top-20 self-start">
                <OrderSummary />

            </div>
        </div>
    );
}

export default CheckoutPage;