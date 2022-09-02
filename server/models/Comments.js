const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    },
    commentBody: {
      type: String,
      required: true,
      trim: true
    },
    likes: [{
      type: String,
      ref: "User"
    }],
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

CommentSchema.virtual('likeCount').get(function() {
  return this.comments.likes.length;
});

const Comment = model('Comment', CommentSchema);
module.exports = Comment;
