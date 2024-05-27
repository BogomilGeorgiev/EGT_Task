import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/users/usersSlice";
import postsSlice from "./features/posts/postsSlice";
import tasksSlice from "./features/tasks/tasksSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice,
        posts: postsSlice,
        tasks: tasksSlice
    }
})

export default store;