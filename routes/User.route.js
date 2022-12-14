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
        res.status(201).json({ message: "new user successfully created", user: newuser}))
        .catch(err=> res.status(500).json(err))
    }
})

router.post("/login",async (req,response)=>{
    const {email,password } = req.body
    User.findOne({email})
    .then(res=>{
        bcrypt.compare(password, res.password)
        .then(result=>{
            if(!result) return response.status(403).send("Incorrect Password")
            jwt.sign({ payload: res }, process.env.SECRET, {expiresIn: '1h'}, (err, token)=>{
                console.log(token)
                response.cookie = token
                response.status(200).send({
                    message: 'Login successful',
                    token
                })
            })
            
        })
        .catch(err=>
            response.status(500).send("Failed to login"))
    .catch(err=>{
        response.status(404).send("User not found")
    })
    })
})



module.exports = router
