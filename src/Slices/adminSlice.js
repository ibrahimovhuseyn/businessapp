import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    positions: []
}
export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        getPosition: (state, action) => { 
            state.positions=action.payload
        }
    }
})
export const {getPosition } = adminSlice.actions
export default adminSlice.reducer