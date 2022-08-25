import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CITIES_URL } from "../../../apis/citiesApi";
import axios from "axios";

export const fetchCities = createAsyncThunk("cities/fetchCities", () =>{
    return axios.get(CITIES_URL).then((response) => response.data)
});

const initialState = {}

const citySlice = createSlice({
    name:"cities",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchCities.fulfilled, (state, action) =>{
            state.cities = action.payload
        })
    }
});


export default citySlice;
