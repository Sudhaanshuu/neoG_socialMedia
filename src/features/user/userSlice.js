import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api_details";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "",
  },
  reducers: {
    toggleFollow: (state, { payload }) => {
      const userIndex = state.users.findIndex(
        (user) => user._id === payload.user
      );
      const currentUserIndex = state.users.findIndex(
        (user) => user._id === payload.currentUser
      );
      if (state.users[userIndex].followers.includes(payload.currentUser)) {
        state.users[userIndex].followers = state.users[
          userIndex
        ].followers.filter((id) => id !== payload.currentUser);
        state.users[currentUserIndex].following = state.users[
          currentUserIndex
        ].following.filter((id) => id !== payload.user);
      } else {
        state.users[userIndex].followers = state.users[
          userIndex
        ].followers.concat(payload.currentUser);
        state.users[currentUserIndex].following = state.users[
          currentUserIndex
        ].following.concat(payload.user);
      }
    },
    updateProfile: (state, { payload }) => {
      const userIndex = state.users.findIndex(
        (user) => user._id === payload._id
      );
      state.users[userIndex] = { ...payload };
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload.users;
      state.status = "fulfilled";
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { toggleFollow, updateProfile } = userSlice.actions;
export default userSlice.reducer;
