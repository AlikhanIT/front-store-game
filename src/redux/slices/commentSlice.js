import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../http";

export const fetchComments = createAsyncThunk(
    "comments/fetchHelps",
    async () => {
        const {data} = await $api.get("/comments");
        return data;
    }
);

export const fetchCreateComment = createAsyncThunk(
    "comments/fetchCreateHelp",
    async (params) => {
        const {data} = await $api.post("/comments", params);
        return data;
    }
);

export const fetchDeleteComment = createAsyncThunk(
    "comments/fetchDeleteHelp",
    async (id) => {
        const {data} = await $api.delete(`/comments?id=${id}`);
        return data;
    }
);

export const fetchEditComment = createAsyncThunk(
    "comments/fetchEditComment",
    async (params) => {
        const {data} = await $api.patch(`/comments?id=${params.id}`, params);
        return data;
    }
);

const initialState = {
    isLoading: true,
    items: [],
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.items = [];
            state.isLoading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [fetchComments.rejected]: (state) => {
            state.items = [];
            state.isLoading = true;
        },

        [fetchCreateComment.fulfilled]: (state, action) => {
            state.items.push(action.payload);
        },

        [fetchEditComment.fulfilled]: (state, action) => {
            state.items = state.items.filter(
                (item) => item._id !== action.payload._id
            );
            state.items.push(
                action.payload
            );
        },

        [fetchDeleteComment.fulfilled]: (state, action) => {
            state.items = state.items.filter(
                (item) => item._id !== action.payload._id
            );
        },
    },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
