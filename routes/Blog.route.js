const router = require("express").Router()
const moment = require("moment")
const Blog = require("../model/Blog.model")
const AuthMiddleware = require("../middleware/Auth")


// Get all blogs
router.get("/publishedblogs", (req, res) => {
  const pageSize = req.query.pageSize || 20;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  Blog.find({}).limit(pageSize).skip(pageSize * page)
    .then(response => {
      const filtered = response.filter(item=> item.state === "published")
      res.status(200).json(filtered)
      .catch(err=> res.status(404).send("No published blogs"))
    })
})

router.get("/publishedblog/:id", (req, res) => {
  const id = req.params.id
  Blog.findById(id)
    .then(response => {
      response.state === "published"
        .then(result =>
          res.status(200).json(result))
        .catch(err => res.status(403).send("Not a published blogs"))
    })
    .catch(err => res.status(404).json(err))
})

// Get a single blog whether authorised or not
router.get("/singleblog/:id", (req,res)=>{
  const id = req.params.id
  Blog.findById(id)
    .then(response => {
      console.log(response)
      res.status(200).json({response})})
  .catch(err=> res.status(404).send(err))
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
