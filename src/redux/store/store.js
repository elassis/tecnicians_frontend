import { configureStore } from "@reduxjs/toolkit";
import citySlice from "../slices/City/citySlice";
import userSlice from "../slices/User/userSlice.js";
import modalSlice from "../slices/Modals/modalSlice";
import technicianSlice from "../slices/Technician/technicianSlice";
import professionsSlice from "../slices/Profession/professionSlice";

const store = configureStore({
  reducer: {
    cities: citySlice.reducer,
    professions: professionsSlice.reducer,
    user: userSlice.reducer,
    showModal: modalSlice.reducer,
    technician: technicianSlice.reducer,
  },
});

export default store;
