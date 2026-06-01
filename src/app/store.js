import { configureStore } from '@reduxjs/toolkit'
import signInSliceReducer from '../Slices/signInSlice'
import homeSliceReducer from '../Slices/homeSlice'

export const store = configureStore({
    reducer: {
        signInSlice: signInSliceReducer,
        homeSlice: homeSliceReducer
    },
})