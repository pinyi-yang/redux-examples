import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../examples/Counter/counterSlice";
import postsSlice from "../examples/Post/postSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsSlice
    }
})