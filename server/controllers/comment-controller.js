const { Comment, Post, User } = require('../models');
const { findById } = require('../models/User');
const { decodeToken } = require('../utils/auth');
const likes = require('../utils/likes');

// dummy token data used for testing
const { devToken } = require('../utils/devToken')




// CREATE new comment
const addComment = async ({ params, body }, res) => {
  var createQuery={}

  console.log("====================")
  console.log("addComment function")

  // check switch in ./utils/devToken to see if in test mode or not
  if (testStatus){ 
    var token = devToken
  } else {
    if( !req.headers.cookie.split('=')[1]) {
      return res.status(401)
      .json({msg: "un-authorized - missing or expired token in req header"})
    }
    let token = req.headers.cookie.split('=')[1]
  }

  const user = decodeToken(token)
  if(user.valid){

    try {
      console.log("postId: ", params.id)
      console.log(body)
      console.log("author: ", user.user_name)
      console.log("user _id: ",user._id)
      var obj = {
        body: body.body,
        author: user._id
      }
      createQuery = await Comment.create(
        obj
      );
    } catch(err) {
      res.status(400).json({ message: 'Unable to create comment' });
    }
    try{
      const updatePostQuery = await Post.findByIdAndUpdate(
        { _id: params.id },
        { $push: { comments: createQuery._id } },
        { new: true }
      )
      res.status(200).json({ result: "success", payload: createQuery })
    } catch(err) {
        res.status(404).json({message: 'No Post with this ID found'})
    }
    
  } else {
    res.status(401).json({message: "UnAuthorized - invalid token"})
  }
}



  // get ALL Comments
  const getAllComments = async (req, res) => {
    console.log('getAllComments method called')
    try {
      const getAllQuery = await Comment.find({})
      .populate({
        path: 'author',
        select: ('user_name'),
        select: '-__v'
      })
      res.status(200).json({ result: "success", payload: getAllQuery });
    } catch(err) {
      res.status(400).json({ message: 'No users found' });
    }
  }

  // add / remove "like" for a comment
  // first comment to be updated
  // then check the list of user IDs in that comments like field/array
  //  - if user ID is not in the list, add it
  //  - if user ID is in the list, delete it
  // then update the database to hold the new array of likes
  const likeComment = async ( { params, body }, res) => {
    console.log("=======================")
    console.log("like/unlike comment controller")

    // select to use a test toke or an actual token in the header
    if (testStatus){ 
      var token = devToken
    } else {
      if( !req.headers.cookie.split('=')[1]) {
        return res.status(401)
        .json({msg: "un-authorized - missing or expired token in req header"})
      }
      let token = req.headers.cookie.split('=')[1]
    }

    // decode the token and check if valid user
    const user = decodeToken(token)
    if(user.valid){

      var getByIdQuery = {}
      // first, find the comment being updated
      try {
        getByIdQuery = await Comment.findById(params.id)
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
        const updatedLikesArray = await Comment.findByIdAndUpdate(
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

    const getCommentById = async ({ params }, res) => {
    console.log("====================")
    console.log("getCommentById function")

    if (testStatus){ 
      var token = devToken
    } else {
      if( !req.headers.cookie.split('=')[1]) {
        return res.status(401)
        .json({msg: "un-authorized - missing or expired token in req header"})
      }
      let token = req.headers.cookie.split('=')[1]
    }
    const user = decodeToken(token)
    if(user.valid){
      try {
        const getByIdQuery = await Comment.findById(params.id)
        .populate({
          path: 'author',
          select: ('user_name'),
          select: '-__v'
        })
        res.status(200).json({ result: "success", payload: getByIdQuery })
      } catch(err) {
        res.status(400).json({ result: "fail", message: 'No comment found by that id' })
      }
    } else {
      res.status(401).json({message: "UnAuthorized - invalid token"})
    }
}

module.exports = {
  addComment,
  likeComment,
  getAllComments,
  getCommentById
}
