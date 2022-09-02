const { Post } = require('../models');



  // get all posts
  // getAllPosts(req, res) {
  //   Post.find({})
  //     .populate({
  //       path: 'comments',
  //       select: '-__v'
  //     })
  //     .populate({
  //       path: 'users',
  //       select: '-__v'
  //     })
  //     .select('-__v')
  //     .sort({ _id: -1 })
  //     .then(dbPostData => res.json(dbPostData))
  //     .catch(err => {
  //       console.log(err);
  //       res.status(400).json({ message: 'No posts found' });
  //     });
  // }

  //   // get one Post by id
  //   getPostById({ params }, res) {
  //     Post.findOne({ _id: params.id })
  //     .populate({
  //       path: 'comments',
  //       select: '-__v'
  //     })
  //     .populate({
  //       path: 'users',
  //       select: '-__v'
  //     })
  //     .select('-__v')
  //     .then(dbPostData => {
  //         // If no post is found, send 404
  //         if (!dbPostData) {
  //           res.status(404).json({ message: 'No post found with this id!' });
  //           return;
  //         }
  //         res.json(dbPostData);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         res.status(400).json(err);
  //       });
  //   },

  //   // get one posts by user
  //   getPostsByCreator({ params }, res) {
  //     Post.find({createdBy: params.createdBy })
  //     .populate({
  //       path: 'comments',
  //       select: '-__v'
  //     })
  //     .populate({
  //       path: 'users',
  //       select: '-__v'
  //     })
  //     .select('-__v')
  //     .then(dbPostData => {
  //         // If no post is found, send 404
  //         if (!dbPostData) {
  //           res.status(404).json({ message: 'No post found fromthis user!' });
  //           return;
  //         }
  //         res.json(dbPostData);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         res.status(400).json(err);
  //       });
  //   },


  // get all posts
  const getAllPosts = async (req, res) => {
    try {
      const getAllQuery = await Post.find({});
      res.status(200).json({ result: "success", payload: getAllQuery });
    } catch(err) {
      res.status(400).json({ message: 'No posts found' });
    }
  }

  // get post by id
  const getPostById = async (req, res) => {
    try {
      const getByIdQuery = await Post.findById(req.params.id)
      res.status(200).json({ result: "success", payload: getByIdQuery })
    } catch(err) {
      res.status(400).json({ result: "fail", message: 'No post found by that id' })
    }
  }

  // create psot
  const createPost = async ({ body }, res) => {
    await Post.create(body)
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(400).json({ message: 'Unable to create post' }));
  }
  // delete post
//   deletePost({ params }, res) {
//     Post.findOneAndDelete({ _id: params.id })
//       .then(dbPostData => {
//         if (!dbPostData) {
//           res.status(404).json({ message: 'No post found with this id!' });
//           return;
//         }
//         res.json(dbPostData);
//       })
//       .catch(err => res.status(400).json(err));
//   }
  // get post by id
  const deletePost = async (req, res) => {
    try {
      const deleteByIdQuery = await Post.findByIdAndDelete(req.params.id)
      res.status(200).json({ result: "success", payload: deleteByIdQuery })
    } catch(err) {
      res.status(400).json({ result: "fail", message: 'No post found by that id' })
    }
  }

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  deletePost
}