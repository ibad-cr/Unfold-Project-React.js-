import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userList: (state, action) => {
            return action.payload;
        },
    },
});

export default userSlice.reducer;
export const { userList } = userSlice.actions;
