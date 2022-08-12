import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import $api, {API_URL} from "../http";
import axios from "axios";

export const fetchLogin = createAsyncThunk(
    'user/fetchLogin',
    async (params) => {
        const {data} = await $api.post(`/login`, params);
        return data;
    }
)

export const fetchRegister = createAsyncThunk(
    'user/fetchRegister',
    async (params) => {
        const {data} = await $api.post(`/registration`, params);
        return data;
    }
)

export const fetchLogout = createAsyncThunk(
    'user/fetchLogout',
    async () => {
        const {data} = await $api.post(`/logout`);
        return data;
    }
)

export const fetchCheckAuth = createAsyncThunk(
    'user/CheckAuth',
    async () => {
        const {data} = await axios.get(`${API_URL}/refresh`, {withCredentials:true});
        return data;
    }
)

const initialState = {
    isAuth: false,
    isAdmin: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {

        },
    },
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.isAuth = true;
            state.isAdmin = false;
        },
        [fetchLogin.fulfilled]: (state, action) => {
            window.localStorage.setItem('token', action.payload.accessToken);
            state.isAuth = true;
            state.isAdmin = action.payload.isAdmin;
        },
        [fetchLogin.rejected]: (state) => {
            state.isAuth = false;
            state.isAdmin = false;
        },


        [fetchRegister.pending]: (state) => {
            state.isAuth = true;
            state.isAdmin = false;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            window.localStorage.setItem('token', action.payload.accessToken);
            state.isAuth = true;
            state.isAdmin = action.payload.isAdmin;
        },
        [fetchRegister.rejected]: (state) => {
            state.isAuth = false;
            state.isAdmin = false;
        },


        [fetchCheckAuth.pending]: (state) => {
            state.isAuth = true;
            state.isAdmin = false;
        },
        [fetchCheckAuth.fulfilled]: (state, action) => {
            window.localStorage.setItem('token', action.payload.accessToken);
            state.isAuth = true;
            state.isAdmin = action.payload.isAdmin;
        },
        [fetchCheckAuth.rejected]: (state) => {
            state.isAuth = false;
            state.isAdmin = false;
        },


        [fetchLogout.pending]: (state) => {
            state.isAuth = true;
            state.isAdmin = false;
        },
        [fetchLogout.fulfilled]: (state, action) => {
            window.localStorage.removeItem('token');
            state.isAuth = false;
            state.isAdmin = false;
        },
        [fetchLogout.rejected]: (state) => {
            state.isAuth = true;
            state.isAdmin = false;
        },
    },
})

export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer