import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: [],
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const { setErrors } = errorsSlice.actions;
