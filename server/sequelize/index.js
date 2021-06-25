const { Sequelize } =  require("sequelize");
const models = require("./models");
const createAssociation = require("./association")

const sequelize = new Sequelize({
    database: "redux",
    username: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
});

models.forEach(model => {
    model(sequelize)
});

createAssociation(sequelize);



module.exports = sequelize;

// try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
// } catch(err) {
//     console.error("Unable to connet to the database: ", err);
// }