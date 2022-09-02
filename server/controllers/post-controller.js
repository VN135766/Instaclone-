const { User, Post } = require('../models');


const postController = {
  // get all posts
  getAllPosts(req, res) {
    Post.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .populate({
        path: 'users',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(400).json({ message: 'No posts found' });
      });
  },


    // get one posts by user
    getPostByCreator({ params }, res) {
      Post.find({createdBy: params.createdBy })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .populate({
        path: 'users',
        select: '-__v'
      })
      .select('-__v')
      .then(dbPostData => {
          // If no post is found, send 404
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found fromthis user!' });
            return;
          }
          res.json(dbPostData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  // createPost
  createPost({ body }, res) {
    Post.create(body)
      .then(dbPostData => res.json(dbPostData))
      .catch(err => res.status(400).json(err));
  },
  // delete post
  deletePost({ params }, res) {
    Post.findOneAndDelete({ _id: params.id })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => res.status(400).json(err));
  }
}
