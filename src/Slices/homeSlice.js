import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BIN_ID, MASTER_KEY } from "../Utils/confiq";

const axiosInstance = axios.create({
    baseURL: `https://api.jsonbin.io/v3/b/${BIN_ID}`,
    headers: {
        "X-Master-Key": MASTER_KEY,
        "Content-Type": "application/json"
    }
});

// THUNK FUNKSİYALARI
export const fetchAllData = createAsyncThunk("home/fetchAllData", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get(`/latest`);
        return res.data.record;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addUser = createAsyncThunk("home/addUser", async ({ newUser, fullData }, { rejectWithValue }) => {
    try {
        const updatedData = { ...fullData, users: [...(fullData.users || []), newUser] };
        await axiosInstance.put("/", updatedData);
        return updatedData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addTask = createAsyncThunk("home/addTask", async ({ newTask, fullData }, { rejectWithValue }) => {
    try {
        const updatedData = { ...fullData, tasks: [...(fullData.tasks || []), newTask] };
        await axiosInstance.put("/", updatedData);
        return updatedData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addPosition = createAsyncThunk("home/addPosition", async ({ newPosition, fullData }, { rejectWithValue }) => {
    try {
        const updatedData = { ...fullData, positions: [...(fullData.positions || []), newPosition] };
        await axiosInstance.put("/", updatedData);
        return updatedData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const changePosition = createAsyncThunk("home/changePosition", async ({ userId, newPosition, fullData }, { rejectWithValue }) => {
    try {
        const updatedUsers = fullData.users.map(user =>
            user.id === userId ? { ...user, positionId: newPosition.id, positionName: newPosition.name } : user
        );
        const updatedData = { ...fullData, users: updatedUsers };
        await axiosInstance.put("/", updatedData);
        return updatedData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateTaskStatus = createAsyncThunk(
    "home/updateTaskStatus",
    async ({ taskId, status, isFinished, fullData }, { rejectWithValue }) => {
        try {
            // Taskı tapıb dəyişirik
            const updatedTasks = fullData.tasks.map(task =>
                task.id === taskId
                    ? { ...task, status: status, isFinished: isFinished }
                    : task
            );

            const updatedData = {
                ...fullData,
                tasks: updatedTasks
            };

            await axiosInstance.put("/", updatedData);
            return updatedData; // State-i yeniləmək üçün
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addOrder = createAsyncThunk("home/addOrder", async ({ newOrder, fullData }, { rejectWithValue }) => {
    try {
        const updatedData = { ...fullData, orders: [...(fullData.orders || []), newOrder] };
        await axiosInstance.put("/", updatedData);
        return updatedData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});



const initialState = {
    currentUser: localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null,
    data: { users: [], tasks: [], positions: [], services: [], orders: [] },
    loading: false,
    error: null
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => { state.currentUser = action.payload; },
        logOutUser: (state) => { state.currentUser = null; localStorage.removeItem("currentUser"); },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Bütün thunklar üçün loading-i aktivləşdir
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            // Bütün thunklar üçün uğurlu cavabda loading-i dayandır və datanı yenilə
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            // Bütün thunklar üçün xəta olduqda loading-i dayandır və xətanı qeyd et
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );

    }
});

export const { setCurrentUser, logOutUser, setLoading } = homeSlice.actions;
export default homeSlice.reducer;