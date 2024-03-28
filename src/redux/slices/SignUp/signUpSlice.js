import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  selectAmount: [],
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setSelectAmount: (state, action) => {
      state.selectAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      return initialState;
    });
  },
});

export const { setSelectAmount } = signUpSlice.actions;
