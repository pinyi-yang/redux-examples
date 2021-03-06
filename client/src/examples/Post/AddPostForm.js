import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postSlice";
import { selectAllUsers } from "../Users/userSlice";

export const AddPostForm = () => {
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const dispatch = useDispatch();

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);

    const onSavePostClick = () => {
        if (title && content && userId) {
            dispatch(addPost({title, content, userId}));
            setTitle("");
            setContent("");
        }
    }

    const onAuthorSelectChanged = e => { setUserId(e.target.value) };

    const usersOptions = users.map(user => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ))

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
                <label htmlFor="postAuthor">Author: </label>
                <select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorSelectChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content: </label>
                <input type="text"
                    id = "postContent"
                    name = "postContent"
                    value = { content }
                    onChange = { onContentChange }
                />
                <button type="button" onClick={onSavePostClick} disabled={!(title && content && userId)}>Save Post</button>
            </form>
        </section>
    )
}