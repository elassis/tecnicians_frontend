import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tech: {},
  skills: {},
};

const technicianSlice = createSlice({
  name: "technician",
  initialState,
  reducers: {
    addTechnician: (state, action) => {
      state.tech = action.payload;
    },
    addSkills: (state, action) => {
      state.skills = action.payload;
    },
  },
});

export const { addTechnician, addSkills } = technicianSlice.actions;
export default technicianSlice;
