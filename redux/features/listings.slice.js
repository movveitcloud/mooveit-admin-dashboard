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
export const getSingleListing = createAsyncThunk("/listing/listingId", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await api.getSingleListing(id);
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
    singleListing: {},
    singleListingLoading: false,
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
    [getSingleListing.pending]: (state) => {
      state.singleListingLoading = true;
    },
    [getSingleListing.fulfilled]: (state, action) => {
      state.singleListingLoading = false;
      state.singleListing = action.payload.data;
    },
    [getSingleListing.rejected]: (state, action) => {
      state.singleListingLoading = false;
    },
  },
});

export default listingSlice.reducer;
