require("dotenv").config()
const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connect ho gya h bhai...")
    }
    catch (error) {
        console.log("error occured")
        process.exit(1);
    }
    
}
module.exports = connectDB;