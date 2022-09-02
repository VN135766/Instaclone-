const router = require('express').Router();

const { addComment, 
        // deleteComment,
        // likeComment
} = require('../../controllers/comment-controller');

// /api/comment/<postId>
router.route('/:postId')
  .post(addComment);

// /api/comments/<postId>/<commentId>
// router.route('/:postId/:commentId')
//   .put(likeComment)
//   .delete(deleteComment);

  
module.exports = router;