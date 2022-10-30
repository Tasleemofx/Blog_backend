const mongoose = require("mongoose");
require("dotenv").config()

const database=()=>{
mongoose.createConnection(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, ()=>{
    console.log("connected to mongoDB")
})

}


module.exports = database

