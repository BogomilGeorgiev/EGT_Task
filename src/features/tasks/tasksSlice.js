import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const res = await axios.get(TASKS_URL);
    const { data } = res;
    console.log(data);
    return data;
})



const initialState = {
    tasks: [],
    status: 'idle',
    error: null

}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateTaskStatus: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) task.completed = action.payload.completed;

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {

            state.status = 'loading';

        })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.status = 'succeded';


            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { updateTaskStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
