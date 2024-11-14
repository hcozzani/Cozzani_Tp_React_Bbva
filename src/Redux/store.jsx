import { configureStore } from '@reduxjs/toolkit';
import polizasReducer from './polizasSlize';

export const store = configureStore({
  reducer: {
    polizas: polizasReducer,
  },
});