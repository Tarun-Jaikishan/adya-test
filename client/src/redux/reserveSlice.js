import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantId: "",
  name: "",
  cuisine: "",
  location: {},
  timings: {},
  rating: 0,
  dateOfBooking: "",
  tableId: "",
  slots: [],
};

const reserveSlice = createSlice({
  name: "reserveSlice",
  initialState,
  reducers: {
    setCardData: (state, action) => {
      state.restaurantId = action.payload.id;
      state.name = action.payload.name;
      state.cuisine = action.payload.cuisine;
      state.location = action.payload.location;
      state.timings = action.payload.timings;
      state.rating = action.payload.rating;
      state.dateOfBooking = "";
      state.tableId = "";
      state.slots = [];
    },

    setDate: (state, action) => {},
    setOffLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCardData, setOffLoading } = reserveSlice.actions;

export const reserveReducer = reserveSlice.reducer;
