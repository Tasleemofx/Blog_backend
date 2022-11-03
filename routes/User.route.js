const express = require("express")
const router = express.Router()
const User = require("../model/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.post("/signup",async (req,res)=>{
    const { first_name, last_name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const existing_user = await User.findOne({ email: email.toLowerCase()})

    if(existing_user){
        res.status(409).json({message:"User already exists"})
    }else if (!first_name || !last_name || !email || !password){
        res.status(400).json({message:"All inputs are required for sign up!"})
    }
    else{
        const newuser = { first_name, last_name, email: email.toLowerCase(), password: hashedPassword }

        const user = new User({...newuser})
        user.save()
        .then( result=>
        res.status(200).json("new user successfully created"))
        .catch(err=> res.status(500).json(err))
    }
})

router.post("/login",(req,response)=>{
    const {email,password } = req.body
    User.findOne({email})
    .then(res=>{
        bcrypt.compare(password, res.password)
        .then(result=>{
            response.status(200).send("User successfully logged in!!")
        })
        .catch(err=>
            response.status(500).send("Failed to login"))
    .catch(err=>{
        response.status(401).send(err)
    })
    })
})

// router.post("/login",(req,res)=>{

// })


module.exports = router
