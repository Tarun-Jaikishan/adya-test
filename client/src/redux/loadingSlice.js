import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setOnLoading: (state) => {
      state.isLoading = true;
    },

    setOffLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setOnLoading, setOffLoading } = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
