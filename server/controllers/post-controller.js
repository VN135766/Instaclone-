const { Post } = require('../models');
const fs = require('fs');
var path = require('path');
const { decodeToken, authMiddleware } = require('../utils/auth')
const likes = require('../utils/likes');
// dummy token data used for testing
const { testStatus, devToken } = require('../utils/devToken')

// get all posts
const getAllPosts = async (req, res) => {
  console.log("====================")
  console.log("getAllPosts function")

  if (testStatus) {
    // if we are in test mode
    var token = devToken
  } else {
    // must have a token in the header
    if (!req.headers.token) {
      return res.status(401)
        .json({ msg: "un-authorized - missing or expired token in req header" })
    }
    let token = req.headers.token
  }

  const user = decodeToken(token)

  console.log(user)
  if (user.valid) {
    console.log("A token was passed in the request")
    console.log("user name: ", user.user_name)
    try {
      const getAllQuery = await Post.find({})
        .populate({
          path: 'comments',
          select: '-__v'
        })
        .populate({
          path: 'createdBy',
          select: ('user_name')
        })
      res.status(200).json({ result: "success", payload: getAllQuery });
    } catch (err) {
      res.status(400).json({ message: 'No posts found' });
    }
  } else {
    res.status(401).json({ message: "UnAuthorized - invalid token" })
  }
}

// get post by id
const getPostById = async (req, res) => {
  console.log("====================")
  console.log("GetPostById function")

  // check switch in ./utils/devToken to see if in test mode or not
  if (testStatus) {
    // if we are in test mode
    var token = devToken
  } else {
    // must have a token in the header
    if (!req.headers.token) {
      return res.status(401)
        .json({ msg: "un-authorized - missing or expired token in req header" })
    }
    let token = req.headers.token
  }

  // decode the token and return either a user or an error
  const user = decodeToken(token)
  if (user.valid) {

    try {
      const getByIdQuery = await Post.findById(req.params.id)
        .populate({
          path: 'comments',
          select: '-__v'
        })
        .populate({
          path: 'createdBy',
          select: '-__v'
        })
      res.status(200).json({ result: "success", payload: getByIdQuery })
    } catch (err) {
      res.status(400).json({ result: "fail", message: 'No post found by that id' })
    }

  } else {
    res.status(401).json({ message: "UnAuthorized - invalid token" })
  }
}

// create post
const createPost = async (req, res) => {
  console.log("====================")
  console.log("createPost function")

  // check switch in ./utils/devToken to see if in test mode or not
  // if (testStatus) {
  //   // if we are in test mode
  //   var token = devToken
  // } else {
  //   // must have a token in the header
  //   if (!req.headers.token) {
  //     return res.status(401)
  //       .json({ msg: "un-authorized - missing or expired token in req header" })
  //   }
  //   let token = req.headers.token
  // }

  // decode the token and return either a user or an error

  const data = authMiddleware(req).user

  console.log(data)

  if (!data) {
    return res.status(401).json({ message: "Login failed." })
  }
  //const user = decodeToken(token)
  //if (user.valid === 'TRUE') {

    //console.log(user)

    var obj = {
      imageName: req.body.imageName,
      imageCaption: req.body.imageCaption,
      image: `uploads/${req.file.filename}`,
      createdBy: data._id
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

  // } else {
  //   res.status(401).json({ message: "UnAuthorized - invalid token" })
  // }
}

const getPostsByCreator = async (req, res) => {
  Post.find({ createdBy: req.params.id })
    .then(posts => {
      res.status(200).json({ posts })
    })
    .catch(err => {
      console.log(err)
    })
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



  // add / remove "like" for a post
  // first post to be updated
  // then check the list of user IDs in that post's like field/array
  //  - if user ID is not in the list, add it
  //  - if user ID is in the list, delete it
  // then update the database to hold the new array of likes
  const likePost = async ( { params, body }, res) => {
    console.log("=======================")
    console.log("like/unlike POST controller")

    // select to use a test toke or an actual token in the header
    if (testStatus){ 
      var token = devToken
    } else {
      if( !req.headers.token) {
        return res.status(401)
        .json({msg: "un-authorized - missing or expired token in req header"})
      }
      let token = req.headers.token
    }

    // decode the token and check if valid user
    const user = decodeToken(token)
    if(user.valid){

      var getByIdQuery = {}
      // first, find the comment being updated
      try {
        getByIdQuery = await Post.findById(params.id)
      } catch(err) {
        res.status(400).json({ result: "fail", message: 'No comment found by that id' })
      }

      // now process the array of likes and update the database
      try {
        // send likes array from selected comment out for processing
        const array = likes.update(getByIdQuery.likes, user._id)
        // everything works up to here
        // I'm not sure how to get 'array' back in to the comment record

        console.log("about to update the comments recoed with these values...")
        console.log("id: ", params.id)
        console.log("array: ", array)
        console.log("...")
        // update the comment in the db with the new array
        const updatedLikesArray = await Post.findByIdAndUpdate(
          { _id: params.id },
          { likes: array }
        )
        console.log("updatedLikesArray:",updatedLikesArray)
        
        res.status(200).json({ result: "success", payload: updatedLikesArray })
      } catch(err) {
        res.status(400).json({ result: "fail", message: 'unable to update likes' })
      }
    } else {
      res.status(401).json({message: "UnAuthorized - invalid token"})
    }
  }



module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  deletePost,
  getPostsByCreator,
  likePost
}