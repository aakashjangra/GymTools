import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes.
        // Also, no return statement is required from these functions.

        addToCart: (state, action) => {
            const { id, ...data } = action.payload.product;
            const count = action.payload.quantity;
    
            const existingItem = state.cartItems.find((item) => item.id === id);
            if (existingItem) {
                // If the item already exists in the cart, increase its quantity
                existingItem.quantity += count;
            } else {
                // If the item doesn't exist in the cart, add it with quantity 1
                state.cartItems.push({
                    id,
                    data,
                    quantity: count,
                });
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
