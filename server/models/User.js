const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat');
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
  user_name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    require: true
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this._doc.password, 10)
  next();
});

const User = model("User", UserSchema);
module.exports = User;