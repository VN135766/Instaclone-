const { Post } = require('../models');
const fs = require('fs');
var path = require('path');
const { decodeToken } = require('../utils/auth')

// dummy token data used for testing
const { devToken, devBadToken } = require('../utils/devToken')



  // get all posts
  const getAllPosts = async (req, res) => {
    const user = decodeToken(devToken)
    if(user.valid){
      console.log("A token was passed in the request")
      console.log("user name: ", user.user_name)
      try {
              // validate token
        const getAllQuery = await Post.find({});
        res.status(200).json({ result: "success", payload: getAllQuery });
      } catch(err) {
        res.status(400).json({ message: 'No posts found' });
      }
    } else {
      res.status(401).json({message: "UnAuthorized - invalid token"})
    }
  }

// get post by id
const getPostById = async (req, res) => {
  try {
    const getByIdQuery = await Post.findById(req.params.id)
    res.status(200).json({ result: "success", payload: getByIdQuery })
  } catch (err) {
    res.status(400).json({ result: "fail", message: 'No post found by that id' })
  }
}

// create post
const createPost = async ({ body, file }, res) => {
  var obj = {
    imageName: body.imageName,
    imageCaption: body.imageCaption,
    image: {
      data: fs.readFileSync(path.join(require('../uploads') + '/' + file.filename)),
      contentType: 'image/png'
    }
  }
  Post.create(obj, (err, item) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: 'Unable to create post',
        err
      });
    }
    else {
      item.save();
      res.json(item)
    }
  });

  /*await Post.create(body)
    .then(dbPostData => )
    .catch(err => res.status(400));*/
}


// get post by id
const deletePost = async (req, res) => {
  try {
    const deleteByIdQuery = await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({ result: "success", payload: deleteByIdQuery })
  } catch (err) {
    res.status(400).json({ result: "fail", message: 'No post found by that id' })
  }
}

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  deletePost

}