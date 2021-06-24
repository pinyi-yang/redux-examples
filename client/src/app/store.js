import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../examples/Counter/counterSlice";
import postsReducer from "../examples/Post/postSlice";
import userReducer from "../examples/Users/userSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        users: userReducer
    }
})