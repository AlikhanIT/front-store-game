import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../http";

export const fetchPhone = createAsyncThunk(
    "phone/fetchPhone",
    async () => {
      const {data} = await $api.get("/phone");
      return data;
    }
);

export const fetchCreatePhone = createAsyncThunk(
    "phone/fetchCreatePhone",
    async (params) => {
      const {data} = await $api.post("/phone", params);
      return data;
    }
);

const initialState = {
  phone: "88005553535",
};

const phoneSlice = createSlice({
  name: "phone",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchPhone.pending]: (state) => {
      state.phone = "";
    },
    [fetchPhone.fulfilled]: (state, action) => {
      state.phone = action.payload.text;
    },
    [fetchPhone.rejected]: (state) => {
      state.phone = "";
    },

    [fetchCreatePhone.fulfilled]: (state, action) => {
      state.phone = action.payload.text;
    },
  },
});

export const {} = phoneSlice.actions;

export default phoneSlice.reducer;
