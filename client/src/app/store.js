import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../examples/Counter/counterSlice";
import counter2Reducer from "../examples/Counter2/counter2Slice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        counter2: counter2Reducer
    }
})