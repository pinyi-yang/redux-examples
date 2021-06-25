
module.exports = function createModelAssociations(sequelize) {
    const {User, Post, Reaction} = sequelize.models;

    User.hasMany(Post);
    Post.belongsTo(User);
    Post.hasOne(Reaction);
}