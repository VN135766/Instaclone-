const { Comment, Post } = require('../models');
const { findById } = require('../models/User');

  // add comment
  const addComment = async ({ params, body }, res) => {
    // console.log("postId: ",params.postId)
    // console.log("body: ",body)
    await Comment.create(body)
    .then(({ _id }) => {
      // console.log("ID: ", _id)
      // console.log("Posting comment to database")

      return Post.findByIdAndUpdate(
        { _id: params.postId },
        { $push: { comments: _id } },
        { new: true }
      );
    })
    .then(dbCommentData => {
      // console.log(dbCommentData)
      if(!dbCommentData) {
        res.status(404).json({message: 'No comment with this ID found'})
        return;
      }
      res.json(dbCommentData);
    })
    //.catch(err => res.status(400).json({ message: 'Unable to create comment' }));
  }


module.exports = {
  addComment,
}
