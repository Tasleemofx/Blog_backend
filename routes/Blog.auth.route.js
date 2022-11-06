const router = require('express').Router();
const moment = require("moment")
const Blog = require("../model/Blog.model")


// Get all blogs
router.get("/allblogs", (req, res) => {
    Blog.find({}).limit(20)
        .then(response => {
            res.status(200).json(response)
        })
})

// Owner can get a list of their blogs
router.get("/myblogs/:state", (req, res)=>{
    const state = req.params.state 
    const user = req.user
    user.fullName = `${user.first_name} ${user.last_name}`
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    Blog.find({ author: user.fullName}).limit(pageSize).skip(pageSize*page)
    .then(response=> {
        const filteredByState = response.filter(item=> item.state == state)
        res.status(200).json(filteredByState? filteredByState: response);})
    .catch(err=> res.status(500).json(err))
})
// Authorised user create blog

router.post("/createblog", async (req, res) => {
    const user = req.user
    user.fullName = `${user.first_name} ${user.last_name}`
    const { title, description, tags, state, read_count, reading_time, body } = req.body

    const blog = new Blog({
        title, description, tags,
        author: user.fullName,
        timestamp: moment(),
        state, read_count, reading_time, body
    })
   
    blog.save()
        .then(result => res.status(201).send("Blog successfully created")
        )
        .catch(err => res.status(406).send(err))

})

// Filter and update a single blog's details
router.put("/blogs/:id", (req, res) => {
    const id = req.params.id
    const update = req.body
    Blog.findByIdAndUpdate(id, update)
        .then(result => {
            const newvalue = { ...result, update }
            res.json(newvalue)
        })
        .catch(err => res.status(500).json(err))

})

// Owner of blog can update blog state from draft to published

router.put("/blog/:id/updatestate", (req, res) => {
    const updateState = req.body
    const id = req.params.id
    const fullName = ` ${req.user.firstname} ${req.user.lastname}`
    Blog.findByIdAndUpdate({ author: fullName }, { state: updateState })
        .then(result => res.status(200).json({ ...result, updateState }))
        .catch(err => res.status(500).json({ err }))
})

// Delete blogs
router.delete("/blog/:blogId", (req, res) => {
    const id = req.params.blogId;
    const user = req.user
    user.fullName = `${user.first_name} ${user.last_name}`
    console.log(user.fullName)
    Blog.findById(id)
        .then(result => {
            console.log(result.author)
            if (result.author === user.fullName) {
                result.delete()
                res.status(200).send("blog deleted")
            } else {
                res.status(403).send("Author needs to log in to delete a blog")
            }
        })
        .catch(err => res.status(404).send("Blog not found"))
})

module.exports = router;