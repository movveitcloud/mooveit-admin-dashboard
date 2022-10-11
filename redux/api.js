import axios from "axios";

const API = axios.create({ baseURL: process.env.BASE_URL });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("user")) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
//   }
//   return req;
// });

// AUTH
 export const signIn = (payload) => API.post("/admin/login", payload);
 export const forgotPassword = (payload) => API.post("/admin/forgot-password", payload);
export const resetPassword = ({ payload, token }) => API.patch(`/admin/reset-password/${token}`, payload);
export const verifyResetToken = (token) => API.get(`/admin/reset-password/${token}`);


