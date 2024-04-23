
// src/app/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from './slice/productSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    product: productReducer,
    // Add more reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;