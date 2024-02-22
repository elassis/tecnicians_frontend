import { createSlice } from "@reduxjs/toolkit";


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
});




export const { setSelectAmount } = signUpSlice.actions;
