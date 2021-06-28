
module.exports = function createModelAssociations(sequelize) {
    const {User, Post, Reaction} = sequelize.models;

    User.hasMany(Post, {as: "posts"})
    Post.hasOne(Reaction, {as: "reactions", onDelete: "CASCADE"});
}