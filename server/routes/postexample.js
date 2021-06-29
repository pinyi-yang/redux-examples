const express = require("express");
const router = express.Router();
const { Post, Reaction } = require("../sequelize").models;

let notificationId = 0;
const generateNotiId = () => {
    notificationId += 1;
    return notificationId;
}


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

router.get("/notifications", (req, res) => {
    function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.round(Math.random() * (max - min) + min);
    }
    
    const randomFromArray = (array) => {
        const index = getRandomInt(0, array.length - 1)
        return array[index]
    }
    
    const notificationTemplates = [
        'poked you',
        'says hi!',
        `is glad we're friends`,
        'sent you a gift',
    ]

    const numNotifications = getRandomInt(1, 5)

    let pastDate

    const now = new Date()

    if (req.params.since) {
        pastDate = parseISO(req.queryParams.since)
    } else {
        pastDate = new Date(now.valueOf())
        pastDate.setMinutes(pastDate.getMinutes() - 15)
    }

    // Create N random notifications. We won't bother saving these
    // in the DB - just generate a new batch and return them.
    console.log(numNotifications)
    const template = randomFromArray(notificationTemplates)

    const notifications = [];
    for (let i = 1; i <= numNotifications; i++) {
        notifications.push({
            id: generateNotiId(),
            date: new Date(Math.round(Math.random(Date.parse(now) - Date.parse(pastDate))) + Date.parse(pastDate)),
            message: template,
            user: getRandomInt(1, 5),
            read: false,
            isNew: true,
        })
    };
    console.log(notifications);
    res.json(notifications)
});

module.exports = router;