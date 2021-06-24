import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "posts",
    initialState: [
        {id: "1", title: "First Post", content: "Hello", reactions: {thumbsUp: 0, hooray: 0}},
        {id: "2", title: "Second Post", content: "More text", reactions: {thumbsUp: 0, hooray: 0}}
    ],
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
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
            const existingPost = state.find(post => post.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.find(post => post.id === postId);

            if (existingPost) {
                existingPost.reactions[reaction] += 1;
            }
        }
    }
});

export default postsSlice.reducer;
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions