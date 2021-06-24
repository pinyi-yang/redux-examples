import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";

export function PostsList() {
    const posts = useSelector(state => state.posts);

    const renderedPosts = posts.map(post => {
        return (
            <article className="post-excerpt" key={post.id}>
                <h3>{post.title}</h3>
                <p className="post-content">{post.content.substring(0, 100)}</p>
                <PostAuthor userId={post.userId} /><br/><br/>
                <ReactionButtons post={post} /> <br/>
                <Link to={`/posts/${post.id}`} className="button, muted-button">View Post</Link>
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