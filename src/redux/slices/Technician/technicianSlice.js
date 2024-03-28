import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  tech: {},
  professions: {},
  selectedProfession: ""
};

const technicianSlice = createSlice({
  name: "technician",
  initialState,
  reducers: {
    addTechnician: (state, action) => {
      state.tech = action.payload;
    },
    addProfession: (state, action) => {
      state.skills = action.payload;
    },
    selectedProfession: (state, action) => {
      state.selectedSkill = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(PURGE, (state) => {
      return initialState;
    })
  }
});



export const { addTechnician, addProfession, selectedProfession } = technicianSlice.actions;
export default technicianSlice;
