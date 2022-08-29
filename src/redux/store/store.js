import { configureStore } from '@reduxjs/toolkit';
import citySlice from '../slices/City/citySlice';
import userSlice from '../slices/User/userSlice.js';

const store = configureStore({
  reducer:{
    cities: citySlice.reducer,
    user: userSlice.reducer
  }
});

export default store;