import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        shopList: (state, action) => {
            return action.payload;
        },
    },
});

export default slice.reducer;
export const { shopList } = slice.actions;
