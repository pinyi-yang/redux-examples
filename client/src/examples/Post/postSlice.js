import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    console.log("fetchPosts")
    const response = await axios.get("/postexample/posts");
    return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (data) => {
    const response = await axios.post("/postexample/posts", data);
    return response.data;
});

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: "idle",
        error: null
    },
    reducers: {
        postUpdated: (state, action) => {
            const {id, title, content } = action.payload;
            const existingPost = state.posts.find(post => post.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);

            if (existingPost) {
                existingPost.reactions[reaction] += 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(addPost.fulfilled, (state,action) => {
                state.status = "succeeded";
            })
            .addMatcher(
                (action) => action.type.endsWith("rejected") && action.type.startsWith("posts"),
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error;
                }
            )
            .addMatcher(
                action => action.type.endsWith("pending") && action.type.startsWith("posts"),
                (state, action) => { state.status = "loading" }
            )
    }
    
    // {
    //     // [fetchPosts.random]: (state, action) => {
    //     //     state.status = "random"
    //     // },
    //     [fetchPosts.pending]: (state, action) => {
    //         state.status = "loading";
    //     },
    //     [fetchPosts.fulfilled]: (state, action) => {
    //         state.status = "succeeded";
    //         state.posts = state.posts.concat(action.payload);
    //     },
    //     [fetchPosts.rejected]: (state, action) => {
    //         state.status = "failed";
    //         state.error = action.error.meesage;
    //     }
    // }
});

export default postsSlice.reducer;
export const { postUpdated, reactionAdded } = postsSlice.actions

//selectors
export const selectAllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)