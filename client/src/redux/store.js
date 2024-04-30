import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./loadingSlice";
import { profileReducer } from "./profileSlice";
import { reserveReducer } from "./reserveSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    profile: profileReducer,
    reserve: reserveReducer,
  },
});
