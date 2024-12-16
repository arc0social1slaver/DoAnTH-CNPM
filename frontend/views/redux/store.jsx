import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./feature/cartSlice";
import prodAPI from './feature/prodAPI';
import catAPI from './feature/catAPI';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [prodAPI.reducerPath]: prodAPI.reducer,
    [catAPI.reducerPath]: catAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(prodAPI.middleware, catAPI.middleware),
})