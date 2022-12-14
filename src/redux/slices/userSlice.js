import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api, { API_URL } from "../http";
import axios from "axios";

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (params) => {
    const { data } = await $api.post(`/login`, params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "user/fetchRegister",
  async (params) => {
    const { data } = await $api.post(`/registration`, params);
    return data;
  }
);

export const fetchLogout = createAsyncThunk("user/fetchLogout", async () => {
  const { data } = await $api.post(`/logout`);
  return data;
});

export const fetchCheckAuth = createAsyncThunk("user/CheckAuth", async () => {
  const param = {refreshToken: `${JSON.stringify(window.localStorage.getItem("refreshToken")).split('"')[1]}`};
  console.log(param.refreshToken)
  const { data } = await axios.post(`${API_URL}/refresh`, param, {
    withCredentials: true,
  });
  return data;
});

const initialState = {
  isAuth: false,
  userId: "",
  avatarUrl: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.isAuth = true;
      state.userId = "";
      state.avatarUrl = "";
      state.isAdmin = false;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      window.localStorage.setItem("token", action.payload.accessToken);
      window.localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.isAuth = true;
      state.userId = action.payload.userId;
      state.avatarUrl = action.payload.imageUrl;
      state.isAdmin = action.payload.isAdmin;
    },
    [fetchLogin.rejected]: (state) => {
      state.isAuth = false;
      state.userId = "";
      state.avatarUrl = "";
      state.isAdmin = false;
    },

    [fetchRegister.pending]: (state) => {
      state.isAuth = true;
      state.userId = "";
      state.avatarUrl = "";
      state.isAdmin = false;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      window.localStorage.setItem("token", action.payload.accessToken);
      window.localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.isAuth = true;
      state.userId = action.payload.userId;
      state.avatarUrl = "";
      state.isAdmin = action.payload.isAdmin;
    },
    [fetchRegister.rejected]: (state) => {
      state.isAuth = false;
      state.userId = "";
      state.avatarUrl = "";
      state.isAdmin = false;
    },

    [fetchCheckAuth.pending]: (state) => {
      state.isAuth = true;
      state.userId = "";
      state.avatarUrl = "";
      state.isAdmin = false;
    },
    [fetchCheckAuth.fulfilled]: (state, action) => {
      window.localStorage.setItem("token", action.payload.accessToken);
      window.localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.isAuth = true;
      state.userId = action.payload.userId;
      state.avatarUrl = action.payload.imageUrl;
      state.isAdmin = action.payload.isAdmin;
    },
    [fetchCheckAuth.rejected]: (state) => {
      state.isAuth = false;
      state.userId = "";
      state.avatarUrl = "";
      state.isAdmin = false;
    },

    [fetchLogout.pending]: (state) => {
      state.isAuth = true;
      state.userId = "";
      state.avatarUrl = "";
      state.isAdmin = false;
    },
    [fetchLogout.fulfilled]: (state, action) => {
      window.localStorage.removeItem("token");
      state.isAuth = false;
      state.userId = "";
      state.avatarUrl = "";
      state.isAdmin = false;
    },
    [fetchLogout.rejected]: (state) => {
      state.isAuth = true;
      state.userId = "";
      state.avatarUrl = "";
      state.isAdmin = false;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
