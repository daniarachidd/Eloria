
import { useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return toast.error("Passwords don't match");
        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });
        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }

        setLoading(false);
    }

    return (
        <>
              <h1 className="text-2xl md:text-3xl  font-semibold mb-8 text-center md:text-left">Change Password</h1>

        <form onSubmit={handleChangePassword}  className="flex flex-col gap-3 w-full max-w-sm">
            <input
        type="password"
        placeholder="Current password (optional)"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"

      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
                   className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"

      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"

      />
      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-500 hover:bg-yellow-600 uppercase font-bold text-neutral-900 py-3 rounded-md text-md active:bg-yellow-600 active:scale-105 shadow-lg transform hover:scale-105 transition"
      >
        {loading ? 'Changing...' : 'Change Password'}
      </button>
            
        </form>
        </>
    );
}
export default ChangePassword;