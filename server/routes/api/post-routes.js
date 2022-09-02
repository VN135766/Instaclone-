const router = require('express').Router();

const {
  createPost, 
  deletePost,
  getAllPosts,
  getPostsByUser,

} = require('../../controllers/post-cintroller.js');