const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");

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
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  }
],
commentsOfUser:[
  {
  recipeName:{type:String},
  comment:{type:String},
  createdAt:{type:Date, default:Date.now},  
  }
]

}, { timestamps: true });


userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email }); // Use "this" to refer to the model
    if (user) {
      const auth = await bcryptjs.compare(password,user.password);
      if(auth){
        return user;
      }
      throw new Error("Incorrect email or password");
    }
    throw new Error("Incorrect email or password"); // Throw an error for invalid credentials
    // return user; // Return the user if found
  } catch (error) {
    throw error; // Throw the error to be handled elsewhere
  }
};



const User = mongoose.model('testData', userSchema);
module.exports = User;