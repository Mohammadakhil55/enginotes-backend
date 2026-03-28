const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  subject: String,
  branch: String,
  semester: Number,
  link: String,
  downloads: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);