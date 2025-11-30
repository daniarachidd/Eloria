import {create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useOrderStore = create(persist((set) => ({
    orders: [],
    currentOrder: null,

    addOrder: (order) => set((state) => ({ orders: [...state.orders, order], currentOrder: order })),

    setCurrentOrder: (order) => set({ currentOrder: order }),
    clearCurrentOrder: () => set({ currentOrder: null }),

}),
{name: 'order-storage'}
));