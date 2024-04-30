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
      state = initialState;
    },
  },
});

export const getUserInfo = () => async (dispatch) => {
  console.log("called");
  dispatch(setOnLoading());
  try {
    const response = await ax.get("/auth");
    dispatch(setProfile(response.data.data));
    console.log(response);
  } catch (err) {
    console.log(err);
  }
  dispatch(setOffLoading());
};

export const { setProfile, removeProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
