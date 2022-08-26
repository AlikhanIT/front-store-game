import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../http";

export const fetchCss = createAsyncThunk(
    "css/fetchCss",
    async () => {
      const {data} = await $api.get("/getCss");
      return data;
    }
);

export const fetchCreateCss = createAsyncThunk(
    "css/fetchCreateCss",
    async (params) => {
      const {data} = await $api.post("/create", params);
      return data;
    }
);

const initialState = {
  imageUrl: "",
};

const cssSlice = createSlice({
  name: "css",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchCss.pending]: (state) => {
      state.imageUrl = "";
    },
    [fetchCss.fulfilled]: (state, action) => {
      state.imageUrl = action.payload.imageUrl;
    },
    [fetchCss.rejected]: (state) => {
      state.imageUrl = "";
    },

    [fetchCreateCss.fulfilled]: (state, action) => {
      state.imageUrl = action.payload.imageUrl;
    },
  },
});

export const {} = cssSlice.actions;

export default cssSlice.reducer;
