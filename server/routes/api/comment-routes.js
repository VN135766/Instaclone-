const router = require('express').Router();

const { addComment, 
        likeComment,
        getAllComments
} = require('../../controllers/comment-controller');


//  /api/comment/
router.route('/')
  .get(getAllComments)

// /api/comment/<postId>
router.route('/:postId')
  .post(addComment);

  //  /api/commet/like:comemntId
router.route('/like/:commentId')
  .put(likeComment)  

// /api/comments/<postId>/<commentId>
// router.route('/:postId/:commentId')
//   .put(likeComment)
//   .delete(deleteComment);

  
module.exports = router;