import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myTasks: [],
    name : "huseyn"
}

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        getMyTasks: (state, action) => {
            state.myTasks = action.payload
        }
    }
})

export const { getMyTasks } = homeSlice.actions
export default homeSlice.reducer