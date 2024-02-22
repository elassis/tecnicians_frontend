import { configureStore } from "@reduxjs/toolkit";
import citySlice from "../slices/City/citySlice";
import userSlice from "../slices/User/userSlice.js";
import { modalsSlice } from "../slices/Modals/modalSlice";
import technicianSlice from "../slices/Technician/technicianSlice";
import professionsSlice from "../slices/Profession/professionSlice";
import { signUpSlice } from "../slices/SignUp/signUpSlice.js";

const store = configureStore({
  reducer: {
    modals: modalsSlice.reducer,
    cities: citySlice.reducer,
    professions: professionsSlice.reducer,
    user: userSlice.reducer,
    technician: technicianSlice.reducer,
    signUp: signUpSlice.reducer,
  },
});

export default store;
