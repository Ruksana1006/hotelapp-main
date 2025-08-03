const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Link to the User schema (MongoDB ObjectId reference)
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',  // Link to the Hotel schema (MongoDB ObjectId reference)
    required: true
  },
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
  },
  amountPaid: {
    type: Number,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  people:{
    type:Number
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.checkInDate;
      },
      message: 'Check-out date must be after check-in date.'
    }
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
