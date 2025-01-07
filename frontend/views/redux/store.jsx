import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./feature/cartSlice";
import prodAPI from './feature/prodAPI';
import catAPI from './feature/catAPI';
import orderAPI from './feature/orderAPI';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [prodAPI.reducerPath]: prodAPI.reducer,
    [catAPI.reducerPath]: catAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(prodAPI.middleware, catAPI.middleware, orderAPI.middleware),
})