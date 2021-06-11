import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from "../features/post/postSlice";
import userSliceReducer from "../features/user/userSlice";
import authenticationReducer from "../features/authentication/authenticationSlice";



export default configureStore({
    reducer:{
        posts: postSliceReducer,
        users: userSliceReducer,
        auth: authenticationReducer
    }
})