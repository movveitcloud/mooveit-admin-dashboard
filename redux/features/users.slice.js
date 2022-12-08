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

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filteredUsers: [],
    loading: false,
    userLoading: false,
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
  },
});

export const { filterUsers, clearFilteredUser } = userSlice.actions;

export default userSlice.reducer;
