import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  stateErrors: [],
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.stateErrors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      return initialState;
    });
  },
});

export const { setErrors } = errorsSlice.actions;
