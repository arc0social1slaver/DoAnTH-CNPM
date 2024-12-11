import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./feature/cartSlice";
import prodAPI from './feature/prodAPI';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [prodAPI.reducerPath]: prodAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(prodAPI.middleware),
})