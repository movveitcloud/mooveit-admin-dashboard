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
export const getListings = () => API.get("/admin/listings");
export const getSingleListing = (id) => API.get(`/users/listings/${id}`);
export const approveListing = ({ payload, id }) => API.patch(`/admin/listings/${id}`, payload);
export const disapproveListing = ({ payload, id }) => API.patch(`/admin/listings/${id}`, payload);

//USERS
export const getUsers = () => API.get("/admin/users");
export const getSingleUser = (id) => API.get(`/admin/users/${id}`);

//CONFIGURATIONS
export const getConfigurations = () => API.get("/admin/configurations");
export const uploadConfigurationImage = ({ id, payload }) => API.patch(`/admin/configurations/${id}/upload`, payload);
export const uploadConfiguration = ({ id, payload }) => API.patch(`/admin/configurations/${id}`, payload);

//ADMIN
export const createAdmin = ({ payload }) => API.post("/admin/register", payload);
export const getAdmins = () => API.get("/admin");
export const deleteAdmin = ({ id }) => API.delete(`/admin/${id}`);
export const updatePassword = (payload) => API.patch("/admin/update-password", payload);
