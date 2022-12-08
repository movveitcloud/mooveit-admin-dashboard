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
export const approveListing = createAsyncThunk(
  "/admin/listings/listingId",
  async ({ payload, id }, { rejectWithValue }) => {
    try {
      const response = await api.approveListing({ payload, id });
      console.log(response.data);
      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);
export const disapproveListing = createAsyncThunk(
  "/admin/listings/Id",
  async ({ payload, id }, { rejectWithValue }) => {
    try {
      const response = await api.disapproveListing({ payload, id });

      return response.data;
    } catch (err) {
      errorPopUp({ msg: err.response.data.error });
      return rejectWithValue(err.response.data);
    }
  }
);

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    filteredListings: [],
    loading: false,
    listingLoading: false,
    singleListing: {},
    singleListingLoading: false,
    approveListing: {},
    approveListingLoading: false,
    disapproveListing: {},
    disapproveListingLoading: false,
  },

  reducers: {
    filterListings: (state, action) => {
      state.filteredListings = action.payload;
    },
    clearFilteredListings: (state, action) => {
      state.filteredListings = action.payload;
    },
  },

  extraReducers: {
    [getListings.pending]: (state) => {
      state.listingLoading = true;
    },
    [getListings.fulfilled]: (state, action) => {
      state.listingLoading = false;
      state.listings = action.payload.data;
      state.filteredListings = action.payload.data;
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
    [approveListing.pending]: (state) => {
      state.approveListingLoading = true;
    },
    [approveListing.fulfilled]: (state, action) => {
      state.approveListingLoading = false;
      state.approveListing = action.payload.data;
    },
    [approveListing.rejected]: (state, action) => {
      state.approveListingLoading = false;
    },
    [disapproveListing.pending]: (state) => {
      state.disapproveListingLoading = true;
    },
    [disapproveListing.fulfilled]: (state, action) => {
      state.disapproveListingLoading = false;
      state.disapproveListing = action.payload.data;
    },
    [disapproveListing.rejected]: (state, action) => {
      state.disapproveListingLoading = false;
    },
  },
});

export const { filterListings, clearFilteredListings } = listingSlice.actions;

export default listingSlice.reducer;
