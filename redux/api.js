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
export const updatePassword = (payload) => API.patch("/admin/update-password", payload);
export const updateProfile = ({ id, payload }) => API.patch(`/admin/${id}`, payload);
export const updateProfileImage = ({ id, payload }) => API.patch(`/admin/${id}/upload`, payload);

//LISTINGS
export const getListings = () => API.get("/admin/listings");
export const getSingleListing = (id) => API.get(`/users/listings/${id}`);
export const approveListing = ({ payload, id }) => API.patch(`/admin/listings/${id}`, payload);
export const disapproveListing = ({ payload, id }) => API.patch(`/admin/listings/${id}`, payload);

//USERS
export const getUsers = () => API.get("/admin/users");
export const getSingleUser = (id) => API.get(`/admin/users/${id}`);
export const verifyUser = ({ payload, id }) => API.patch(`/admin/users/${id}`, payload);

//CONFIGURATIONS
export const getConfigurations = (config) => API.get(`/configurations/${config}`);
export const uploadConfigurationImage = ({ id, payload }) => API.patch(`/admin/configurations/${id}/upload`, payload);
export const createConfiguration = ({ config, payload }) => API.post(`configurations/${config}`, payload);
export const updateConfiguration = ({ config, id, payload }) => API.patch(`/configurations/${config}/${id}`, payload);
export const deleteConfiguration = ({ config, id }) => API.delete(`/configurations/${config}/${id}`);

//ADMIN
export const createAdmin = ({ payload }) => API.post("/admin/register", payload);
export const getAdmins = () => API.get("/admin");
export const deleteAdmin = ({ id }) => API.delete(`/admin/${id}`);

//BOOKING
export const getBookings = () => API.get("/booking/admin");
export const getSingleBooking = (id) => API.get(`/booking/admin/${id}`);
