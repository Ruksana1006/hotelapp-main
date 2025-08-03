import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyBookings() {
  const userId = localStorage.getItem('userId');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`https://hotelapp-zatj.onrender.com/bookings/user/${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  if (loading) return <div className="text-center mt-10 text-lg">Loading your bookings...</div>;
  if (!userId) return <div className="text-center mt-10 text-lg text-red-500">Please login to see your bookings.</div>;
  if (bookings.length === 0) return <div className="text-center mt-10 text-lg">No bookings found.</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <div key={booking._id} className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <img
            src={booking.hotel.images[0]}
            alt={booking.hotel.name}
            className="w-full h-60 object-cover"
          />
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-semibold text-pink-600">{booking.hotel.name}</h2>
            <p className="text-gray-500 italic">{booking.hotel.city}</p>
            <p className="text-sm text-gray-700">{booking.hotel.description}</p>

            <div className="text-sm mt-2">
              <p><strong>Booking ID:</strong> {booking.bookingId}</p>
              <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
              <p><strong>Price:</strong> ₹{booking.price}</p>
              <p><strong>Paid:</strong> ₹{booking.amountPaid}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`font-semibold ${booking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-500'}`}>
                  {booking.paymentStatus}
                </span>
              </p>
              {booking.people && <p><strong>Guests:</strong> {booking.people}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
