import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorPopUp, successPopUp } from "../../helpers/toastify";
import crypto from "crypto-js";

import * as api from "../api";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

export const login = createAsyncThunk("/admin/login", async ({ payload, reset }, { rejectWithValue }) => {
  try {
    const response = await api.signIn(payload);

    console.log(payload);
    successPopUp({
      msg: "Welcome back Admin",
      duration: 500,
      callback: () => location.replace("/accounts"),
    });
    reset({ email: "", password: "" });
    return response.data;
  } catch (err) {
    console.log(err);
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});
export const forgotPassword = createAsyncThunk(
  "/admin/forgot-password",
  async ({ payload, reset }, { rejectWithValue }) => {
    try {
      const response = await api.forgotPassword(payload);
      successPopUp({
        msg: "Password reset link has been sent to your email",
      });
      reset({ email: "" });
      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/admin/reset-password",
  async ({ payload, token }, { rejectWithValue }) => {
    try {
      const response = await api.resetPassword({ payload, token });
      successPopUp({
        msg: "Password reset succesful, please log in",
        callback: () => location.replace("/"),
      });
      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

export const verifyResetToken = createAsyncThunk(
  "/admin/reset-password/:token",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await api.verifyResetToken(token);

      return response.data;
    } catch (err) {
      location.replace("/");
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

//RETURN USER OBJECT IF LOGGED IN
export const authenticatedUser = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("admin")) {
    const userPersist = JSON.parse(localStorage.getItem("admin"));
   
    const bytes = userPersist !== "null" ? crypto.AES.decrypt(userPersist.response, ENCRYPTION_KEY) : "";
    const userObject = bytes ? bytes.toString(crypto.enc.Utf8) : null;
    return JSON.parse(userObject);
  }
  return false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    forgotLoading: false,
    resetLoading: false,
    verifyLoading: false,
    resetTokenData: null,
  },

  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("admin", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
    },
    [forgotPassword.pending]: (state) => {
      state.forgotLoading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.forgotLoading = false;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.forgotLoading = false;
    },

    [resetPassword.pending]: (state) => {
      state.resetLoading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.resetLoading = false;
    },
    [resetPassword.rejected]: (state, action) => {
      state.resetLoading = false;
    },
    [verifyResetToken.pending]: (state) => {
      state.verifyLoading = true;
    },
    [verifyResetToken.fulfilled]: (state, action) => {
      state.verifyLoading = false;
      state.resetTokenData = action.payload;
    },
    [verifyResetToken.rejected]: (state, action) => {
      state.verifyLoading = false;
    },
  },
});
export default authSlice.reducer;
