import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  listingReducer,
  userReducer,
  configurationReducer,
  adminReducer,
  bookingsReducer,
  banksReducer,
} from "./features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listing: listingReducer,
    user: userReducer,
    configuration: configurationReducer,
    admin: adminReducer,
    bookings: bookingsReducer,
    banks: banksReducer,
  },
});
