// commentSchema.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true, default: "" },
  createdAt: { type: Date, default: Date.now }
}, { _id: true }); // <- ensures every comment has a unique _id

module.exports = commentSchema;
