const mongoose = require('mongoose');
const Booking = require('../Modal/Booking');
const Hotel = require('../Modal/Hotel');
const User = require('../Modal/User');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { userId, hotelId, price, amountPaid, checkInDate, checkOutDate, people } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ error: 'Invalid Hotel ID' });
    }

    const user = await User.findById(userId);
    const hotel = await Hotel.findById(hotelId);

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

    const bookingId = 'BOOK' + Math.floor(Math.random() * 1000000);

    const newBooking = new Booking({
      user: userId,
      hotel: hotelId,
      bookingId,
      price,
      amountPaid,
      paymentStatus: amountPaid >= price ? 'Paid' : 'Pending',
      checkInDate,
      checkOutDate,
      people
    });

    await newBooking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all bookings for a specific user
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const bookings = await Booking.find({ user: userId }).populate('hotel').sort({ bookingDate: -1 });;

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: error.message });
  }
};

// Get all bookings for a specific hotel
const getHotelBookings = async (req, res) => {
  try {
    const { hotelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ error: 'Invalid Hotel ID' });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const bookings = await Booking.find({ hotel: hotelId }).populate('user');

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this hotel" });
    }

    res.status(200).json(bookings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { paymentStatus, amountPaid } = req.body;

    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId },
      { paymentStatus, amountPaid },
      { new: true }
    );

    if (!updatedBooking) return res.status(404).json({ error: 'Booking not found' });

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const deletedBooking = await Booking.findOneAndDelete({ bookingId });

    if (!deletedBooking) return res.status(404).json({ error: 'Booking not found' });

    res.status(200).json({ message: 'Booking deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getHotelBookings,
  updateBooking,
  deleteBooking
};
