const dotenv = require("dotenv");
dotenv.config();


const app = require("./app");
const {sequelize, testConnection} = require('./config/db');
const port = process.env.PORT || 5000;

(async ()=>{
    await testConnection();

    try{
        await require('./src/models');
        await sequelize.sync({alter:true});
        console.log("Database synchronized");
    }
    catch(err){
        console.error("Error synchronizing database:", err);
        process.exit(1);
    }
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    })
})();