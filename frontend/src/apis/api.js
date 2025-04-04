import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// // Logging request details (for debugging)
// api.interceptors.request.use(
//   (config) => {
//     console.log("Request config:", config);
//     return config;
//   },
//   (error) => {
//     console.error("❌ Axios Interceptor Error:", error);
//     return Promise.reject(error);
//   }
// );

export default api;
