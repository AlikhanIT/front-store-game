import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import helpReducer from "./slices/helpSlice";
import commentReducer from "./slices/commentSlice";
import cssReducer from "./slices/cssSlice";
import sliderReducer from "./slices/sliderSlice";
import phoneReducer from "./slices/phoneSlice";

export const store = configureStore({
  reducer: {
    postReducer,
    userReducer,
    cartReducer,
    helpReducer,
    commentReducer,
    cssReducer,
    sliderReducer,
    phoneReducer,
  },
});
