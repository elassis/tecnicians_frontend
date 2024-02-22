import { createSlice } from "@reduxjs/toolkit";
import http from "../../../axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROFESSIONS_URL } from "../../../apis/professionApi";

export const fetchProfessions = createAsyncThunk(
  "professions/fetchProfessions",
  () => {
    return http.get(PROFESSIONS_URL).then((response) => response.data);
  }
);

const initialState = {};

const professionsSlice = createSlice({
  name: "professions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProfessions.fulfilled, (state, action) => {
      state.professions = action.payload;
    });
  },
});

export default professionsSlice;
