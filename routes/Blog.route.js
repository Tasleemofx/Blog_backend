const router = require("express").Router()

router.post("/:userId/blogs", (req, res)=>{
  const userId = req.params.userId
})

router.get("/blogs", (req, res)=>{

})

module.exports = router
