const router = require('express').Router();

const { addComment, 
        likeComment,
        getAllComments,
        getCommentById
} = require('../../controllers/comment-controller');


//  /api/comment/
router.route('/')
  .get(getAllComments)

// /api/comment/<postId>
router.route('/:Id')
  .post(addComment)
  .get(getCommentById)
  .put(likeComment)  


// /api/comments/<postId>/<commentId>
// router.route('/:postId/:commentId')
//   .put(likeComment)
//   .delete(deleteComment);

  
module.exports = router;