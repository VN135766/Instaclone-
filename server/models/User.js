const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat');
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
  user_name: { type: String },
  email: { type: String },
  password: { type: String },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

UserSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this._doc.password, 10)
  next();
});

const User = model("User", UserSchema);
module.exports = User;