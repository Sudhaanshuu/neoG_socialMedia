import { createSlice } from "@reduxjs/toolkit";
import { PostData } from "../../database/posts";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: PostData,
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
});

export const { likeButtonPressed, commentButtonPressed, postButtonPressed } = postSlice.actions;
export default postSlice.reducer;
