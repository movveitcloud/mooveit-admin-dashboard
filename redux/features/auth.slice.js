import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorPopUp, successPopUp } from "../../helpers/toastify";
import crypto from "crypto-js";
import * as api from "../api";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

export const login = createAsyncThunk("/admin/login", async ({ payload, reset, router }, { rejectWithValue }) => {
  try {
    const response = await api.signIn(payload);
    const bytes = response.data.response ? crypto.AES.decrypt(response.data.response, ENCRYPTION_KEY) : "";
    const admin = JSON.parse(bytes ? bytes.toString(crypto.enc.Utf8) : null);
    // console.log(payload);
    successPopUp({
      msg: ` Welcome back ${admin.firstName}`,
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
export const updatePassword = createAsyncThunk("/admin/update", async ({ payload, reset }, { rejectWithValue }) => {
  try {
    const response = await api.updatePassword(payload);
    successPopUp({ msg: "Password successfully updated" });
    reset({ oldPassword: "", newPassword: "", confirmPassword: "" });
    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});

export const updateProfile = createAsyncThunk(
  "/admin/updateprofile",
  async ({ payload, id, reset }, { rejectWithValue }) => {
    try {
      const response = await api.updateProfile({ payload, id });
      successPopUp({ msg: "Profile successfully updated" });

      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateProfileImage = createAsyncThunk(
  "/user/update-profileimage/upload",
  async ({ payload, id, setFormDetails, formDetails }, { rejectWithValue }) => {
    try {
      const response = await api.updateProfileImage({ payload, id });
      successPopUp({
        msg: "Profile picture successfully updated",
        duration: 500,
      });
      setFormDetails({
        ...formDetails,
        profilePicture: response.data.data,
      });
      return response.data;
    } catch (err) {
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
    admin: null,
    loading: false,
    forgotLoading: false,
    resetLoading: false,
    verifyLoading: false,
    resetTokenData: null,
    updatePassword: {},
    updatePasswordLoading: false,
    updateProfileLoading: false,
    profilePictureLoading: false,
    updateprofile: {},
  },

  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("admin");
      state.admin = null;
    },
  },

  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("admin", JSON.stringify({ ...action.payload }));
      console.log(action.payload);
      state.admin = action.payload;
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
    [updatePassword.pending]: (state) => {
      state.updatePasswordLoading = true;
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.updatePasswordLoading = false;
      state.updatePassword = action.payload.data;
    },
    [updatePassword.rejected]: (state, action) => {
      state.updatePasswordLoading = false;
    },
    [updateProfile.pending]: (state) => {
      state.updateProfileLoading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.updateProfileLoading = false;
      state.admininfo = action.payload.data;
      localStorage.setItem("admin", JSON.stringify({ ...action.payload }));
      state.admin = action.payload;
    },
    [updateProfileImage.pending]: (state) => {
      state.profilePictureLoading = true;
    },
    [updateProfileImage.fulfilled]: (state, action) => {
      state.profilePictureLoading = false;
    },
    [updateProfileImage.rejected]: (state, action) => {
      state.profilePictureLoading = false;
    },

    [updateProfile.rejected]: (state, action) => {
      state.updateProfileLoading = false;
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
