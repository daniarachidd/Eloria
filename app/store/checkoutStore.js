import { create } from 'zustand';

export const useCheckoutStore = create((set) => ({
  step: 1,
  shippingInfo: {
    first_name: '',
    last_name: '',
    address_name: '',
    email: '',
    phone_no: '',
    city: '',
    state: '',
    zip_code: '',
    description: '',
  },

  setStep: (newStep) => {
    set({ step: newStep });
  },
  setShippingInfo: (info) =>
    set((state) => ({
      shippingInfo: { ...state.shippingInfo, ...info },
    })),
 
  saveAddress: false,
  setSaveAddress: (value) => set({ saveAddress: value }),

}));
