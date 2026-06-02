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

// BÜTÜN DATA ÜÇÜN TƏK THUNK
export const fetchAllData = createAsyncThunk("home/fetchAllData", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get(`/latest`);
        return res.data.record; // Bütöv obyekti (users, tasks, vs.) qaytarırıq
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const addUser = createAsyncThunk("home/addUser", async ({ newUser, fullData }, { rejectWithValue }) => {
    try {
        // Mövcud datanın üzərinə yeni istifadəçini əlavə edirik
        const updatedData = {
            ...fullData,
            users: [...(fullData.users || []), newUser]
        };

        // Bütöv obyekti PUT sorğusu ilə göndəririk
        await axiosInstance.put("/", updatedData);

        // Yenilənmiş datanı qaytarırıq ki, state avtomatik güncellənsin
        return updatedData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addTask = createAsyncThunk("home/addTask", async ({ newTask, fullData }, { rejectWithValue }) => {
    try {
        // Mövcud bazanın üzərinə yeni tapşırığı əlavə edirik
        const updatedData = {
            ...fullData,
            tasks: [...(fullData.tasks || []), newTask]
        };

        // Bütöv obyekti serverə yazırıq
        await axiosInstance.put("/", updatedData);
        
        return updatedData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const addPosition = createAsyncThunk("home/addPosition", async ({ newPosition, fullData }, { rejectWithValue }) => {
    try {
        // Yeni vəzifəni əlavə edib bütöv obyekti yenidən qururuq
        const updatedData = {
            ...fullData,
            positions: [...(fullData.positions || []), newPosition]
        };

        // Serverə bütöv obyekti göndəririk
        await axiosInstance.put("/", updatedData);
        
        return updatedData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const changePosition = createAsyncThunk("home/changePosition", async ({ userId, newPosition, fullData }, { rejectWithValue }) => {
    try {
        // İşçini tapırıq və məlumatlarını yeniləyirik
        const updatedUsers = fullData.users.map(user => 
            user.id === userId 
            ? { ...user, positionId: newPosition.id, positionName: newPosition.name } 
            : user
        );

        const updatedData = {
            ...fullData,
            users: updatedUsers
        };

        await axiosInstance.put("/", updatedData);
        return updatedData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const initialState = {
    currentUser: localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null,
    data: { users: [], tasks: [], positions: [], services: [], orders: [] }, // Bütün baza burada
    loading: false,
    error: null
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => { state.currentUser = action.payload; },
        logOutUser: (state) => { state.currentUser = null; localStorage.removeItem("currentUser"); }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllData.pending, (state) => { state.loading = true; })
            .addCase(fetchAllData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Bütün datanı state-ə yazırıq
            })
            // addUser sonrası state-i yeniləyirik
            .addCase(addUser.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(addPosition.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(changePosition.fulfilled, (state, action) => {
                state.data = action.payload;
            })
    }
});

export const { setCurrentUser, logOutUser } = homeSlice.actions;
export default homeSlice.reducer;