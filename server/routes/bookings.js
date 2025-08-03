const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getHotelBookings,
  updateBooking,
  deleteBooking
} = require('../Controller/bookingcontroller');

router.post('/', createBooking); // Create new booking
router.get('/user/:userId', getUserBookings); // Get bookings for a user
router.get('/hotel/:hotelId', getHotelBookings); // Get bookings for a hotel
router.patch('/:bookingId', updateBooking); // Update booking by bookingId
router.delete('/:bookingId', deleteBooking); // Delete booking by bookingId

module.exports = router;
