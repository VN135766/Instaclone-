const { Comment, Post } = require('../models');

  // add comment
  const addComment = async ({ params, body }, res) => {
    console.log(params)
    console.log(body)
    await Comment.create(body)
    .then(({ _id }) => {
      conosle.log(Post)
      return Post.findOneAndUpdate(
        { _id: params.postId },
        { $push: { comments: _id } },
        { new: true }
      );
    })
    .then(dbCommentData => {
      console.log(dbCommentData)
      if(!dbCommentData) {
        res.status(404).json({message: 'No comment with this ID found'})
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => res.status(400).json({ message: 'Unable to create comment' }));
  }


module.exports = {
  addComment,
}
