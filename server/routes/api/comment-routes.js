const router = require('express').Router();
const { addComment, 
        deleteComment,
        likeComment
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router
  .route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router
  .route('/:pizzaId/:commentId')
  .put(likeComment)
  .delete(deleteComment);

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);
  
module.exports = router;