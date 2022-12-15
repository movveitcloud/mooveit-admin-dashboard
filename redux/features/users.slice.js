import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorPopUp, successPopUp } from "../../helpers/toastify";
import * as api from "../api";

export const getUsers = createAsyncThunk("/users", async ({}, { rejectWithValue }) => {
  try {
    const response = await api.getUsers();
    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});
export const getSingleUser = createAsyncThunk("/admin/users/userId", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await api.getSingleUser(id);

    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});
export const verifyUser = createAsyncThunk(
  "/admin/users/Id",
  async ({ id, payload, closeModal, refreshUsers }, { rejectWithValue }) => {
    try {
      const response = await api.verifyUser({ id, payload });
      console.log(response.data);
      closeModal.current.click();
      refreshUsers();
      console.log(payload);

      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filteredUsers: [],
    loading: false,
    userLoading: false,
    singleUser: {},
    singleUserLoading: false,
    verifyUser: {},
    verifyUserLoading: false,
  },

  reducers: {
    filterUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    clearFilteredUser: (state, action) => {
      state.filteredUsers = action.payload;
    },
  },

  extraReducers: {
    [getUsers.pending]: (state) => {
      state.userLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.users = action.payload.data;
      state.filteredUsers = action.payload.data;
    },
    [getUsers.rejected]: (state, action) => {
      state.userLoading = false;
    },
    [getSingleUser.pending]: (state) => {
      state.singleUserLoading = true;
    },
    [getSingleUser.fulfilled]: (state, action) => {
      state.singleUserLoading = false;
      state.singleUser = action.payload.data;
    },
    [getSingleUser.rejected]: (state, action) => {
      state.singleUserLoading = false;
    },
    [verifyUser.pending]: (state) => {
      state.verifyUserLoading = true;
    },
    [verifyUser.fulfilled]: (state, action) => {
      state.verifyUserLoading = false;
      state.verifyUser = action.payload.data;
    },
    [verifyUser.rejected]: (state, action) => {
      state.verifyUserLoading = false;
    },
  },
});

export const { filterUsers, clearFilteredUser } = userSlice.actions;

export default userSlice.reducer;
