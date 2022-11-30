import { configureStore } from "@reduxjs/toolkit";
import { authReducer, listingReducer, userReducer, configurationReducer, adminReducer } from "./features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listing: listingReducer,
    user: userReducer,
    configuration: configurationReducer,
    admin: adminReducer,
  },
});
