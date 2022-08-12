import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")) : [],
    totalPrice: +window.localStorage.getItem("carttotalPrice") ? JSON.parse(+window.localStorage.getItem("carttotalPrice")) : 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            if (state.items.find((item) => item._id === action.payload._id)) {
                console.warn("Товар уже в корзине");
            } else {
                state.items.push(action.payload);
                state.totalPrice += +action.payload.price;
            }
        },
        removeItem: (state, action) => {
            const remItemPrice = state.items.find(obj => obj._id === action.payload);
            state.totalPrice -= +remItemPrice.price;
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
})

export const { addItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer