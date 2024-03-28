import { createSlice } from "@reduxjs/toolkit";
import http from "../../../axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CITIES_URL } from "../../../apis/citiesApi";
import { PURGE } from "redux-persist";

export const fetchCities = createAsyncThunk("cities/fetchCities", () => {
  return http.get(CITIES_URL).then((response) => response.data);
});

const initialState = {};

const citySlice = createSlice({
  name: "cities",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cities = action.payload;
    });
    builder.addCase(PURGE, (state) => {
      return initialState;
    });
  },
});

export default citySlice;
