const mongoose = require("mongoose")
const schema = mongoose.Schema()


const blogSchema = new schema({
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
        type: Buffer,
        data: ["draft","published"],
        default: "draft"
    },
    readCount: Number,
    reading_time: String,
    body: String
})


module.exports = mongoose.model("Blog", blogSchema)