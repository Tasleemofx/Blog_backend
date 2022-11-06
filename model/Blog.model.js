const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: [true, "Blog title already exists"] 
    },
    description:{
        type: String,
        required: true,
    },
    tags:{
        type: Array,
    },
    author:{
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    state: {
        type: String,
        enum: ["draft","published"],
        default: "draft"
    },
    readCount: {
        type: Number,
        default: 0
    },
    reading_time: String,
    body: {
        type: String,
        required: true,
    }
})



module.exports = mongoose.model("Blog", blogSchema)
