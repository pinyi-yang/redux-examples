const express = require("express");
const router = express.Router();
const { Post, Reaction } = require("../sequelize").models;

router.get("/posts", (req, res) => {
    Post.findAll({
        include: {
            model: Reaction,
            as: "reactions"
        }
    }).then(posts => {
        res.json(posts)
    }).catch(err => {
        console.log("GET /postexample/posts error: ", err)
        res.status(400).json(err)
    })
});

router.post("/posts", async (req, res) => {
    const {title, content, userId} = req.body;
    // should check whether userId exist first.
    try {
        const newPost = await Post.create({
            title, 
            content,
            UserId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            reactions: {}
        }, {
            include: {
                model: Reaction,
                as: "reactions"
            }
        });
        console.log("new Post", newPost.toJSON())

        res.json(newPost.toJSON());
    } catch(err) {
        console.log("POST /postexample/posts error: ", err)
        res.status(400).json(err);
    }
});

router.get("/posts/:postId", (req, res) => {
    const postId = parseInt(req.params.postId);

    Post.findOne({
        where: { id: postId }
    }).then(post => {
        res.json(post)
    }).catch(err => {
        console.log("GET /postexample/posts/:postId error: ", err)
        res.status(400).json(err);
    })
});

router.put("/posts/:postId", (req, res) => {
    const {title, content} = req.body;
    const postId = parseInt(req.params.postId);

    Post.update({title, content},{
        where: { id: postId }
    }).then(post => {
        res.json(post)
    }).catch(err => {
        console.log("PUT /postexample/posts/:postId error: ", err)
        res.status(400).json(err);
    })
});

module.exports = router;