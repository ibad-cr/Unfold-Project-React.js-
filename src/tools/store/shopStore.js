import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "../slice/shopSlice";
import usersSlice from "../slice/usersSlice";

const store = configureStore({
    reducer: {
        shop: shopSlice,
        user: usersSlice
    },
});

export default store;
