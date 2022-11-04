const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
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
    readCount: Number,
    reading_time: String,
    body: String
})


module.exports = mongoose.model("Blog", blogSchema)
