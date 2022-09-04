const { Comment, Post } = require('../models');
const { findById } = require('../models/User');
const { decodeToken } = require('../utils/auth');
const likes = require('../utils/likes');

// dummy token data used for testing
const { devToken } = require('../utils/devToken')


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

  // get ALL Comments
  const getAllComments = async (req, res) => {
    console.log('getAllComments method called')
    try {
      const getAllQuery = await Comment.find({});
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
      if( !req.headers.token) {
        return res.status(401)
        .json({msg: "un-authorized - missing or expired token in req header"})
      }
      let token = req.headers.token
    }

    // decode the token and check if valid user
    const user = decodeToken(token)
    if(user.valid){
      // first, find the comment being updated
      try {
        const getByIdQuery = await Comment.findById(params.id)
      } catch(err) {
        res.status(400).json({ result: "fail", message: 'No comment found by that id' })
      }

      // now process the array of likes and update the database
      try {
        // send likes array from selected comment out for processing
        const array = likes.update(getByIdQuery.likes, user._id)
        // everything works up to here
        // I'm not sure how to get 'array' back in to the comment record

        // update the comment in the db with the new array
        const updatedLikesArray = await Comment.findByIdAndUpdate(
          { _id: params.postId },
          { likes: array }
        )
        console.log("updatedLikesArray:",updatedLikesArray)
        
        res.status(200).json({ result: "success", payload: updatedLikesArray })
      } catch(err) {

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
      if( !req.headers.token) {
        return res.status(401)
        .json({msg: "un-authorized - missing or expired token in req header"})
      }
      let token = req.headers.token
    }
    const user = decodeToken(token)
    if(user.valid){
      try {
        const getByIdQuery = await Comment.findById(params.id)
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
