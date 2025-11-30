import {supabase } from '@/app/utils/supabaseClient';

export async function getProducts() {
    const {data, error} = await supabase
    .from('products')
    .select('*')
    .order('created_at', {ascending: false});

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    console.log('Fetched products:', data);
    return data;
}