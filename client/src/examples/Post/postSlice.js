import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
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

const postsAdapter = createEntityAdapter({})

export const postsSlice = createSlice({
    name: "posts",
    initialState: postsAdapter.getInitialState({
        status: "idle",
        error: null
    }),
    reducers: {
        postUpdated: (state, action) => {
            const {postId, title, content } = action.payload;
            const existingPost = state.entities[postId];

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;

            if (state.entities[postId]) {
                state.entities[postId].reactions[reaction] += 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                postsAdapter.upsertMany(state, action.payload)
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                postsAdapter.addOne(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                postsAdapter.upodateOne(action.payload)
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
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts);

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId], // input selectors
    // output selector, only rerun when input selectors return value changes
    (posts, userId) => posts.filter(post => post.UserId === userId) 
)