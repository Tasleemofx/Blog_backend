const express = require('express')
const userRoute = require("./routes/User.route")
const mongoconnect = require("./config/database.js")
const app = express()
app.use(express.json())
const PORT = 3000;


app.use("/user",userRoute)

mongoconnect()
app.listen(PORT,()=>{
  console.log("Starting on 3000")
})
