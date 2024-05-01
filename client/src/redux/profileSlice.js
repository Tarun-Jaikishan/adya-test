import { createSlice } from "@reduxjs/toolkit";
import { ax } from "../utils/axios.util";
import { setOffLoading, setOnLoading } from "./loadingSlice";

const initialState = {
  username: "",
  name: "",
  phone_number: "",
  email: "",
  role: "",
  lastLogin: null,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    removeProfile: (state) => {
      state = { ...state, ...initialState };
    },
  },
});

export const { setProfile, removeProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
