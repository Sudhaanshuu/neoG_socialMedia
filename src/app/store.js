import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from "../features/post/postSlice";
import userSliceReducer from "../features/user/userSlice";
import authenticationReducer from "../features/authentication/authenticationSlice";
import notificationReducer from "../features/notifications/notificationSlice";

export default configureStore({
  reducer: {
    posts: postSliceReducer,
    users: userSliceReducer,
    auth: authenticationReducer,
    notify: notificationReducer,
  },
});
