const Hotel = require('../Modal/Hotel');

// Create a new hotel
const createHotel = async (req, res) => {
  try {
    const { name, city, rating, description, images, pricePerNight } = req.body;

    // Create a new hotel
    const newHotel = new Hotel({
      name,
      city,
      rating,
      description,
      images,
      pricePerNight
    });

    // Save to database
    await newHotel.save();

    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();  // Optionally, add filters here like city, rating, etc.
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a hotel by ID
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a hotel by ID (if needed)
const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city, rating, description, images, pricePerNight } = req.body;

    const updatedHotel = await Hotel.findByIdAndUpdate(id, {
      name,
      city,
      rating,
      description,
      images,
      pricePerNight
    }, { new: true });

    if (!updatedHotel) return res.status(404).json({ error: 'Hotel not found' });

    res.status(200).json({ message: 'Hotel updated successfully', hotel: updatedHotel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get hotels by city name
const getHotelsByCity = async (req, res) => {
  try {
    const { city } = req.params;

    // Find hotels with matching city (case-insensitive)
    const hotels = await Hotel.find({ city: { $regex: new RegExp(city, 'i') } });

    if (hotels.length === 0) {
      return res.status(404).json({ message: 'No hotels found in this city' });
    }

    // Return complete hotel objects
    res.status(200).json({ city, hotels });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete a hotel by ID
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) return res.status(404).json({ error: 'Hotel not found' });

    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports={
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  getHotelsByCity
}