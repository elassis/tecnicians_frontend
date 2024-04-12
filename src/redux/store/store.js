import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import citySlice from "../slices/City/citySlice";
import userSlice from "../slices/User/userSlice.js";
import { modalsSlice } from "../slices/Modals/modalSlice";
import technicianSlice from "../slices/Technician/technicianSlice";
import professionsSlice from "../slices/Profession/professionSlice";
import { signUpSlice } from "../slices/SignUp/signUpSlice.js";
import { errorsSlice } from "../slices/Errors/errorsSlice.js";
import techniciansSlice from "../slices/Technicians/TechniciansSlice.js";
import { responseSlice } from "../slices/Response/responseSlice.js";
import { jobsSlice } from "../slices/Jobs/jobsSlice.js";
const persistConfig = {
  key:"main-store",
  version: 1,
  storage,
}

const reducer = combineReducers({
  user: userSlice.reducer,
  technician: technicianSlice.reducer,
  technicians: techniciansSlice.reducer,
  professions: professionsSlice.reducer,
  jobs: jobsSlice.reducer,
  cities: citySlice.reducer,
  signUp: signUpSlice.reducer,
  response: responseSlice.reducer,
  errors: errorsSlice.reducer,
  modals: modalsSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      ignoredActions: ['response/setResponse','persist/PERSIST'],
    },
  }),
});

export default store;
