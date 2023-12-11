import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: localStorage.getItem('isAuth') ? JSON.parse(localStorage.getItem('isAuth')) : false,
    users: [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
    tasks: []
}
export const singInSlice = createSlice({
    name: "signIn",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        getTasks: (state, action) => {
            state.tasks = action.payload
        }
    }
})

export const { setUsers, getTasks } = singInSlice.actions
export default singInSlice.reducer