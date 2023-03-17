import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorPopUp, successPopUp } from "../../helpers/toastify";
import * as api from "../api";

export const getBooking = createAsyncThunk("/booking", async ({}, { rejectWithValue }) => {
  try {
    const response = await api.getBookings();
    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});

export const getSingleBooking = createAsyncThunk("/booking/bookingId", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await api.getSingleBooking(id);

    return response.data;
  } catch (err) {
    errorPopUp({ msg: err.response.data.error });
    return rejectWithValue(err.response.data);
  }
});

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    bookingLoading: false,
    singleBooking: {},
    singleBookingLoading: false,
    filteredListings: [],
  },

  reducers: {
    filterBookings: (state, action) => {
      state.filteredBookings = action.payload;
    },
    clearFilteredBookings: (state, action) => {
      state.filteredBookings = action.payload;
    },
  },

  extraReducers: {
    [getBooking.pending]: (state) => {
      state.bookingLoading = true;
    },
    [getBooking.fulfilled]: (state, action) => {
      state.bookingLoading = false;
      state.bookings = action.payload.data;
      state.filteredBookings = action.payload.data;
    },
    [getBooking.rejected]: (state, action) => {
      state.bookingLoading = false;
    },

    [getSingleBooking.pending]: (state) => {
      state.singleBookingLoading = true;
    },
    [getSingleBooking.fulfilled]: (state, action) => {
      state.singleBookingLoading = false;
      state.singleBooking = action.payload.data;
    },
    [getSingleBooking.rejected]: (state, action) => {
      state.singleBookingLoading = false;
    },
  },
});
export const { filterBookings, clearFilteredBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
