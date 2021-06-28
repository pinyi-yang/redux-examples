import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get("/postexample/posts");
    return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId) => {
    const response = await axios.get(`/postexample/posts/${postId}`);
    return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (data) => {
    const response = await axios.post("/postexample/posts", data);
    return response.data;
});
export const updatePost = createAsyncThunk("posts/updatePost", async ({title, content, postId}) => {
    const response = await axios.put(`/postexample/posts/${postId}`, {title, content});console.log(response)
    return response.data
})

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: "idle",
        error: null
    },
    reducers: {
        postUpdated: (state, action) => {
            const {postId, title, content } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);

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
            .addCase(addPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log(action.payload)
                const index = state.posts.find(post => post.id === action.payload.id);
                state.posts[index] = action.payload;
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
            .addMatcher(
                action => action.type.endsWith("fulfilled") && action.type.startsWith("posts"),
                (state, action) => { state.status = "succeeded" }
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