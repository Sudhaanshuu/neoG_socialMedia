import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from "../features/post/postSlice";
import userSliceReducer from "../features/user/userSlice";


export default configureStore({
    reducer:{
        posts: postSliceReducer,
        users: userSliceReducer
    }
})