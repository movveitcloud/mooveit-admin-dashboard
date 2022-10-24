import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorPopUp, successPopUp } from "../../helpers/toastify";
import * as api from "../api";

export const getListings = createAsyncThunk("/listings", async ({}, { rejectWithValue }) => {
  try {
    const response = await api.getListings();

    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    loading: false,
    listingLoading: false,
  },

  extraReducers: {
    [getListings.pending]: (state) => {
      state.listingLoading = true;
    },
    [getListings.fulfilled]: (state, action) => {
      state.listingLoading = false;
      state.listings = action.payload.data;
    },
    [getListings.rejected]: (state, action) => {
      state.listingLoading = false;
    },
  },
});

export default listingSlice.reducer;
