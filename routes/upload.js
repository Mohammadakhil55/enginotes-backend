const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2: cloudinary } = require("cloudinary");
const mongoose = require("mongoose");
const Note = require("../models/Note");

const router = express.Router();

/* Cloudinary Config */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/* Storage */

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "enginotes-pdfs",
    resource_type: "raw",
    type: "upload",
    access_mode: "public",
    format: "pdf"
  })
});

/* Multer */

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {

    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }

  }
});

/* Upload Route */

router.post("/", upload.single("pdf"), async (req, res) => {

  try {

    const {
      title,
      subject,
      branch,
      semester,
      description
    } = req.body;

    const note = new Note({

      title,
      subject,
      branch,
      semester,
      description,

      pdf: req.file.path,

      pages: 0,

      approved: true

    });

    await note.save();
   console.log("Saved Note ID:", note._id);
console.log("Database:", mongoose.connection.name);
console.log("Saved Note:", note);

    res.json({
      success: true,
      message: "PDF uploaded successfully",
      note
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});

module.exports = router;