import { createSlice } from "@reduxjs/toolkit"
import cookies from 'react-cookies'

export const userSlice = createSlice ({
    name: "user",
    initialState: {
        user: cookies.load('user'),
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
})

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user
export default userSlice.reducer