const mongoose = require("mongoose");
require("dotenv").config()

const database=()=>{
 mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res)=> console.log("connected to mongoose"))
    .catch(err=> { console.log("UNable to connect to mongoose")
      console.log(err)
    })
}


module.exports = database
