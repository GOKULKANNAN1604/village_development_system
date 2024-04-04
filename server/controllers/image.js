const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { Image } = require('../models/user');
const fs = require('fs');
// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create the uploads directory if it doesn't exist
    const uploadDir = './uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage });

// Route to handle image upload
// Route to handle image upload
exports.uploadimage = upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const newImage = new Image({
        filename: req.file.filename,
        path: req.file.path,
      });
      await newImage.save();
  
      res.json({ filename: req.file.filename });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Route to fetch uploaded images
exports.fetchimage = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
