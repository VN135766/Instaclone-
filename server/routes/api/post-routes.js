const router = require('express').Router();

const {
  createPost, 
  deletePost,
  getAllPosts,
  getPostById,
  getPostsByCreator
} = require('../../controllers/post-cintroller.js');

// Declare the routes that point to the controllers above
router.route('/')
  .get(getAllPosts)
  .post(createPost)

  
router.route("/lookup")
  .get(getPostsByCreator)

router.route('/:id')
  .get(getPostById)
  .delete(deletePost)

module.exports = router