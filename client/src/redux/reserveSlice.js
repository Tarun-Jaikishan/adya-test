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

    setDate: (state, action) => {
      state.dateOfBooking = action.payload;
    },

    setTable: (state, action) => {
      state.tableId = action.payload;
    },

    setSlot: (state, action) => {
      state.slots = [action.payload];
    },

    removeSlot: (state) => {
      state.slots = [];
    },

    resetData: (state) => {
      state = { ...state, ...initialState };
    },
  },
});

export const {
  setCardData,
  setDate,
  setTable,
  setSlot,
  removeSlot,
  resetData,
} = reserveSlice.actions;

export const reserveReducer = reserveSlice.reducer;
