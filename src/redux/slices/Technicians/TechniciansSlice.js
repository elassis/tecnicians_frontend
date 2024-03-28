import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import http from "../../../axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TECHNICIANS_INDEX } from "../../../apis/techniciansApi";

export const fetchTechnicians = createAsyncThunk("tecnicians/fetchtechnicians", () => {
  return http.get(TECHNICIANS_INDEX).then((response) => response.data).catch(error => error);
});

const initialState = {};

const techniciansSlice = createSlice({
  name: "technicians",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTechnicians.fulfilled, (state, action) => {
      state.technicians = action.payload;
    }); 
    builder.addCase(PURGE, (state) => {
      return initialState;
    });   
  },
});

export default techniciansSlice;