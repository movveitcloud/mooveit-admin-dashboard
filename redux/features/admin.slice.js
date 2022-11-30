import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorPopUp, successPopUp } from "../../helpers/toastify";
import * as api from "../api";
export const getAdmins = createAsyncThunk("/admin", async ({}, { rejectWithValue }) => {
  try {
    const response = await api.getAdmins();
    console.log(response.data);
    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});
export const createAdmin = createAsyncThunk("/admin/register", async ({}, { rejectWithValue }) => {
  try {
    const response = await api.createAdmin();
    console.log(response.data);
    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    loading: false,
    adminLoading: false,
    createAdmin: false,
    createAdminLoading: false,
  },

  extraReducers: {
    [getAdmins.pending]: (state) => {
      state.adminLoading = true;
    },
    [getAdmins.fulfilled]: (state, action) => {
      state.adminLoading = false;
      state.admins = action.payload.data;
    },
    [getAdmins.rejected]: (state, action) => {
      state.adminLoading = false;
    },
    [createAdmin.pending]: (state) => {
      state.createAdminLoading = true;
    },
    [createAdmin.fulfilled]: (state, action) => {
      state.createAdminLoading = false;
      state.createAdmin = action.payload.data;
    },
    [createAdmin.rejected]: (state, action) => {
      state.createAdminLoading = false;
    },
  },
});
export default adminSlice.reducer;
