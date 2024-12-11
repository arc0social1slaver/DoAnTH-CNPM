import {createSlice} from "@reduxjs/toolkit";
import Swal from "sweetalert2";
const initState = {
    cartItems: []
}
const cartSlice = createSlice ({
    name: 'cart',
    initialState: initState,
    reducers: {
        addToCart: (state, action) => {
            const curItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!curItem) {
                state.cartItems.push(action.payload)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item added successfully",
                    showConfirmButton: true,
                    timer: 1500
                  });
            }
            else {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Item already added",
                    showConfirmButton: true,
                    timer: 1500
                  });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
});
export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export  default cartSlice.reducer;