import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            addresses: [],
            setUser: (userData) => set({ user: userData }),
            setToken: (token) => set({ token }),
            setAddresses: (addresses) =>
                set((state) => ({   addresses: [...state.addresses, ...addresses] })),
            clearUser: () => set({ user: null, token: null, addresses: [] }),
        }),
        {
            name: 'user-storage', 
            

        })
    )
