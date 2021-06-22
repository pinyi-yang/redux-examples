import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { postAdded } from "./postSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const dispatch = useDispatch();

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);

    const onSavePostClick = () => {
        if (title && content) {
            dispatch(postAdded({
                id: nanoid(),
                title,
                content
            }));
            setTitle("");
            setContent("");
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title: </label>
                <input type="text" 
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="postContent">Content: </label>
                <input type="text"
                    id = "postContent"
                    name = "postContent"
                    value = { content }
                    onChange = { onContentChange }
                />
                <button type="button" onClick={onSavePostClick}>Save Post</button>
            </form>
        </section>
    )
}