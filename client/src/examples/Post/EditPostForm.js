import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUpdated, selectPostById } from "./postSlice";
import { useHistory } from "react-router-dom";

export const EditPostForm = ({ match }) => {
    const { postId } = match.params;
    const history = useHistory()

    const post = useSelector(state => 
        selectPostById(state, postId)
    );
    const dispatch = useDispatch();

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onSavePostClicked = () => {
        dispatch(postUpdated({id: postId, title, content}));
        history.push(`/posts/${postId}`)
    };

    return (
        <section>
            <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="What's on your mind?"
            value={title}
            onChange={onTitleChanged}
            />
            <label htmlFor="postContent">Content:</label>
            <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            />
        </form>
        <button type="button" onClick={onSavePostClicked}>
            Save Post
        </button>
        </section>
    )
}