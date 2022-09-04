const { Comment, Post } = require('../models');
const { findById } = require('../models/User');
const { decodeToken } = require('../utils/auth')

// dummy token data used for testing
const { devToken, devBadToken } = require('../utils/devToken')


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

  // add / remove "like" for a comment
  // check list of user IDs in the like field
  //  - if user ID is not in the list, add it
  //  - if user ID is in the list, delete it
  const likeComment = async ( { params, body }, res) => {
    console.log("=======================")
    console.log("like/ulike comment controller")

    const user = decodeToken(devToken)
    console.log("{ user }: ",user)

    if(user.valid){
      console.log("user is VALID")
      // check to see if user ID is in comemnt list
      try {
        const getByIdQuery = await Comment.findById(params.id)

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



module.exports = {
  addComment,
  likeComment
}
