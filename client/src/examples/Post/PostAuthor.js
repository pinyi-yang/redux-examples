import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../Users/userSlice";

export const PostAuthor = ({ userId }) => {
    const author = useSelector(state => selectUserById(state, userId));
    console.log("PostAuthor userId: ", userId)
    return <span>by {author ? author.name : "Unknown author"}</span>
}