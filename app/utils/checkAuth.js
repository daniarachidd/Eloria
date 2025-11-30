import { supabase } from "@/app/utils/supabaseClient";
import toast from "react-hot-toast";

export async function requireAuth() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    toast.error("Please sign in to continue");
    return null;
  }

  return user;
}
