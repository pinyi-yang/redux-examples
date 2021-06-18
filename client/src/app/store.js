import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../examples/Counter/counterSlice"

export default configureStore({
    reducer: {
        counter: counterReducer
    }
})