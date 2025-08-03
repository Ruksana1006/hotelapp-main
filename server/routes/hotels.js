const express = require('express');
const {
  createHotel,
  getAllHotels,
  getHotelById,
  deleteHotel,
  updateHotel,getHotelsByCity
} = require("../Controller/hotelcontroller");
const router = express.Router();
// Create a new hotel
router.post('/create', createHotel);

// Get all hotels
router.get('/', getAllHotels);

// Get a specific hotel by ID
router.get('/:id', getHotelById);

router.get('/city/:city', getHotelsByCity);// Update hotel details

router.put('/:id', updateHotel);

// Delete a hotel
router.delete('/:id', deleteHotel);

module.exports = router;
