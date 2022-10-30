const express = require('express')
const userRoute = require("./routes/User.route")
const mongoconnect = require("./config/database.js")
const app = express()
const PORT = 3000;

app.set("view engine", "ejs")
app.set("views","views")
app.use(userRoute)

mongoconnect()
app.listen(PORT,()=>{
  console.log("Starting on 3000")
})
