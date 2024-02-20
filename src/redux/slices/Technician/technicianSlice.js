import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tech: {},
  skills: {},
  selectedSkill: ""
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
    selectedSkill: (state, action) => {
      state.selectedSkill = action.payload;
    },
  },
});



export const { addTechnician, addSkills, selectedSkill } = technicianSlice.actions;
export default technicianSlice;
