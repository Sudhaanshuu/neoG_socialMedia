import { createSlice } from "@reduxjs/toolkit";
import { PostData } from "../../database/posts";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: PostData,
  },
  reducers: {
    likeButtonPressed: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload
      );
      state.posts[postIndex].likes = state.posts[postIndex].likes.concat(
        action.payload
      );
    },
    addComment: (state, action) => {
      let data = {};
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.postId
      );
      data._id = `c${state.posts[postIndex].comments.length + 1}`;
      data.user = action.payload.user;
      data.comment = action.payload.comment;
      data.created = new Date();
      state.posts[postIndex].comments =
        state.posts[postIndex].comments.concat(data);
    },
  },
});

export const { likeButtonPressed, addComment } = postSlice.actions;
export default postSlice.reducer;
