const router = require("express").Router()
const moment = require("moment")
const User = require("../model/User.model")
const Blog = require("../model/Blog.model")
const AuthMiddleware = require("../middleware/Auth")

// Authorised user create blog
router.post("/createblog", AuthMiddleware, async (req, res)=>{
  const user = req.user
  const {title, description, tags, state, read_count, reading_time, body} = req.body

  const blog = new Blog({
    title, description, tags, 
    author: `${user.first_name} ${user.last_name}`,
     timestamp: moment(),
     state, read_count, reading_time, body
  })
  console.log(blog)
  blog.save()
  .then(result=> res.status(201).send("Blog successfully created"))
  .catch(err=> res.status(403).send(err))

 
})

// Get all blogs
router.get("/allblogs", AuthMiddleware, (req, res)=>{
  Blog.find({})
  .then(response=>{
    res.status(200).json(response)
  })
})

// Get a single blog whether authorised or not
router.get("/singleblog/:id", (req,res)=>{
  const id = req.params.id
  Blog.findById(id)
  .then(response=> res.status(200).json(response))
  .catch(err=> res.status(404).send("Could not get resource from server"))
})

// Filter and update a single blog's details
router.put("/blogs/:id", AuthMiddleware, (req, res)=>{
  const id = req.params.id
  const update = req.body
  Blog.findByIdAndUpdate(id, update)
  .then(result=> {
    const newvalue = {...result, update}
    res.json(newvalue)})
  .catch(err=> res.status(500).json(err))

})

// Owner of blog can update blog state from draft to published

router.put("/blog/:id/updatestate", AuthMiddleware, (req, res)=>{
  const updateState = req.body
  const id = req.params.id
  const username = ` ${req.user.firstname} ${req.user.lastname}`
  Blog.findByIdAndUpdate({ author: username}, {state: updateState})
  .then(result=> res.status(200).json({...result, updateState}))
  .catch(err=> res.status(500).json({err }))
})

// Get blogs by state ["draft", "published"]
router.get("/blogs/:state", (req, res)=>{
  const state = req.params.state
  console.log(state)
  Blog.find({})
  .then(response=>{
    const filteredByState = response.filter(item=> item.state === state)
    res.status(200).json(filteredByState)
  })
})


module.exports = router
