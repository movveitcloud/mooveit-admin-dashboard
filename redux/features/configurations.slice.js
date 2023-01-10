import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
import { errorPopUp, successPopUp } from "../../helpers/toastify";

import * as api from "../api";

export const getConfigurations = createAsyncThunk("/configurations", async ({ config }, { rejectWithValue }) => {
  try {
    const response = await api.getConfigurations(config);

    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});
export const getFeatures = createAsyncThunk(
  "/configurations/storage-features",
  async ({ config, id }, { rejectWithValue }) => {
    try {
      const response = await api.getConfigurations(config);

      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);
export const getFloor = createAsyncThunk(
  "/configurations/storage-floor",
  async ({ config, id }, { rejectWithValue }) => {
    try {
      const response = await api.getConfigurations(config);

      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);
export const getType = createAsyncThunk("/configurations/storage-type", async ({ config, id }, { rejectWithValue }) => {
  try {
    const response = await api.getConfigurations(config);

    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});
export const getAccess = createAsyncThunk(
  "/configurations/storage-accesstype",
  async ({ config, id }, { rejectWithValue }) => {
    try {
      const response = await api.getConfigurations(config);

      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);
export const getServices = createAsyncThunk("/configurations/services", async ({ config, id }, { rejectWithValue }) => {
  try {
    const response = await api.getConfigurations(config);

    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});
export const getSize = createAsyncThunk("/configurations/storage-size", async ({ config, id }, { rejectWithValue }) => {
  try {
    const response = await api.getConfigurations(config);

    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});
export const updateConfigurations = createAsyncThunk(
  "configurations/update/id",
  async (
    { config, payload, closeModal, refreshConfigurations, id, setData, initialState, setInfo, setImageupload },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updateConfiguration({ config, id, payload });

      closeModal.current.click();
      refreshConfigurations();
      setData(initialState);
      setInfo([]);
      setImageupload("");

      return response.data;
    } catch (err) {
      console.log(err.response.data.error);
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

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
export const createConfiguration = createAsyncThunk(
  "/configurations/config/id",
  async (
    { config, payload, closeModal, refreshConfigurations, setData, initialState, setImageupload },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.createConfiguration({ config, payload });
      closeModal.current.click();
      refreshConfigurations();
      setData(initialState);
      setImageupload("");

      // console.log(payload);
      // console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      console.log(payload);
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteConfiguration = createAsyncThunk(
  "/configurations/:deleteconfig",
  async ({ config, id, closeModal, refreshConfigurations }, { rejectWithValue }) => {
    // console.log(id);
    try {
      const response = await api.deleteConfiguration({ config, id });
      closeModal.current.click();
      refreshConfigurations();

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
    configurationsLoading: false,
    features: [],
    featuresLoading: false,
    floor: [],
    floorLoading: false,
    type: [],
    typeLoading: false,
    access: [],
    accessLoading: false,
    services: [],
    servicesLoading: false,
    size: [],
    sizeLoading: false,
    loading: false,
    configurationLoading: false,
    uploadImage: false,
    uploadImageLoading: false,
    createConfiguration: {},
    createConfigurationLoading: false,
    updateConfiguration: {},
    updateConfigurationLoading: false,
    deleteConfiguration: {},
    deleteConfigurationsLoading: false,
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
    [deleteConfiguration.pending]: (state) => {
      state.deleteConfigurationsLoading = true;
    },
    [deleteConfiguration.fulfilled]: (state, action) => {
      state.deleteConfigurationsLoading = false;
      state.deleteconfiguration = action.payload.data;
    },
    [deleteConfiguration.rejected]: (state, action) => {
      state.deleteConfigurationsLoading = false;
    },
    [getFeatures.pending]: (state) => {
      state.featuresLoading = true;
    },
    [getFeatures.fulfilled]: (state, action) => {
      state.featuresLoading = false;
      state.features = action.payload.data;
    },
    [getFeatures.rejected]: (state, action) => {
      state.featuresLoading = false;
    },
    [getFloor.pending]: (state) => {
      state.floorLoading = true;
    },
    [getFloor.fulfilled]: (state, action) => {
      state.floorLoading = false;
      state.floor = action.payload.data;
    },
    [getFloor.rejected]: (state, action) => {
      state.floorLoading = false;
    },
    [getType.pending]: (state) => {
      state.typeLoading = true;
    },
    [getType.fulfilled]: (state, action) => {
      state.typeLoading = false;
      state.type = action.payload.data;
    },
    [getType.rejected]: (state, action) => {
      state.typeLoading = false;
    },
    [getAccess.pending]: (state) => {
      state.accessLoading = true;
    },
    [getAccess.fulfilled]: (state, action) => {
      state.accessLoading = false;
      state.access = action.payload.data;
    },
    [getAccess.rejected]: (state, action) => {
      state.accessLoading = false;
    },

    [getSize.fulfilled]: (state, action) => {
      state.size = action.payload.data;
    },

    [getServices.fulfilled]: (state, action) => {
      state.services = action.payload.data;
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

    [updateConfigurations.pending]: (state) => {
      state.updateConfigurationLoading = true;
    },
    [updateConfigurations.fulfilled]: (state, action) => {
      state.updateConfigurationLoading = false;
      state.updateConfiguration = action.payload.data;
    },
    [updateConfigurations.rejected]: (state, action) => {
      state.updateConfigurationLoading = false;
    },
    [createConfiguration.pending]: (state) => {
      state.createConfigurationLoading = true;
    },
    [createConfiguration.fulfilled]: (state, action) => {
      state.createConfigurationLoading = false;
      state.createConfiguration = action.payload.data;
    },
    [createConfiguration.rejected]: (state, action) => {
      state.createConfigurationLoading = false;
    },
  },
});
export default configurationSlice.reducer;
