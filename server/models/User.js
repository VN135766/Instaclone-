const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
  fname: { type: String },
  lname: { type: String },
  email: { type: String },
  title: { type: String },
  salary: { type: Number },
  password: { type: String }
});

UserSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this._doc.password, 10)
  next();
});

const User = model("User", UserSchema);
module.exports = User;