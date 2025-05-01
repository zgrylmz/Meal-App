const mongoose = require('mongoose');
const commentSchema = require('./commentSchema');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String], // Array of strings for ingredients
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.String, // Reference to the Users collection
        ref: 'testData',
    },
    prepTime: {
        type: Number, // Minutes for preparation
        
    },
    cookTime: {
        type: Number, // Minutes for cooking
        required: true,
    },
    thumbnail:{
        type:String,
        default:"",
        
    },
    country:{
        type:String,
        required:true,
    },
    Category:{
        type:String,
        required:true,
    },
    numberOfRating:{
        type:Number,
        default:0,
    },
    rating:{
        type:Number,
        default:0,

    },
    comments: [
        {
        ...commentSchema.obj,
        IdOfTheuser:{type:String, required:true},
        emailOfTheUser:{type:String, required:true},
        nameOfTheUser:{type:String, required:true},

        }
    ], 
    createdBy:[
        {
            IdOfTheUser:{type:String, required:true},
            emailOfTheUser:{type:String, required:true},
            nameOfTheUser:{type:String, required:true},
      
        }
        
    ]

}, { timestamps: true});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
