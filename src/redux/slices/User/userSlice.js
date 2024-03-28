import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return state = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(PURGE, (state) => {
      return initialState;
    })
  }
});

export const { addUser } = userSlice.actions;
export default userSlice;
