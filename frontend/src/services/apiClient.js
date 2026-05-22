import axios from "axios";
import { getStoredToken } from "./tokenStorage";

const apiClient = axios.create({
    baseURL: "https://footballiq-2mzi.onrender.com"
});

apiClient.interceptors.request.use((config) => {
    const token = getStoredToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apiClient;
