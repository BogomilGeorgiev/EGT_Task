import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/users/usersSlice";
import postsSlice from "./features/posts/postsSlice";
import tasksSlice from "./features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    tasks: tasksSlice,
  },
});

export default store;
// https://redux-toolkit.js.org/tutorials/typescript from here
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
