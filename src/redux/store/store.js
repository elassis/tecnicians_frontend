import { configureStore } from "@reduxjs/toolkit";
import citySlice from "../slices/City/citySlice";
import userSlice from "../slices/User/userSlice.js";
import { modalsSlice } from "../slices/Modals/modalSlice";
import technicianSlice from "../slices/Technician/technicianSlice";
import professionsSlice from "../slices/Profession/professionSlice";
import { signUpSlice } from "../slices/SignUp/signUpSlice.js";
import { errorsSlice } from "../slices/Errors/errorsSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cities: citySlice.reducer,
    signUp: signUpSlice.reducer,
    modals: modalsSlice.reducer,
    errors: errorsSlice.reducer,
    professions: professionsSlice.reducer,
    technician: technicianSlice.reducer,
  },
});

export default store;
