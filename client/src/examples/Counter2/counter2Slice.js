import { createSlice } from "@reduxjs/toolkit";

export const counter2Slice = createSlice({
    name: "counter2",
    initialState: {
        value: 0
    },
    
    reducers: {
        increase: {
            reducer(state, action) {
                state.value += action.payload
            },
            prepare(textNum) {
                const convertMap = {one: 1, two: 2, three: 3};

                return {
                    payload: convertMap[textNum]
                }
            }
        },
        reset: state => { state.value = 0 }
    }
});

export default counter2Slice.reducer;
export const {increase, reset} = counter2Slice.actions