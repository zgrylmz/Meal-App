import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Securely sets the base URL
});

// ✅ Global error interceptor to hide sensitive data
api.interceptors.response.use(
    (response) => response, 
    (error) => {
        console.error("An error occurred. Please try again."); // Do not log the full error
        return Promise.reject(error);
    }
);

export default api;
