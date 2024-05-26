import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

// Using middleWare Thunk for the fetching

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await axios.get(USERS_URL);
    const { data } = res;
    return data;
})

const initialState = {
    users: [],
    status: 'idle',
    error: null
}



const userSlice = createSlice({
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
            // id and originalData = action.payload, 
            const { id, originalData } = action.payload;
            const index = state.users.findIndex(user => user.id === id);
            if (index !== -1) {
                state.users[index] = originalData;
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //data = action.payload
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
    }

})

export const { updateUserData, revertToOriginal } = userSlice.actions;


export default userSlice.reducer;