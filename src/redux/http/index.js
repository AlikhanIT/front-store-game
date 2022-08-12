import axios from "axios";

export const API_URL = "http://192.168.1.105:5000/api";
export const BACK_URL = "http://192.168.1.105:5000";

const $api = axios.create({
    withCredentials: true,
    baseURL:  API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

export default $api;