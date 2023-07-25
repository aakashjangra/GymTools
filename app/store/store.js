import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export default configureStore({
    reducer: {
        cart: cartReducer,
    },
});

// import { create } from "zustand";

// export const useStore = create((set) => ({
//     cart: [],
//     // setCart: (cart) => set({ cart }),
//     // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     // removeAllBears: () => set({ bears: 0 }),
//     addToCart: (product) =>
//         set((state) => {
//             console.log('state is-> ', state.cart);
//             const itemExists = state.cart?.find(
//                 (item) => item.id === product.id
//             );
//             if (itemExists) {
//                 itemExists.quantity++;
//             } else {
//                 state.cart.push({ data: product, id: product.id, quantity: 1 });
//             }
//         }),
//     incrementQuantity: (product) =>
//         set((state) =>  {
//         const item = state.cart.find((item) => item.id === product.id);
//         item.quantity++;
//     }),
//     decrementQuantity: (product) =>
//         set((state) =>  {
//         const item = state.cart.find((item) => item.id === product.id);
//         if (item.quantity === 1) {
//             const index = state.cart.findIndex((item) => item.id === product.id);
//             state.cart.splice(index, 1);
//         } else {
//             item.quantity--;
//         }
//     }),
//     removeFromCart: (productId) =>
//         set((state) =>  {
//         const index = state.cart.findIndex((item) => item.id === productId);
//         state.cart.splice(index, 1);
//     }),
// }));
