const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    enum: [1, 3, 5], // Restrict to 1, 3, or 5 star hotels
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: [String], // Array of image URLs
    required: true
  },
  pricePerNight: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
