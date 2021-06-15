import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api_details";

export const loadPosts = createAsyncThunk("post/loadPosts", async () => {
  const response = await axios.get(`${API_URL}/post`);
  return response.data;
});

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status:"",
  },
  reducers: {
    likeButtonPressed: (state, { payload }) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === payload.postId
      );
      if (state.posts[postIndex].likes.includes(payload.user)) {
        state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
          (userId) => userId !== payload.user
        );
      } else {
        state.posts[postIndex].likes = state.posts[postIndex].likes.concat(
          payload.user
        );
      }
    },
    commentButtonPressed: (state, { payload }) => {
      let data = {};
      const postIndex = state.posts.findIndex(
        (post) => post._id === payload.postId
      );
      data._id = `c${state.posts[postIndex].comments.length + 1}`;
      data.user = payload.user;
      data.comment = payload.comment;
      data.created = new Date();
      state.posts[postIndex].comments =
        state.posts[postIndex].comments.concat(data);
    },
    postButtonPressed: (state, { payload }) => {
      let newPost = {
        created: new Date(),
        likes: [],
        comments: [],
      };
      newPost._id = `p${state.posts.length + 1}`;
      newPost.description = payload.desc;
      newPost.user = payload.user;
      state.posts = state.posts.concat(newPost);
    },
  },
  extraReducers:{
    [loadPosts.pending]:(state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.status = "fulfilled";
    },
    [loadPosts.rejected]: (state, action) => {
      console.log(action);
      state.status = "rejected";
    },
  }
});

export const { likeButtonPressed, commentButtonPressed, postButtonPressed, clearStatus } = postSlice.actions;
export default postSlice.reducer;
