import { configureStore } from '@reduxjs/toolkit'
import signInSliceReducer from '../Slices/signInSlice'
import adminSliceReducer from '../Slices/adminSlice'
import homeSliceReducer from '../Slices/homeSlice'

export const store = configureStore({
    reducer: {
        signInSlice: signInSliceReducer,
        adminSlice: adminSliceReducer,
        homeSlice: homeSliceReducer
    },
})