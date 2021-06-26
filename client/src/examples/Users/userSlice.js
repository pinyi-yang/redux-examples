import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get("/users");
    return response.data;
});

export const addUser = createAsyncThunk("users/addUser", async (name) => {
    const response = await axios({
        method: "POST",
        url: "/users",
        data: {
            name
        }
    });
    return response.data;
})

export const userSlice = createSlice({
    name: "users",
    initialState: {
        status: "idle",
        data: [],
        error: null
    },
    reducers: {
        
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                console.log("fecth users success: ", action)
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                console.log("add users success: ", action)
                state.status = "succeeded";
                state.data.push(action.payload);
            })
            .addMatcher(
                (action) => action.type.endsWith("rejected"),
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error;
                }
            )
            .addMatcher(
                action => action.type.endsWith("pending"),
                (state, action) => { state.status = "loading" }
            )
    }
    
    // {
    //     [fetchUsers.pending]: (state) => {
    //         state.status = "loading";
    //     },
    //     [fetchUsers.fulfilled]: (state, action) => {
    //         state.status = "succeded";
    //         state.data = action.payload;
    //     },
    //     [fetchUsers.rejected]: (state, action) => {
    //         console.log("fetch users rejected")
    //         console.log(action)
    //         state.status = "failed";
    //         state.error = action.error.message
    //     }
    // }
});

export const selectAllUsers = state => state.users.data;
export const selectUserById = (state, userId) => state.users.data.find(user => user.id === userId)

export default userSlice.reducer;