import { configureStore } from "@reduxjs/toolkit";
import { authReducer, listingReducer, userReducer, configurationReducer } from "./features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listing: listingReducer,
    user: userReducer,
    configuration: configurationReducer,
  },
});
