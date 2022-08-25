import { configureStore } from '@reduxjs/toolkit';
import citySlice from '../slices/City/citySlice';

const store = configureStore({
  reducer:{
    cities: citySlice.reducer,
  }
});

export default store;