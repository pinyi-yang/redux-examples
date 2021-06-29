import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUserById } from "./userSlice";
import { selectPostsByUser } from "../Post/postSlice";

export const UserPage = ({ match }) => {
    const userId = parseInt(match.params.userId);

    const user = useSelector(state => selectUserById(state, userId));

    //** Performance Improve with Memoization */
    // Previous
    // const postsByUser = useSelector(state => {
    //     const allPosts = selectAllPosts(state);

    //     return allPosts.filter(post => post.UserId === userId);
    // });
    const postsByUser = useSelector(state => selectPostsByUser(state, userId));

    const postTitles = postsByUser.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section>
            <h2>{user.name}</h2>
            <ul>{postTitles}</ul>
        </section>
    )
}