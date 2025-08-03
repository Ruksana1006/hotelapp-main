import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function SearchAndResults() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState(null);
  const [allAccommodations, setAllAccommodations] = useState([]); // Store all fetched accommodations

  useEffect(() => {
    const fetchAllAccommodations = async () => {
      try {
        const response = await axios.get('https://hotelapp-zatj.onrender.com/hotels');
        setAllAccommodations(response.data);
        setSearchResults(response.data); // Initially show all hotels
        setInitialLoading(false);
      } catch (err) {
        setInitialError(err);
        setInitialLoading(false);
        console.error("Error fetching all accommodations:", err);
      }
    };

    fetchAllAccommodations();
  }, []);

  const handleSearch = async () => {
    const today = new Date();
    const checkIn = checkInDate ? new Date(checkInDate) : null;
    const checkOut = checkOutDate ? new Date(checkOutDate) : null;

    today.setHours(0, 0, 0, 0);
    if (checkIn) checkIn.setHours(0, 0, 0, 0);
    if (checkOut) checkOut.setHours(0, 0, 0, 0);

    if (checkIn && checkOut) {
      if (checkIn <= today || checkOut <= today) {
        alert("Bookings can only be made for future dates.");
        return;
      }
      if (checkOut <= checkIn) {
        alert("Check-out date must be after check-in date.");
        return;
      }
    } else if ((checkIn && !checkOut) || (!checkIn && checkOut)) {
      alert("Please select both check-in and check-out dates for filtering by date.");
      return;
    }

    setLoading(true);
    try {
      // 1. Fetch hotels based on the city
      const cityResponse = await axios.get(`https://hotelapp-zatj.onrender.com/hotels/city/${searchTerm}`);
      let cityHotels = cityResponse.data.hotels;

      // 2. Filter the city-specific hotels based on the selected dates
      if (checkIn && checkOut) {
        cityHotels = cityHotels.filter(hotel => {
          // Assuming your hotel data has some way to represent availability
          // This is a placeholder - you'll need to adjust based on your actual data structure
          const isAvailable = !hotel.bookings?.some(booking => {
            const bookingStart = new Date(booking.checkIn);
            const bookingEnd = new Date(booking.checkOut);
            bookingStart.setHours(0, 0, 0, 0);
            bookingEnd.setHours(0, 0, 0, 0);

            // Check for overlaps
            return (checkIn < bookingEnd && checkOut > bookingStart);
          });
          return isAvailable;
        });
      }

      setSearchResults(cityHotels);
    } catch (error) {
      console.error('Error fetching and filtering hotels:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to filter the initial list based on city input without date constraints
  const handleCitySearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm.trim() === '') {
      setSearchResults(allAccommodations); // Show all when search is cleared
      return;
    }

    const filteredByCity = allAccommodations.filter(hotel =>
      hotel.city.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setSearchResults(filteredByCity);
    setCheckInDate(''); // Clear dates when city search changes
    setCheckOutDate('');
  };

  if (initialLoading) {
    return <Loader />;
  }

  if (initialError) {
    return <div>Error loading accommodations: {initialError.message}</div>;
  }

  return (
    <div>
      <div className="flex items-center rounded-full bg-white shadow-md p-2 mb-10 mt-5">
        <div className="flex-1 px-4">
          <label htmlFor="where" className="block text-gray-500 text-sm font-semibold">Where</label>
          <input
            type="text"
            id="where"
            className="block w-full text-gray-700 text-sm focus:outline-none"
            placeholder="Search destinations"
            value={searchTerm}
            onChange={handleCitySearch} // Use handleCitySearch for immediate city filtering
          />
        </div>
        <div className="border-l border-gray-300 h-8 mx-2"></div>
        <div className="px-4">
          <label htmlFor="checkin" className="block text-gray-500 text-sm font-semibold">Check in</label>
          <input
            type="date"
            id="checkin"
            className="block w-full text-gray-700 text-sm focus:outline-none"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="border-l border-gray-300 h-8 mx-2"></div>
        <div className="px-4">
          <label htmlFor="checkout" className="block text-gray-500 text-sm font-semibold">Check out</label>
          <input
            type="date"
            id="checkout"
            className="block w-full text-gray-700 text-sm focus:outline-none"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <div className="border-l border-gray-300 h-8 mx-2"></div>
        <div className="px-4">
          <label htmlFor="who" className="block text-gray-500 text-sm font-semibold">Who</label>
          <input
            type="number"
            id="who"
            className="block w-full text-gray-700 text-sm focus:outline-none"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <button
          className="bg-pink-500 text-white rounded-full p-2 ml-4 focus:outline-none"
          onClick={handleSearch}
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {loading ? (
        <Loader/>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((accommodation) => (
            <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-md hover:  shadow-200" key={accommodation._id}>
              <div className="relative">
                <img className="h-48 w-full object-cover" src={accommodation.images[0]} alt={accommodation.city} />
                <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white text-xs rounded-full px-2 py-1">
                  Guest favourite
                </div>
                {/* ... (rest of the accommodation card) ... */}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{accommodation.name}</h3>
                  <h4 className='text-emerald-600 text-md hover:underline font-bold'>{accommodation.city}</h4>
                  
                  {/* ... (rest of the hotel info) ... */}
                </div>
                {/* ... (more hotel details) ... */}
                <button
                  className="bg-pink-300 m-3 p-2 rounded-md items-center hover:bg-pink-500 hover:text-white"
                  onClick={() => navigate(`/hotels/${accommodation._id}`)}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{!initialLoading ? 'No accommodations found for your search.' : ''}</p>
      )}
    </div>
  );
}

export default SearchAndResults;