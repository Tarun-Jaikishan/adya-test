import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./loadingSlice";
import { profileReducer } from "./profileSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    profile: profileReducer,
  },
});
