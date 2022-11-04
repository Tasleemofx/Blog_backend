const express = require("express")
const jwt = require("jsonwebtoken")
const AuthMiddleware =(req, res,next)=>{
    const BearerHeader = req.headers["authorization"]
    const token = BearerHeader && BearerHeader.split(" ")[1]
    if(token){
        jwt.verify(token, process.env.SECRET, (err, user)=>{
            if (err){
                return res.status(403).send("User token invalid")
            }
                req.user = user.payload
                next()
        })
        
    }else{
        res.status(409).send("UnAuthorized")
    }
}

module.exports = AuthMiddleware