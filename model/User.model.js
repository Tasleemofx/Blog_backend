const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,

    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already used for an account"]

    },
    password:{
        type: String,
        required: [true, "Please provide a password"]
    }
})

module.exports = mongoose.model("User", userSchema)
