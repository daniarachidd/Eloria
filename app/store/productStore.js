import { create } from 'zustand';
import { supabase } from '@/app/utils/supabaseClient';
export const useProductStore = create((set, get) => ({
  products: [],

  filters: {
    collections: [],
    subcollections: [],
    colors: [],
    sizes: [],
    priceRanges: [],
  },

  setFilter: (type, value) => {
    const current = get().filters[type];
    set({
      filters: {
        ...get().filters,
        [type]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
  },

  clearAllFilters: () => set({
    filters: {
      collections: [],
      subcollections: [],
      colors: [],
      sizes: [],
      priceRanges: [],
    }
  }),

  fetchProducts: async () => {
    const { filters } = get();
    let query = supabase.from('products').select(`
      *,
      subcollections (
        title,
        collection_id,
        collections (title)
      )
    `);
    // Apply filters

    if (filters.subcollections.length > 0) {
      query = query.in('subcollection_id', filters.subcollections);
    }
    if (filters.collections.length > 0) {
      const { data: subcols } = await supabase
        .from('subcollections')
        .select('id')
        .in('collection_id', filters.collections);
      const subcollectionIds = subcols.map(sc => sc.id);
      query = query.in('subcollection_id', subcollectionIds);
    }
    if (filters.colors.length > 0) {
      query = query.overlaps('colors', filters.colors);
    }

    if (filters.sizes.length > 0) {
      query = query.overlaps('sizes', filters.sizes);
    }
    if (filters.priceRanges.length > 0) {
      const orConditions = filters.priceRanges
        .map(range => `price.gte.${range.min},price.lte.${range.max}`)
        .join(',');
      query = query.or(orConditions);
    }

    const { data, error } = await query;
    if (!error) set({ products: data });

  },
  setProducts: (products) => set({ products: products || [] })
}));