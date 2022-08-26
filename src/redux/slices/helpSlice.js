import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../http";

export const fetchHelps = createAsyncThunk(
    "helps/fetchHelps",
    async () => {
        const {data} = await $api.get("/helps");
        return data;
    }
);

export const fetchInstructs = createAsyncThunk(
    "helps/fetchInstructs",
    async () => {
        const {data} = await $api.get("/instructs");
        return data;
    }
);

export const fetchCreateHelp = createAsyncThunk(
    "helps/fetchCreateHelp",
    async (params) => {
        const {data} = await $api.post("/helps", params);
        return data;
    }
);

export const fetchCreateInstruct = createAsyncThunk(
    "helps/fetchCreateInstruct",
    async (params) => {
        const {data} = await $api.post("/instructs", params);
        return data;
    }
);

export const fetchDeleteHelp = createAsyncThunk(
    "helps/fetchDeleteHelp",
    async (id) => {
        const {data} = await $api.delete(`/helps?id=${id}`);
        return data;
    }
);

export const fetchDeleteInstruct = createAsyncThunk(
    "helps/fetchDeleteInstruct",
    async (id) => {
        const {data} = await $api.delete(`/instructs?id=${id}`);
        return data;
    }
);

export const fetchEditHelp = createAsyncThunk(
    "helps/fetchEditHelp",
    async (params) => {
        const {data} = await $api.patch(`/helps?id=${params.id}`, params);
        return data;
    }
);

export const fetchEditInstruct = createAsyncThunk(
    "helps/fetchEditInstruct",
    async (params) => {
        const {data} = await $api.patch(`/instructs?id=${params.id}`, params);
        return data;
    }
);


const initialState = {
    status: true,
    isLoading: true,
    items: [],
};

const helpSlice = createSlice({
    name: "help",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: {
        [fetchHelps.pending]: (state) => {
            state.items = [];
            state.isLoading = true;
        },
        [fetchHelps.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [fetchHelps.rejected]: (state) => {
            state.items = [];
            state.isLoading = true;
        },


        [fetchInstructs.pending]: (state) => {
            state.items = [];
            state.isLoading = true;
        },
        [fetchInstructs.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [fetchInstructs.rejected]: (state) => {
            state.items = [];
            state.isLoading = true;
        },

        [fetchDeleteInstruct().fulfilled]: (state, action) => {
            state.items = state.items.filter(
                (item) => item._id !== action.payload._id
            );
        },

        [fetchDeleteHelp.fulfilled]: (state, action) => {
            state.items = state.items.filter(
                (item) => item._id !== action.payload._id
            );
        },
    },
});

export const {changeStatus} = helpSlice.actions;

export default helpSlice.reducer;
