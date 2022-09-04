const { Comment, Post } = require('../models');
const { findById } = require('../models/User');
const { decodeToken } = require('../utils/auth')

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
  // check list of user IDs in the like field
  //  - if user ID is not in the list, add it
  //  - if user ID is in the list, delete it
  const likeComment = async ( { params, body }, res) => {
    console.log("=======================")
    console.log("like/unlike comment controller")

    const user = decodeToken(devToken)
    console.log("{ user }: ",user)

    if(user.valid){
      console.log("user is VALID")
      // check to see if user ID is in comemnt list
      try {
        console.log("comment id:" , params.id)
        const getByIdQuery = await Comment.findById(params.id)
        console.log(getByIdQuery)

        res.status(200).json({ result: "success", payload: getByIdQuery })

      } catch (err) {
        res.status(400).json({ result: "fail", message: 'No comment found by that id' })
      }


      // if user ID already in list...

      // if user ID NOT in list
      
    } else {
      res.status(401).json({message: "UnAuthorized - invalid token"})
    }
    
    }

    const getCommentById = async (req, res) => {
    console.log("====================")
    console.log("getCommentById function")
    console.log("params.id: ",req)

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
        const getByIdQuery = await Comment.findById(req.params.id)
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
