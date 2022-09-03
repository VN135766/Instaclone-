const router = require('express').Router();
const upload = require('../../utils/upload');

const {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  // updatePost,
  // getPostsByCreator,
  // likePost
} = require('../../controllers/post-controller.js');

// /api/post
router.route('/')
  .post(
    upload.single('image'),
    createPost
  )
  .get(getAllPosts)



// router.route("/lookup")
//   .get(getPostsByCreator)

//  /api/post/:id
router.route('/:id')
  .get(getPostById)
  .delete(deletePost)
// .put(updatePost)
//   .put(likePost)


// router.route('/:id/comment')

module.exports = router