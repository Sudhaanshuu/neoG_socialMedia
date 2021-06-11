import { createSlice } from "@reduxjs/toolkit";
import { PostData } from "../../database/posts";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: PostData,
  },
  reducers: {
    likeButtonPressed: (state, {payload}) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === payload.postId
      );
      if(state.posts[postIndex].likes.includes(payload.user)){
        state.posts[postIndex].likes = state.posts[postIndex].likes.filter(userId => userId !== payload.user);
      }
      else{
        state.posts[postIndex].likes = state.posts[postIndex].likes.concat(
          payload.user
        );
      }
      
    },
    addComment: (state, {payload}) => {
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
  },
});

export const { likeButtonPressed, addComment } = postSlice.actions;
export default postSlice.reducer;
