import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api_details";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await axios.get(`${API_URL}/users/all`);
  return response.data;
});

export const toggleFollowButton = createAsyncThunk(
  "user/toggleFollowButton",
  async (viewerId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/users`, { viewerId });
      if (data.success) {
        return fulfillWithValue({ user: data.user, viewer: data.viewer });
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (userData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/users`, {
        name: userData.name,
        bio: userData.bio,
        image: userData.image,
        link: userData.link,
      });
      if (data.success) {
        return fulfillWithValue(data.user);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "",
    loading: false,
  },
  reducers: {
    startLoadingUser: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload.users;
      state.status = "fulfilled";
      state.loading = false;
    },
    [getUsers.rejected]: (state, action) => {
      console.error(action.payload);
      state.status = "rejected";
      state.loading = false;
    },
    [updateUserDetails.fulfilled]: (state, { payload }) => {
      state.users = state.users.map((user) =>
        user._id === payload._id ? payload : user
      );
      state.loading = false;
    },
    [updateUserDetails.rejected]: (state, action) => {
      console.error(action.payload);
      state.loading = false;
    },
    [toggleFollowButton.fulfilled]: (state, { payload }) => {
      const userIndex = state.users.findIndex(
        (user) => user._id === payload.user._id
      );
      const viewerIndex = state.users.findIndex(
        (user) => user._id === payload.viewer._id
      );
      state.users[userIndex] = payload.user;
      state.users[viewerIndex] = payload.viewer;
      state.loading = false;
    },
    [toggleFollowButton.rejected]: (state, action) => {
      console.error(action.payload);
      state.loading = false;
    },
  },
});
export const { startLoadingUser } = userSlice.actions;
export default userSlice.reducer;
