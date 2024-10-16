// models/Alumni.js
const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  batch: String,
  branch: String,
  company: String,
  linkedin: String,
  image: String,  // New field for the image URL
});

const Alumni = mongoose.model("Alumni", alumniSchema);

module.exports = Alumni;
