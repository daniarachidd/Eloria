import { supabase } from '@/app/utils/supabaseClient';

export async function getCollections() {
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      subcollections (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching collections:', error);
    return [];
  }

  console.log('Fetched collections with subcollections:', data);
  return data;
}
