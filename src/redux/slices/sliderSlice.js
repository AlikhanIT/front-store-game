import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import $api, {BACK_URL} from "../http";

export const fetchSlider = createAsyncThunk(
    "slider/fetchSlider",
    async () => {
        const {data} = await $api.get("/slider");
        return data;
    }
);

export const fetchCreateSlider = createAsyncThunk(
    "slider/fetchCreateSlider",
    async (params) => {
        const {data} = await $api.post("/slider", params);
        return data;
    }
);

export const fetchDeleteSlider = createAsyncThunk(
    "slider/fetchDeleteSlider",
    async (id) => {
        const {data} = await $api.delete(`/slider?id=${id}`);
        return data;
    }
);

const initialState = {
    data: [],
    isLoading: true,
};

const cssSlice = createSlice({
    name: "slider",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSlider.pending]: (state) => {
            state.isLoading = true;
            state.data = "";
        },
        [fetchSlider.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload.map((obj) => (
                {...obj, image: `${BACK_URL}` + obj.image }
            ));;
        },
        [fetchSlider.rejected]: (state) => {
            state.isLoading = true;
            state.data = "";
        },

        [fetchCreateSlider.fulfilled]: (state, action) => {
            state.data.push(action.payload);
        },

        [fetchDeleteSlider.fulfilled]: (state, action) => {
            state.data = state.data.filter(
                (item) => item._id !== action.payload._id
            );
        },
    },
});

export const {} = cssSlice.actions;

export default cssSlice.reducer;
