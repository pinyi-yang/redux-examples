import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    console.log("make request")
    const response = await client.get('/fakeApi/posts')
    console.log("response: ")
    console.log(response)
    return response.posts
})

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [
            {id: "1", title: "First Post", content: "Hello", reactions: {thumbsUp: 0, hooray: 0}},
            {id: "2", title: "Second Post", content: "More text", reactions: {thumbsUp: 0, hooray: 0}}
        ],
        status: "idle",
        error: null
    },
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId,
                        date: new Date().toISOString()
                    }
                }
            }
        },
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
    extraReducers: {
        // [fetchPosts.random]: (state, action) => {
        //     state.status = "random"
        // },
        [fetchPosts.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.posts = state.posts.concat(action.payload);
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.meesage;
        }
    }
});

export default postsSlice.reducer;
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

//selectors
export const selectAllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)