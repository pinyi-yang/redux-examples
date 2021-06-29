
module.exports = function createModelAssociations(sequelize) {
    const {User, Post, Reaction, Notification} = sequelize.models;

    User.hasMany(Post, {as: "posts"});
    User.hasMany(Notification, {as: "notifications"})
    Post.hasOne(Reaction, {as: "reactions", onDelete: "CASCADE"});
}