import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorPopUp } from "../../helpers/toastify";
import * as api from "../api";

export const getBanks = createAsyncThunk("/banks", async ({}, { rejectWithValue }) => {
  try {
    const response = await api.getBanks();
    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});

export const createBank = createAsyncThunk(
  "/admin/banks",
  async ({ payload, closeModal, refreshBanks, reset }, { rejectWithValue }) => {
    try {
      const response = await api.createBank({ payload });
      closeModal.current.click();
      refreshBanks();
      reset({ name: "" });
      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBank = createAsyncThunk(
  "/admin/banks/id",
  async ({ payload, closeModal, refreshBanks, reset, id }, { rejectWithValue }) => {
    try {
      const response = await api.updateBank({ payload, id });
      closeModal.current.click();
      refreshBanks();
      reset({ name: "" });
      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

const banksSlice = createSlice({
  name: "banks",
  initialState: {
    banks: [],
    loading: false,
    createBank: {},
    createBankLoading: false,
  },
  reducers: {
    filterBanks: (state, action) => {
      state.filteredBanks = action.payload;
    },
    clearFilteredBanks: (state, action) => {
      state.filteredBanks = action.payload;
    },
  },
  extraReducers: {
    [getBanks.pending]: (state) => {
      state.loading = true;
    },
    [getBanks.fulfilled]: (state, action) => {
      state.loading = false;
      state.banks = action.payload.data;
      state.filteredBanks = action.payload.data;
    },
    [getBanks.rejected]: (state, action) => {
      state.loading = false;
    },
    [createBank.pending]: (state) => {
      state.createBankLoading = true;
    },
    [createBank.fulfilled]: (state, action) => {
      state.createBankLoading = false;
      state.createBank = action.payload.data;
    },
    [createBank.rejected]: (state, action) => {
      state.createBankLoading = false;
    },
    [updateBank.pending]: (state) => {
      state.updateBankLoading = true;
    },
    [updateBank.fulfilled]: (state, action) => {
      state.updateBankLoading = false;
      state.updateBank = action.payload.data;
    },
    [updateBank.rejected]: (state, action) => {
      state.updateBankLoading = false;
    },
  },
});

export const { filterBanks, clearFilteredBanks } = banksSlice.actions;
export default banksSlice.reducer;
