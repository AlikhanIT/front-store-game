import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")) : [],
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
            }
        },
        removeItem: (state, action) => {
            const remItemPrice = state.items.find(obj => obj._id === action.payload);
            if (state.totalPrice > 0) {
            }
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
})

export const { addItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer