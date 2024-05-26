import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (userId) => {
    const res = await axios.get(`${POSTS_URL}?userId=${userId}`);
    const { data } = res;
    return data;
})

export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
    const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
    // return null ? 
    return res.data;
})

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
    await axios.delete(`${POSTS_URL}/${postId}`);
    // return null ? 
    return postId;
})

const initialState = {
    posts: [],
    status: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
    error: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //data = action.payload
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
            // to add pending and rejected status
            .addCase(updatePost.pending, (state) => {
                state.updateStatus = 'loading';
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';

                const index = state.posts.findIndex(post => post.id === action.payload.id);
                state.posts[index] = action.payload;

            })
            .addCase(updatePost.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(deletePost.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post.id !== action.payload);
                state.deleteStatus = 'succeded';

            })
            .addCase(deletePost.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.error.message;
            })

    }
})

export default postsSlice.reducer;
