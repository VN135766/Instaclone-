const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PostSchema = new Schema (
  {
    imageName: {
      type: String,
      required: true
    },
    image: {
      data: Buffer,
      contentType: String
    },
    imageCaption: {
      type: String,
      required: true,
      trim: true
    },
    likes: [{
      type: String,
      ref: "User"
    }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)

PostSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Post = model("Post", PostSchema);
module.exports = Post;
