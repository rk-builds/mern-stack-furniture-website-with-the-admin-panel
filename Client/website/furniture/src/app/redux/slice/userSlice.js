import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"

export let userSlice = createSlice(
    {
        name: "user",
        initialState: {
            user: Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null,
            token: Cookies.get('TOKEN') ?? ""
        },
        reducers: {
            userData: function (state, action) {
                let { payload } = action
                state.user = payload.user
                state.token = payload.token
                Cookies.set("USER", JSON.stringify(state.user))
                Cookies.set("TOKEN", state.token)
            },
            logout: function (state, action) {
                state.user = null
                state.token = ''
                Cookies.remove("USER")
                Cookies.remove("TOKEN")
            }
        }
    }
)

export default userSlice.reducer
export let { userData, logout } = userSlice.actions