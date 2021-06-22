import React from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../../components/NavBar";

export function PostsList() {
    const posts = useSelector(state => state.posts);

    const renderedPosts = posts.map(post => {
        return (
            <article className="post-excerpt" key={post.id}>
                <h3>{post.title}</h3>
                <p className="post-content">{post.content.substring(0, 100)}</p>
            </article>
        )
    })

    return (
        <div>
            <section className="posts-list">
                <h2>Posts</h2>
                {renderedPosts}
            </section>
        </div>
    )
}