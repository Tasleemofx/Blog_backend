const express = require("express")
const router = express.Router()


router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.get("/login",(req,res)=>{
    return res.send("login route")
})


module.exports = router