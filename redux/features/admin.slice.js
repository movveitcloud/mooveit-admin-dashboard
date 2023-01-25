import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorPopUp, successPopUp } from "../../helpers/toastify";
import * as api from "../api";
export const getAdmins = createAsyncThunk("/admin", async ({}, { rejectWithValue }) => {
  try {
    const response = await api.getAdmins();
    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});
export const createAdmin = createAsyncThunk(
  "/admin/register",
  async ({ payload, closeModal, refreshConfigurations, reset }, { rejectWithValue }) => {
    try {
      const response = await api.createAdmin({ payload });
      closeModal.current.click();
      refreshConfigurations();
      reset({ password: "", confirmPassword: "", email: "", firstName: "", lastName: "" });
      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "/admin/id",
  async ({ id, closeModal, refreshConfigurations }, { rejectWithValue }) => {
    try {
      const response = await api.deleteAdmin({ id });
      closeModal.current.click();
      refreshConfigurations();
      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    filteredAdmin: [],
    admins: [],
    loading: false,
    adminLoading: false,
    createAdmin: {},
    createAdminLoading: false,
    deleteAdmin: {},
    deleteAdminLoading: false,
  },
  reducers: {
    filterAdmin: (state, action) => {
      state.filteredAdmin = action.payload;
    },
    clearFilteredAdmin: (state, action) => {
      state.filteredAdmin = action.payload;
    },
  },

  extraReducers: {
    [getAdmins.pending]: (state) => {
      state.adminLoading = true;
    },
    [getAdmins.fulfilled]: (state, action) => {
      state.adminLoading = false;
      state.admins = action.payload.data;
      state.filteredAdmin = action.payload.data;
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
    [deleteAdmin.pending]: (state) => {
      state.deleteAdminLoading = true;
    },
    [deleteAdmin.fulfilled]: (state, action) => {
      state.deleteAdminLoading = false;
      state.deleteAdmin = action.payload.data;
    },
    [deleteAdmin.rejected]: (state, action) => {
      state.deleteAdminLoading = false;
    },
  },
});
export const { filterAdmin, clearFilteredAdmin } = adminSlice.actions;
export default adminSlice.reducer;
