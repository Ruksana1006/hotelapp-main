const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    required: true,
    min: 18
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type:String,
    default:'customer'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
