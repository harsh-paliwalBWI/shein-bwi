import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice'
import loginReducer from "./slices/loginModalSlice"
export const store = configureStore({
  reducer: {
    cartReducer,
loginReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;