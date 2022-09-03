const { Post } = require('../models');


  // get all posts
  const getAllPosts = async (req, res) => {
    try {
      // validate token
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

  // create post
  const createPost = async ({ body }, res) => {
    await Post.create(body)
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(400).json({ message: 'Unable to create post' }));
  }


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