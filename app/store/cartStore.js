import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      cartUpdated: false,

      // addToCart: (item) =>
      //   set((state) => {
          
      //     const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      //     if (existingItem) {
            
      //       return {
      //         cart: state.cart.map((cartItem) =>
      //           cartItem.id === item.id
      //             ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
      //             : cartItem
      //         ),
      //         cartUpdated: true,
      //       };
      //     }         
          
      //     return {
      //       cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
      //       cartUpdated: true,
      //     };
      //   }),

      
      addToCart: (item) =>
  set((state) => {
    const existingItem = state.cart.find((cartItem) => cartItem.productId === item.productId);
    if (existingItem) {
      console.log('Item already in cart, increasing quantity:', item);
      return {
        cart: state.cart.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
        cartUpdated: true,
        
      };
      
    } else {
      console.log('Adding new item to cart:', item);
      return {
        cart: [...state.cart, { ...item, id: item.productId || crypto.randomUUID() }],
        cartUpdated: true,
      };
    }
    
  }),

      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
          cartUpdated: true,
        })),


      clearCart: () => {
        console.log('clearing cart');

        set({ cart: [], cartUpdated: true });
      },

      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
          cartUpdated: true,
        })),

        resetCartUpdated: () => set({cartUpdated: false}),
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        
        state?.resetCartUpdated();
     }
    }
  )
);
