const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");
const commentSchema = require('./commentSchema');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    requires: true,

  },
  age: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [String],
    default: []
},
ratedRecipies: [
  {
    name: { type: String, required: true,default:"" },
    rating: { type: Number, required: true,default:"" },
    createdAt: { type: Date, default: Date.now }
  }
],
commentsOfUser: [
  {
    ...commentSchema.obj, // reuse the structure
    recipeName: { type: String, default: "" }
  }
]

}, { timestamps: true });


userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user && await bcryptjs.compare(password, user.password)) return user;
  throw new Error("Incorrect email or password");
};



const User = mongoose.model('testData', userSchema);
module.exports = User;