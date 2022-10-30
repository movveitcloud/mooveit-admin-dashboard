import axios from "axios";

const API = axios.create({ baseURL: process.env.BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("admin")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("admin")).token}`;
  }
  return req;
});

// AUTH
export const signIn = (payload) => API.post("/admin/login", payload);
export const forgotPassword = (payload) => API.post("/admin/forgot-password", payload);
export const resetPassword = ({ payload, token }) => API.patch(`/admin/reset-password/${token}`, payload);
export const verifyResetToken = (token) => API.get(`/admin/reset-password/${token}`);

//LISTINGS
export const getListings = () => API.get("/users/listings");
export const getSingleListing = (id) => API.get(`/users/listings/${id}`);

//USERS
export const getUsers = () => API.get("/admin/users");
