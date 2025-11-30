'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/app/utils/supabaseClient';
import toast from 'react-hot-toast';

const PersonalDetails = () => {
  const [profile, setProfile] = useState({ full_name: '' });
  const [loading, setLoading] = useState(true);
  const [phoneError, setPhoneError] = useState("");
  useEffect(() => {
    getProfiles()
  }, []);

  async function getProfiles() {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) console.log(error)
    else setProfile(data);
    setLoading(false);

  }

  async function updateProfile(e) {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    const updates = {
      id: user.id,
      full_name: profile.full_name,
      phone_no: profile.phone_no,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates);
    if (error) toast.error('Error updating profile, please try again!');
    else toast.success('Your profile has been successfully updated.')
  }

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <h1 className="text-2xl md:text-3xl  font-semibold mb-8 text-center md:text-left">My Details</h1>
      <form onSubmit={updateProfile} className="flex flex-col gap-3 w-full max-w-sm">
        <div className=' justify-center items-center gap-2'>
          <label className="text-gray-500"> Full Name </label>
          <input
            type="text"
            placeholder="Full name"
            value={profile.full_name || ''}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
        </div>

        <div className=' justify-center items-center gap-2'>
          <label className="text-gray-500"> Email </label>
          <input
            type="email"
            placeholder="Email"
            value={profile.email || ''}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
        </div>


        <div className=' justify-center items-center gap-2'>
          <label className="text-gray-500"> Phone Number </label>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Phone Number"
            maxLength={17}
            value={profile.phone_no || ''}
            onChange={(e) => {
              let value = e.target.value;

              // Remove all non-digit except "+"
              value = value.replace(/[^\d+]/g, "");

              // Allow clearing the field
              if (value === "") {
                setPhoneError("");
                setProfile({ ...profile, phone_no: "" });
                return;
              }

              // Allow partially typing +90
              if (value === "+" || value === "+9" || value === "+90") {
                setPhoneError("");
                setProfile({ ...profile, phone_no: value });
                return;
              }

              // Ensure it starts with +90
              if (!value.startsWith("+90")) {
                value = "+90" + value.replace(/^(\+?90)?/, "");
              }

              // Extract digits after +90
              const digits = value.replace("+90", "").replace(/\D/g, "").substring(0, 10);

              // Format as: +90 555 555 55 55
              let formatted = "+90";
              if (digits.length > 0) formatted += " " + digits.substring(0, 3);
              if (digits.length >= 4) formatted += " " + digits.substring(3, 6);
              if (digits.length >= 7) formatted += " " + digits.substring(6, 8);
              if (digits.length >= 9) formatted += " " + digits.substring(8, 10);

              setProfile({ ...profile, phone_no: formatted });

              // Validation (only when 10 digits entered)
              if (digits.length === 10) {
                const isValid = /^\+90 \d{3} \d{3} \d{2} \d{2}$/.test(formatted);
                setPhoneError(isValid ? "" : "Invalid phone number format");
              } else {
                setPhoneError("Invalid phone number format");
              }
            }}

            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>


        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 uppercase font-bold text-neutral-900 py-3 rounded-md text-md active:bg-yellow-600 active:scale-105 shadow-lg transform hover:scale-105 transition"
        >
          Save Changes
        </button>
      </form>

    </>
  );
}
export default PersonalDetails