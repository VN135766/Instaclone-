const router = require('express').Router();

const {
  createPost, 
  deletePost,
  getAllPosts,
  getPostById,
  getPostsByCreator,
  likePost
} = require('../../controllers/post-controller.js');

// Declare the routes that point to the controllers above
router.route('/')
  .get(getAllPosts)
  .post(createPost)

  
router.route("/lookup")
  .get(getPostsByCreator)

router.route('/:id')
  .get(getPostById)
  .delete(deletePost)
  .put(likePost)


router.route('/:id/comment')

module.exports = router