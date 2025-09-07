import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice';

const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});

export default store;
