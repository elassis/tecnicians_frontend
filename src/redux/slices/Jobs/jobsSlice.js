import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  job: {
    id: null,
    status: null,
  },
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobState: (state, action) => {
      state.job = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      return initialState;
    });
  },
});

export const { setJobState } = jobsSlice.actions;
