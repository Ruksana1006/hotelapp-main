import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
const defaultAmenities = [
  { name: 'Wi-Fi' },
  { name: 'Water' },
  { name: 'Soap' },
  { name: 'Breakfast' },
  { name: 'TV' },
  { name: 'Bed' },
  { name: 'Bathroom' },
];

function Hotel() {
  const nav=useNavigate();
  const { id: accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://hotelapp-zatj.onrender.com/hotels/${accommodationId}`);
        setAccommodation(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (accommodationId) {
      fetchAccommodationDetails();
    } else {
      setLoading(false);
    }
  }, [accommodationId]);

  if (loading) return <div><Loader /></div>;
  if (error) return <div>Error loading details: {error.message}</div>;
  if (!accommodation) return <div>No accommodation details available.</div>;

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-gray-400 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto flex flex-row max-w-7xl w-full m-4 relative">
        {/* Hotel Images Section */}
        {accommodation.images && accommodation.images.length > 0 && (
          <div className="flex flex-col min-w-[50%] p-4 space-y-2 overflow-x-auto">
            <div className="flex space-x-4 overflow-x-auto">
              {accommodation.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Hotel Image ${index + 1}`}
                  className="h-48 min-w-[200px] object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}
  
        {/* Hotel Info Section */}
        <div className="flex flex-col p-8 min-w-[50%]">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {accommodation.name || accommodation.city}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{accommodation.description}</p>
  
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Amenities</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {defaultAmenities.map((amenity) => (
                <li key={amenity.name} className="text-gray-600 text-sm flex items-center">
                  ✅ {amenity.name}
                </li>
              ))}
            </ul>
          </div>
  
          {accommodation.rating && (
  <div className="flex items-center mb-4">
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < Math.round(accommodation.rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.073 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.072 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.072-3.292a1 1 0 00-.364-1.118L2.43 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.073-3.292z" />
        </svg>
      ))}
    </div>
    <span className="ml-2 text-sm text-gray-600">({accommodation.rating.toFixed(1)} / 5)</span>
  </div>
)}
          <div className="mt-8">
            <button
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none"
              onClick={() => {
                nav(`/booking/${accommodationId}`);
              }}
            >
              Book Now
            </button>
          </div>
  
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => window.history.back()}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}  

export default Hotel;
