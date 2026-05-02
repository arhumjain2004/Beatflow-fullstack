const mongoose = require("mongoose")

async function ConnectDb(){

    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Databse Created Succesfully")
    }
    catch(error){
        console.error("Database connection error: " , error)
    }
}

module.exports = ConnectDb