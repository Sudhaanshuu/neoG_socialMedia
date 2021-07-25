import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api_details";

export const loadPosts = createAsyncThunk("post/loadPosts", async () => {
  const response = await axios.get(`${API_URL}/post`);
  return response.data;
});

export const likeButtonPressed = createAsyncThunk(
  "post/likeButtonPressed",
  async ({ postId, postedUser }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/post/${postId}/like`);
      if (data.success) {
        await axios.post(`${API_URL}/notify`, {
          notifiedUser: postedUser,
          actionType: "like",
          post: postId,
        });
        return fulfillWithValue(data.post);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const commentButtonPressed = createAsyncThunk(
  "post/commentButtonPressed",
  async (
    { postId, comment, postedUser },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}/post/${postId}/comment`, {
        comment,
      });
      if (data.success) {
        await axios.post(`${API_URL}/notify`, {
          notifiedUser: postedUser,
          actionType: "comment",
          post: postId,
        });

        return fulfillWithValue({ comments: data.comments, postId });
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteCommentPressed = createAsyncThunk(
  "post/deleteCommentPressed",
  async ({ postId, commentId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/post/${postId}/comment`, {
        _id: commentId,
      });
      if (data.success) {
        return fulfillWithValue({ commentId, postId });
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const postButtonPressed = createAsyncThunk(
  "post/postButtonPressed",
  async ({ postData }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/post`, {
        description: postData,
      });
      if (data.success) {
        return fulfillWithValue(data.post);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deletePostPressed = createAsyncThunk(
  "post/deletePostPressed",
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/post`, {
        _id: postId,
      });
      if (data.success) {
        return fulfillWithValue(postId);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status: "",
    loading: false,
  },
  reducers: {
    startLoadingPost: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.status = "fulfilled";
      state.loading = false;
    },
    [loadPosts.rejected]: (state, action) => {
      console.error(action.payload);
      state.status = "rejected";
      state.loading = false;
    },
    [likeButtonPressed.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );
      state.loading = false;
    },
    [likeButtonPressed.rejected]: (state, action) => {
      console.error(action.payload);
      state.loading = false;
    },
    [commentButtonPressed.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.map((post) =>
        post._id === payload.postId
          ? { ...post, comments: payload.comments }
          : post
      );
      state.loading = false;
    },
    [commentButtonPressed.rejected]: (state, action) => {
      console.error(action.payload);
      state.loading = false;
    },
    [deleteCommentPressed.fulfilled]: (state, { payload }) => {
      let postIndex = state.posts.findIndex(
        (post) => post._id === payload.postId
      );
      state.posts[postIndex].comments = state.posts[postIndex].comments.filter(
        (comment) => comment._id !== payload.commentId
      );
      state.loading = false;
    },
    [deleteCommentPressed.rejected]: (state, action) => {
      console.error(action.payload);
      state.loading = false;
    },
    [postButtonPressed.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.concat(payload);
      state.loading = false;
    },
    [postButtonPressed.rejected]: (state, action) => {
      console.error(action.payload);
      state.loading = false;
    },
    [deletePostPressed.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post._id !== payload);
      state.loading = false;
    },
    [deletePostPressed.rejected]: (state, action) => {
      console.error(action.payload);
      state.loading = false;
    },
  },
});
export const { startLoadingPost } = postSlice.actions;
export default postSlice.reducer;
