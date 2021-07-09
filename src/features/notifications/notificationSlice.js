import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api_details";

export const getUserNotifications = createAsyncThunk(
  "notification/getUserNotification",
  async () => {
    const response = await axios.get(`${API_URL}/notify`);
    return response.data;
  }
);

export const clearNotification = createAsyncThunk(
  "notification/clearNotification",
  async ({ notificationId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/notify`, {
        notificationId,
      });
      if (data.success) {
        return fulfillWithValue(data.notification);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const clearAllNotifications = createAsyncThunk(
  "notification/clearAllNotifications",
  async () => {
    const { data } = await axios.delete(`${API_URL}/notify`);
    return data.success;
  }
);

export const notificationSlice = createSlice({
  name: "Notification",
  initialState: {
    notifications: [],
    status: "",
    loading: false,
  },
  reducers: {
    startLoadingNotifications: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [getUserNotifications.pending]: (state) => {
      state.status = "pending";
    },
    [getUserNotifications.fulfilled]: (state, { payload }) => {
      state.notifications = payload.notifications;
      state.status = "fulfilled";
      state.loading = false;
    },
    [getUserNotifications.rejected]: (state, action) => {
      console.error(action.payload);
      state.status = "rejected";
      state.loading = false;
    },
    [clearNotification.pending]: (state) => {
      state.status = "pending";
    },
    [clearNotification.fulfilled]: (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== payload._id
      );
      state.status = "fulfilled";
      state.loading = false;
    },
    [clearNotification.rejected]: (state, action) => {
      console.error(action.payload);
      state.status = "rejected";
      state.loading = false;
    },
    [clearAllNotifications.pending]: (state) => {
      state.status = "pending";
    },
    [clearAllNotifications.fulfilled]: (state, { payload }) => {
      state.notifications = [];
      state.status = "fulfilled";
      state.loading = false;
    },
    [clearAllNotifications.rejected]: (state, action) => {
      console.error(action.payload);
      state.status = "rejected";
      state.loading = false;
    },
  },
});

export const { startLoadingNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
