import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../Utils/confiq";

// 1. İstifadəçiləri çəkmək üçün Thunk
export const fetchUsers = createAsyncThunk(
    "home/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${apiUrl}/users`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message || "Users fetch failed");
        }
    }
);

// 2. Taskları çəkmək üçün Thunk
export const fetchTasks = createAsyncThunk(
    "home/fetchTasks",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${apiUrl}/tasks`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message || "Tasks fetch failed");
        }
    }
);

// 3. Vəzifələri (Positions) çəkmək üçün Thunk
export const fetchPositions = createAsyncThunk(
    "home/fetchPositions",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${apiUrl}/positions`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message || "Positions fetch failed");
        }
    }
);

// 4. Biznes Xidmətlərini (Services) çəkmək üçün Thunk
export const fetchServices = createAsyncThunk(
    "home/fetchServices",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${apiUrl}/services`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message || "Services fetch failed");
        }
    }
);

const initialState = {
    currentUser: localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null,
    users: [],
    tasks: [],
    positions: [],
    services: [],
    loadingStates: {
        usersLoading: false,
        tasksLoading: false,
        positionsLoading: false,
        servicesLoading: false
    },
    error: null
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        logOutUser: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        }
    },
    extraReducers: (builder) => {
        builder
            // Users Reducers
            .addCase(fetchUsers.pending, (state) => {
                state.loadingStates.usersLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loadingStates.usersLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loadingStates.usersLoading = false;
                state.error = action.payload;
            })

            // Tasks Reducers
            .addCase(fetchTasks.pending, (state) => {
                state.loadingStates.tasksLoading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loadingStates.tasksLoading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loadingStates.tasksLoading = false;
                state.error = action.payload;
            })

            // Positions Reducers
            .addCase(fetchPositions.pending, (state) => {
                state.loadingStates.positionsLoading = true;
            })
            .addCase(fetchPositions.fulfilled, (state, action) => {
                state.loadingStates.positionsLoading = false;
                state.positions = action.payload;
            })
            .addCase(fetchPositions.rejected, (state, action) => {
                state.loadingStates.positionsLoading = false;
                state.error = action.payload;
            })

            // Services Reducers
            .addCase(fetchServices.pending, (state) => {
                state.loadingStates.servicesLoading = true;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loadingStates.servicesLoading = false;
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loadingStates.servicesLoading = false;
                state.error = action.payload;
            });
    }
});

export const { setCurrentUser, logOutUser } = homeSlice.actions;
export default homeSlice.reducer;