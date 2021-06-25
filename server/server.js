const express = require("express")
const sequelize = require("./sequelize")

const server = express();

async function checkDatabaseConnection() {
    console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
        console.log("sync tables");
        await sequelize.sync({force: true});

        const { User } = sequelize.models;
        
        // await User.findOrCreate({
        //     where: {
        //         name: "Pinyi Yang"
        //     },
        //     defaults: {
        //         name: "Pinyi Yang",
        //         createdAt: new Date(),
        //         updatedAt: new Date()
        //     }
        // });

        // await User.findOrCreate({
        //     where: {
        //         name: "Shadow Nova"
        //     },
        //     defaults: {
        //         name: "Shadow Nova",
        //         createdAt: new Date(),
        //         updatedAt: new Date()
        //     }
        // })

        
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
    await checkDatabaseConnection();

    server.get("/test", function(req, res) {
        res.send("Hello World")
    })
    
    server.get("/posts", function(req, res) {
    
    })
    
    server.listen(8080, () => {
        console.log("SERVER connected to port 8080`")
    })

}

init();