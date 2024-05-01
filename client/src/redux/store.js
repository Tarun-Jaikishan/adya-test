import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Redux-Persistor
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { loadingReducer } from "./loadingSlice";
import { profileReducer } from "./profileSlice";
import { reserveReducer } from "./reserveSlice";

const persistReducerWrapper = (reducer, key) => {
  const persistConfig = {
    key,
    storage,
  };
  return persistReducer(persistConfig, reducer);
};

// Create store
export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    profile: persistReducerWrapper(profileReducer, "profile"),
    reserve: persistReducerWrapper(reserveReducer, "reserve"),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
