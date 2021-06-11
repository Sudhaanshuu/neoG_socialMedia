import { createSlice } from "@reduxjs/toolkit";
import { UsersData } from "../../database/users";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: UsersData,
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
        state.users[currentUserIndex].following = state.users[currentUserIndex].following.filter((id) => id !== payload.user);
      } else {
        state.users[userIndex].followers = state.users[
          userIndex
        ].followers.concat(payload.currentUser);
        state.users[currentUserIndex].following = state.users[
          currentUserIndex
        ].following.concat(payload.user);
      }
    },
    updateProfile: (state, {payload}) => {
      const userIndex = state.users.findIndex(
        (user) => user._id === payload._id
      );
      state.users[userIndex] = {...payload};
  }
  },
});

export const { toggleFollow, updateProfile } = userSlice.actions;
export default userSlice.reducer;
