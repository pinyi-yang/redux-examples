import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const increaseAsync = createAsyncThunk("counter/increaseAsync", async delay => {
    const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, delay)
    })
    return result;
});

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0,
        error: null,
        status: "idle"
    },
    reducers: {
        increase: state => {
            state.value += 1;
        },
        reset: state => {
            state.value = 0
        },
        increaseByText: {
            reducer(state, action) {
                state.value += action.payload
            },
            prepare(textNum) {
                const convertMap = {one: 1, two: 2, three: 3};

                return {
                    payload: convertMap[textNum]
                }
            }
        }
    },
    extraReducers: {
        [increaseAsync.pending]: (state) => { state.status = "pending"},
        [increaseAsync.fulfilled]: (state, action) => {
            console.log(action) 
            state.status = "succeeded";
            state.value += 1;
        }
    }
});


export const { increase, reset, increaseByText } = counterSlice.actions

export default counterSlice.reducer;