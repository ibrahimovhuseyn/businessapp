import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:JSON.parse((localStorage.getItem("currentUser"))),
    users: [],
    tasks: []
}

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload
        },
        getTasks: (state, action) => {
            state.tasks = action.payload
        },
        setCurrentUser : (state,action) =>{
            state.currentUser =action.payload
        }
    }
})

export const { getUsers, getTasks, setCurrentUser } = homeSlice.actions
export default homeSlice.reducer