import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { stateStatuses } from "../../constants.js";
import { RootState } from "../../store.js";

type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TasksState<TasksData> = {
  tasks: TasksData;
  status: string;
  error: string | null;
};

const TASKS_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const res = await axios.get(TASKS_URL);
    const { data } = res;
    return data;
  }
);

const initialState: TasksState<Task[]> = {
  tasks: [],
  status: stateStatuses.IDLE,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTaskStatus: (state, action: PayloadAction<Task>) => {
      const { id, completed } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) task.completed = completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = stateStatuses.LOADING;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.status = stateStatuses.SUCCEEDED;
      })
      .addCase(
        fetchTasks.rejected,
        (
          state,
          action: PayloadAction<unknown, string, never, SerializedError>
        ) => {
          state.status = stateStatuses.REJECTED;
          state.error = action.error.message || "There was an error";
        }
      );
  },
});

export const { updateTaskStatus } = tasksSlice.actions;

export const getTasks = (state: RootState) => state.tasks.tasks;

export const getTasksStatus = (state: RootState) => state.tasks.status;

export const getTasksError = (state: RootState) => state.tasks.error;

export default tasksSlice.reducer;
