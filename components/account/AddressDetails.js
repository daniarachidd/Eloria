import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { useUserStore } from "@/app/store/userStore";
import AddressCard from "@/components/account/AddressCard";
import ShippingForm from "../forms/ShippingForm";
import { validateShippingInfo } from "@/app/utils/validateShippingInfo";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import toast from 'react-hot-toast';
const AddressDetails = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUserStore();
    const [fieldErrors, setFieldErrors] = useState({});
    const [editingAddress, setEditingAddress] = useState(null);
    const { shippingInfo, setShippingInfo } = useCheckoutStore();




    const handleEditClick = (address) => {
        setEditingAddress(address);
        // Map DB fields → ShippingForm fields
        setShippingInfo({
            firstName: address.first_name || "",
            lastName: address.last_name || "",
            email: address.email || "",
            phoneNumber: address.phone || "",
            country: address.country || "",
            city: address.city || "",
            state: address.state || "",
            zipCode: address.zip_code || "",
            street: address.street || "",
            addressName: address.address_name || "",
            description: address.description || ""
        });

    };


    useEffect(() => {
        if (user?.id) {
            getAddressDetails();
        }
    }, [user]);

    const getAddressDetails = async () => {
        setLoading(true);

        const { data, error } = await supabase.from('user_addresses')
            .select("*")
            .eq("user_id", user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.log('error fetching addresses');
            setLoading(false);
            return;
        }
        setAddresses(data || '');
        setLoading(false);

    }
    const handleEditAddress = async (e) => {
        e.preventDefault();

        const validationErrors = validateShippingInfo(shippingInfo);
        if (Object.keys(validationErrors).length > 0) {
            console.log('Validation errors:', validationErrors);
            setFieldErrors(validationErrors);
            return;
        }

        const updatedAddress = {
            id: editingAddress.id,
            first_name: shippingInfo.first_name,
            last_name: shippingInfo.last_name,
            address_name: shippingInfo.address_name,
            street: shippingInfo.street,
            email: shippingInfo.email,
            phone_no: shippingInfo.phone_no,
            description: shippingInfo.description,
            zip_code: shippingInfo.zip_code,
            city: shippingInfo.city,
            state: shippingInfo.state,
            country: shippingInfo.country,
        };
        console.log('updatedAddress: ' + updatedAddress);

        const { data, error } = await supabase
            .from('user_addresses')
            .update({
                first_name: updatedAddress.first_name,
                last_name: updatedAddress.last_name,
                email: updatedAddress.email,
                address_name: updatedAddress.address_name,
                street: updatedAddress.street,
                phone_no: updatedAddress.phone_no,
                description: updatedAddress.description,
                zip_code: updatedAddress.zip_code,
                city: updatedAddress.city,
                state: updatedAddress.state,
                country: updatedAddress.country

            })
            .eq('id', updatedAddress.id).select();

        if (error) {
            console.log("Error updating address:", error);
            toast.error('Failed to update address, please try again.')
            return;
        } else {
            toast.success('Address updateed Successfully');
        }

        // Update local state
        setAddresses((prev) =>
            prev.map((addr) => (addr.id === data[0].id ? data[0] : addr))
        );
    };

    const handleDeleteAddress = async (id) => {
        const { error } = await supabase
            .from('user_addresses')
            .delete()
            .eq('id', id);

        if (error) {
            console.log("Error deleting address:", error);
            return;
        }

        // Remove from local state
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    };


    if (loading) {
        return <p className="text-center py-10">Loading addresses...</p>;
    }


    return (
        <>

            {editingAddress ? (
                <ShippingForm mode="edit"
                    onContinue={handleEditAddress}
                    fieldErrors={fieldErrors}
                    onDelete={handleDeleteAddress} />
            )
                : (
                    <>
                        {addresses.length === 0 ? (
                            <p className="text-gray-500 text-center">You have no saved addresses.</p>
                        ) : (

                            <>
                                <h1 className="text-2xl md:text-3xl font-semibold mb-10 text-center md:text-left">My Address</h1>
                                <div className="flex flex-col gap-4">

                                    {addresses.map((address) => (
                                        <AddressCard key={address.id} address={address} onEdit={handleEditClick} onDelete={handleDeleteAddress} />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

        </>
    );
}

export default AddressDetails;