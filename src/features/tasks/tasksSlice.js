import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { stateStatuses } from "../../constants";

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const res = await axios.get(TASKS_URL);
    const { data } = res;
    return data;
})

const initialState = {
    tasks: [],
    status: stateStatuses.IDLE,
    error: null

}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateTaskStatus: (state, action) => {
            const { id, completed } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) task.completed = completed;

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
            state.status = stateStatuses.LOADING;

        })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.status = stateStatuses.SUCCEEDED;


            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = stateStatuses.REJECTED;
                state.error = action.error.message;
            })
    }
})

export const { updateTaskStatus } = tasksSlice.actions;

export const getTasks = (state) => state.tasks.tasks;

export const getTasksStatus = (state) => state.tasks.status;

export const getTasksError = (state) => state.tasks.error;

export default tasksSlice.reducer;
