import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { stateStatuses } from "../../constants";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (userId) => {
    const res = await axios.get(`${POSTS_URL}?userId=${userId}`);
    const { data } = res;
    return data;
})

export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
    const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
    return res.data;
})

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
    await axios.delete(`${POSTS_URL}/${postId}`);
    return postId;
})

const initialState = {
    posts: [],
    status: stateStatuses.IDLE,
    updateStatus: stateStatuses.IDLE,
    deleteStatus: stateStatuses.IDLE,
    error: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = stateStatuses.LOADING;
        })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = stateStatuses.SUCCEEDED;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = stateStatuses.REJECTED;
                state.error = action.error.message;
            })
            .addCase(updatePost.pending, (state) => {
                state.updateStatus = stateStatuses.LOADING;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.updateStatus = stateStatuses.SUCCEEDED;

                const index = state.posts.findIndex(post => post.id === action.payload.id);
                state.posts[index] = action.payload;

            })
            .addCase(updatePost.rejected, (state, action) => {
                state.updateStatus = stateStatuses.REJECTED;
                state.error = action.error.message;
            })
            .addCase(deletePost.pending, (state) => {
                state.deleteStatus = stateStatuses.LOADING;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post.id !== action.payload);
                state.deleteStatus = stateStatuses.SUCCEEDED;

            })
            .addCase(deletePost.rejected, (state, action) => {
                state.deleteStatus = stateStatuses.REJECTED;
                state.error = action.error.message;
            })

    }
})

export const getPosts = (state) => state.posts.posts;

export const getFetchPostsStatus = (state) => state.posts.status;

export const getUpdatePostStatus = (state) => state.posts.updateStatus;

export const getDeletePostStatus = (state) => state.posts.deleteStatus;

export const getPostsError = (state) => state.posts.error;




export default postsSlice.reducer;
