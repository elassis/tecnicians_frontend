import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const modalSlice = createSlice({
  name: "bookingModal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { showModal } = modalSlice.actions;
export default modalSlice;
