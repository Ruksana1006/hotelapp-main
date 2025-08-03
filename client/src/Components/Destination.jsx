import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
const destinations = [
  {
    name: 'Dubai',
    image: 'https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/shutterstock_2414539851_ss_non-editorial_dcx0bm?_a=BAVAZGDX0',
    description: 'Explore the stunning skyline, luxury shopping, and desert adventures.',
    price: '₹75,000',
  },
  {
    name: 'Switzerland',
    image: 'https://imgcdn.flamingotravels.co.in/Images/Country/switzerland-best-time-to-visit.jpg',
    description: 'Breathtaking mountains, scenic trains, and cozy alpine villages.',
    price: '₹1,80,000',
  },
  {
    name: 'Saudi Arabia',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKeLo4X0CuHU-3LkjHMa5N-omtHCdVgvodA&s',
    description: 'Discover rich culture, majestic deserts, and historical treasures.',
    price: '₹90,000',
  },
  {
    name: 'Australia',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThUZEg84C5p5KxxEAiSFUHzYG3BUY6ESHLoA&s',
    description: 'From beaches to wildlife, enjoy a unique and diverse landscape.',
    price: '₹1,50,000',
  },
  {
    name: 'India',
    image: 'https://lp-cms-production.imgix.net/2025-04/shutterstock2454866115.jpg',
    description: 'Colorful traditions, diverse food, and historical marvels.',
    price: '₹40,000',
  },
];

function Destination() {
  const nav=useNavigate();
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Top Destinations</h2>
      <div className="space-y-6">
        {destinations.map((place, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
            <img
              src={place.image}
              alt={place.name}
              className="h-64 w-full md:w-1/2 object-cover"
            />
            <div className="p-6 flex flex-col justify-between md:w-1/2">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{place.name}</h3>
                <p className="text-gray-600 mt-2">{place.description}</p>
                <p className="text-pink-600 font-medium mt-4">Estimated Price: {place.price} / per person</p>
              </div>
              <button className="mt-6 self-start bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full" onClick={()=>{nav('/contact')}}>
                Enquiry
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destination;
