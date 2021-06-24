import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: [
        {id: "0", name: "Pinyi Yang"},
        {id: "1", name: "Shadow Nova"},
        {id: "3", name: "Random Person"}
    ],
    reducers: {

    }
});

export default userSlice.reducer;