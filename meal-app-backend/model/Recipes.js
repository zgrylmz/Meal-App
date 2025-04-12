const mongoose = require('mongoose');

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
    },
    rating:{
        type:Number,

    },
    comments: [
        {
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
