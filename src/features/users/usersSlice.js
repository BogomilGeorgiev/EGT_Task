import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stateStatuses } from "../../constants";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

// Using middleWare Thunk for the fetching

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await axios.get(USERS_URL);
    const { data } = res;
    return data;
})

const initialState = {
    users: [],
    status: stateStatuses.IDLE,
    error: null
}


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            // id and originalData = action.payload, 
            //we can also use prepare(id, data) but it looks cleaner to me this way
            const { id, data } = action.payload;
            const index = state.users.findIndex(user => user.id === id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...data };
            }
        },
        revertToOriginal: (state, action) => {
            const { id, originalData } = action.payload;
            const index = state.users.findIndex(user => user.id === id);
            if (index !== -1) {
                state.users[index] = originalData;
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = stateStatuses.LOADING;
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = stateStatuses.SUCCEEDED;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = stateStatuses.REJECTED;
                state.error = action.error.message;
            })
    }

})

export const { updateUserData, revertToOriginal } = usersSlice.actions;

export const getUsers = (state) => state.users.users;

export const getUsersStatus = (state) => state.users.status;

export const getUsersError = (state) => state.users.error;


export default usersSlice.reducer;