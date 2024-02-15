import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./slices/toggleSidebar";
import { apiSlice } from "./API/apiSlice";

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.VITE_ENV == "development" ? true : false,
});
export default store;
