import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "./api/apiSlice";
import authSlice from "./features/Auth/authSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

})
export default store