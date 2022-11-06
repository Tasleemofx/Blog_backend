const express = require('express')
const userRoute = require("./routes/User.route")
const blogRoute = require("./routes/Blog.route")
const AuthBlogRoute = require("./routes/Blog.auth.route")
const AuthMiddleware = require("./middleware/Auth")
const mongoconnect = require("./config/database.js")
const app = express()
app.use(express.json({urlencoded: true}))
const PORT = 3000;


app.use("/user",userRoute)
app.use("/api", blogRoute)
app.use("/", AuthMiddleware, AuthBlogRoute)

mongoconnect()
app.listen(PORT,()=>{
  console.log("Starting on 3000")
})
