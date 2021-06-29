import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../examples/Counter/counterSlice";
import postsReducer from "../examples/Post/postSlice";
import userReducer from "../examples/Users/userSlice";
import notificationReducer from "../examples/Notifications/notificationSlice"

export default configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        users: userReducer,
        notifications: notificationReducer
    }
})