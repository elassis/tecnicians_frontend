import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  response: {},
};

export const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    setResponse: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      return initialState;
    });
  },
});

export const { setResponse } = responseSlice.actions;
