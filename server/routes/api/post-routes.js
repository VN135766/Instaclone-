const router = require('express').Router();
const upload = require('../../utils/upload');

const {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  likePost
  // updatePost,
  getPostsByCreator,
} = require('../../controllers/post-controller.js');

// /api/post
router.route('/')
  .get(getAllPosts)
  .post(
    upload.single('image'),
    createPost
  )

  router.route('/like/:id')
  .put(likePost)  

// router.route("/lookup")
//   .get(getPostsByCreator)

//  /api/post/:id
router.route('/:id')
  .get(getPostById)
  .delete(deletePost)
// .put(updatePost)

router.route('/user/:id')
    .get(getPostsByCreator)

// router.route('/:id/comment')

module.exports = router