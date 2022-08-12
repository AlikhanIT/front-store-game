import { configureStore } from '@reduxjs/toolkit'
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        postReducer,
        userReducer,
        cartReducer,
    },
})