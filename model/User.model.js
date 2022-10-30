const mongoose = require("mongoose");
const schema = mongoose.Schema()

const userSchema = new schema({
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

module.exports = module.model.user || mongoose.model("Users", userSchema)