import { createSlice } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const productSlice = createSlice({
    name: "productStore",
    initialState: {
        products: [],
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes.
        // Also, no return statement is required from these functions.
        setProducts:  (state, action) => {
            //READ THE  DATA
            //STORE IN PRODUCTS ARRAY
            state.products = action.payload.products;
            console.log('state0> ', state.products)
        },
    },
});

// Action creators are generated for each case reducer function
export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
