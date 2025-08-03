import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [price] = useState(5000); 
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [people, setPeople] = useState(1);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You must be logged in to book a hotel.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();

    if (checkIn <= today || checkOut <= today) {
      return alert('Check-in and check-out dates must be in the future');
    }

    if (checkOut <= checkIn) {
      return alert('Check-out date must be after check-in date');
    }

    const bookingData = {
      userId,
      hotelId,
      price,
      amountPaid: 0,
      paymentStatus: 'Pending',
      checkInDate,
      checkOutDate,
      people
    };

    try {
      const response = await axios.post('https://hotelapp-zatj.onrender.com/bookings/', bookingData);
      alert('Booking successful!');
      console.log('Booking response:', response.data);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking');
      console.error(error)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">Book Your Stay</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Check-in Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Check-out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Number of People:</label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            min={1}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
        >
          Book Now for ₹{price}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
