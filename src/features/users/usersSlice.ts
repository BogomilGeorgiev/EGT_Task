import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { stateStatuses } from "../../constants";
import { RootState } from "../../store";
import { User as UserType } from "../../types/types";

type UsersState<Data> = {
  users: Data;
  status: string;
  error: string | null;
};

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// Using middleWare Thunk for the fetching

export const fetchUsers = createAsyncThunk<UserType[]>(
  "users/fetchUsers",
  async () => {
    const res = await axios.get(USERS_URL);
    const { data } = res;
    return data;
  }
);

const initialState: UsersState<UserType[]> = {
  users: [],
  status: stateStatuses.IDLE,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      // id and originalData = action.payload,
      //we can also use prepare(id, data) but it looks cleaner to me this way
      const { id, data } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...data };
      }
    },
    revertToOriginal: (state, action) => {
      const { id, originalData } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index] = originalData;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = stateStatuses.LOADING;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserType[]>) => {
          state.status = stateStatuses.SUCCEEDED;
          state.users = action.payload;
        }
      )
      .addCase(
        fetchUsers.rejected,
        (
          state,
          action: PayloadAction<unknown, string, never, SerializedError>
        ) => {
          state.status = stateStatuses.REJECTED;
          state.error = action.error.message || "An unknown error occured";
        }
      );
  },
});

export const { updateUserData, revertToOriginal } = usersSlice.actions;

export const getUsers = (state: RootState) => state.users.users;

export const getUsersStatus = (state: RootState) => state.users.status;

export const getUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
