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

// Define reducers
const rootReducer = combineReducers({
  loading: persistReducerWrapper(loadingReducer, "loading"),
  profile: persistReducerWrapper(profileReducer, "profile"),
  reserve: persistReducerWrapper(reserveReducer, "reserve"),
});

// Create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
