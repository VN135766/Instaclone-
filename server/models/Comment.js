const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const CommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    body: {
      type: String,
      required: true,
      trim: true
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true
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
  return this.likes.length;
});

const Comment = model("Comment", CommentSchema);
module.exports = Comment;
