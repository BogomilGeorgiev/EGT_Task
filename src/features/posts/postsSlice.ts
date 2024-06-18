import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { stateStatuses } from "../../constants.js";
import { RootState } from "../../store.js";
import { Post as PostType } from "../../types/types.js";

type PostsState<PostsData> = {
  posts: PostsData;
  status: string;
  updateStatus: string;
  deleteStatus: string;
  error: string | null;
};

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk<PostType[], number>(
  "posts/fetchPosts",
  async (userId) => {
    const res = await axios.get(`${POSTS_URL}?userId=${userId}`);
    const { data } = res;
    return data;
  }
);

export const updatePost = createAsyncThunk<PostType, PostType>(
  "posts/updatePost",
  async (post) => {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      post
    );
    return res.data;
  }
);

export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (postId) => {
    await axios.delete(`${POSTS_URL}/${postId}`);
    return postId;
  }
);

const initialState: PostsState<PostType[]> = {
  posts: [],
  status: stateStatuses.IDLE,
  updateStatus: stateStatuses.IDLE,
  deleteStatus: stateStatuses.IDLE,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = stateStatuses.LOADING;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostType[]>) => {
          state.status = stateStatuses.SUCCEEDED;
          state.posts = action.payload;
        }
      )
      .addCase(
        fetchPosts.rejected,
        (
          state,
          action: PayloadAction<unknown, string, never, SerializedError>
        ) => {
          state.status = stateStatuses.REJECTED;
          state.error = action.error.message || "An unknown error occured";
        }
      )
      .addCase(updatePost.pending, (state) => {
        state.updateStatus = stateStatuses.LOADING;
      })
      .addCase(
        updatePost.fulfilled,
        (state, action: PayloadAction<PostType>) => {
          state.updateStatus = stateStatuses.SUCCEEDED;

          const index = state.posts.findIndex(
            (post) => post.id === action.payload.id
          );
          state.posts[index] = action.payload;
        }
      )
      .addCase(
        updatePost.rejected,
        (
          state,
          action: PayloadAction<unknown, string, never, SerializedError>
        ) => {
          state.updateStatus = stateStatuses.REJECTED;
          state.error = action.error.message || "An unknown error occured";
        }
      )
      .addCase(deletePost.pending, (state) => {
        state.deleteStatus = stateStatuses.LOADING;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        state.deleteStatus = stateStatuses.SUCCEEDED;
      })
      .addCase(
        deletePost.rejected,
        (
          state,
          action: PayloadAction<unknown, string, never, SerializedError>
        ) => {
          state.deleteStatus = stateStatuses.REJECTED;
          state.error = action.error.message || "An unknown error occured";
        }
      );
  },
});

export const getPosts = (state: RootState) => state.posts.posts;

export const getFetchPostsStatus = (state: RootState) => state.posts.status;

export const getUpdatePostStatus = (state: RootState) =>
  state.posts.updateStatus;

export const getDeletePostStatus = (state: RootState) =>
  state.posts.deleteStatus;

export const getPostsError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;
