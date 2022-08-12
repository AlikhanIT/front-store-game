import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from "../http";

export const fetchPostTitles = createAsyncThunk(
    'posts/fetchPostTitles',
    async () => {
        const {data} = await $api.get("/alltitles");
        return data;
    }
)

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (params) => {
        const {asc, page, sort} = params;
        const {data} = await $api.get(`/posts/${sort}/${asc}/${page}/3`);
        return data;
    }
)

export const fetchOnePost = createAsyncThunk(
    'posts/fetchOnePost',
    async (id) => {
        const {data} = await $api.get(`/post/${id}`);
        return data;
    }
)

export const fetchCreatePost = createAsyncThunk(
    'posts/fetchCreatePost',
    async (params) => {
        const {data} = await $api.post(`/posts`, params);
        return data;
    }
)

export const fetchEditPost = createAsyncThunk(
    'posts/fetchEditPost',
    async ({ id, text, title, price, imageUrl }) => {
        const {data} = await $api.patch(`/posts/edit/${id}`, {imageUrl, title, text, price});
        return { id, text, title, price, imageUrl };
    }
)

export const fetchRemovePost = createAsyncThunk(
    'posts/fetchRemovePost',
    async (id) => {
        const {data} = await $api.delete(`/posts/${id}`);
        return data;
    }
)

const initialState = {
    page: 1,
    asc: 1,
    sort: "price",
    pageCount: 5,
    title: {
        titles: [],
        isLoading: true,
    },
    post: {
        posts: [],
        isLoading: true,
    },
    postById: {
        postContent: {},
        isLoading: true,
    },
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setAsc: (state, action) => {
            if(action.payload === true) {
                state.asc = 1;
            } else {
                state.asc = -1;
            }
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setDefault: (state) => {
            state.sort = "price";
            state.page = 1;
            state.asc = 1;
        },
    },
    extraReducers: {
        [fetchPostTitles.pending]: (state) => {
            state.title.titles = [];
            state.title.isLoading = true;
        },
        [fetchPostTitles.fulfilled]: (state, action) => {
            state.title.titles = action.payload;
            state.pageCount = Math.ceil((action.payload.length / 3));
            state.title.isLoading = false;
        },
        [fetchPostTitles.rejected]: (state) => {
            state.title.titles = [];
            state.title.isLoading = true;
        },


        [fetchPosts.pending]: (state) => {
            state.post.posts = [];
            state.post.isLoading = true;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.post.posts = action.payload;
            state.post.isLoading = false;
        },
        [fetchPosts.rejected]: (state) => {
            state.post.posts = [];
            state.post.isLoading = true;
        },


        [fetchOnePost.pending]: (state) => {
            state.postById.postContent = {};
            state.postById.isLoading = true;
        },
        [fetchOnePost.fulfilled]: (state, action) => {
            state.postById.postContent = action.payload;
            state.postById.isLoading = false;
        },
        [fetchOnePost.rejected]: (state) => {
            state.postById.postContent = {};
            state.postById.isLoading = true;
        },


        [fetchCreatePost.fulfilled]: (state, action) => {
            state.post.posts = state.post.posts.filter(item => item._id !== action.payload._id);
            state.post.posts.push({
                _id: action.payload._id,
                title: action.payload.title,
                text: action.payload.text,
                price: action.payload.price,
                imageUrl: action.payload.imageUrl,
            });
            state.post.posts = state.post.posts.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0;
            });
            state.post.posts = state.post.posts.slice(0 , 3);
        },


        [fetchEditPost.fulfilled]: (state, action) => {
            state.post.posts = state.post.posts.filter(item => item._id !== action.payload.id);
            state.post.posts.push({
                _id: action.payload.id,
                title: action.payload.title,
                text: action.payload.text,
                price: action.payload.price,
                imageUrl: action.payload.imageUrl,
            });
            state.post.posts = state.post.posts.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0;
            });
            state.post.posts = state.post.posts.slice(0 , 3);
        },


        [fetchRemovePost.fulfilled]: (state, action) => {
            state.post.posts = state.post.posts.filter(item => item._id !== action.payload._id);
        },
    },
})

export const { setAsc, setPage, setSort, setDefault } = postSlice.actions

export default postSlice.reducer