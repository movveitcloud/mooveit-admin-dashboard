import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorPopUp, successPopUp } from "../../helpers/toastify";
import * as api from "../api";
export const getConfigurations = createAsyncThunk("/configurations", async ({}, { rejectWithValue }) => {
  try {
    const response = await api.getConfigurations();

    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});

export const uploadConfigurationImage = createAsyncThunk(
  "/admin/configurations/Id",
  async ({ payload, id }, { rejectWithValue }) => {
    try {
      const response = await api.uploadConfigurationImage({ id, payload });

      return response.data;
    } catch (err) {
      console.log(err.response);
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);
export const uploadConfiguration = createAsyncThunk(
  "/admin/configurations/:Id",
  async ({ id, payload, closeModal, refreshConfigurations }, { rejectWithValue }) => {
    try {
      const response = await api.uploadConfiguration({ id, payload });
      closeModal.current.click();
      refreshConfigurations();
      console.log(payload);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data.error);
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

const configurationSlice = createSlice({
  name: "configuration",
  initialState: {
    configurations: [],
    loading: false,
    configurationLoading: false,
    uploadImage: false,
    uploadImageLoading: false,
    uploadConfiguration: {},
    uploadConfigurationLoading: false,
  },

  extraReducers: {
    [getConfigurations.pending]: (state) => {
      state.configurationLoading = true;
    },
    [getConfigurations.fulfilled]: (state, action) => {
      state.configurationLoading = false;
      state.configurations = action.payload.data;
    },
    [getConfigurations.rejected]: (state, action) => {
      state.configurationLoading = false;
    },

    [uploadConfigurationImage.pending]: (state) => {
      state.uploadImageLoading = true;
    },
    [uploadConfigurationImage.fulfilled]: (state, action) => {
      state.uploadImageLoading = false;
      state.uploadImage = action.payload.data;
    },
    [uploadConfigurationImage.rejected]: (state, action) => {
      state.uploadImageLoading = false;
    },
    [uploadConfiguration.pending]: (state) => {
      state.uploadConfigurationLoading = true;
    },
    [uploadConfiguration.fulfilled]: (state, action) => {
      state.uploadConfigurationLoading = false;
      state.uploadConfiguration = action.payload.data;
    },
    [uploadConfiguration.rejected]: (state, action) => {
      state.uploadConfigurationLoading = false;
    },
  },
});
export default configurationSlice.reducer;
