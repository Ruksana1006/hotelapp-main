import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const isLoggedIn = localStorage.getItem('userId');

  return (
    <header className="py-4 px-6 shadow-md bg-white sticky top-0 z-50 flex justify-between items-center">
      {/* Logo Section */}
      <h1
        className="text-3xl font-bold text-pink-500 italic flex items-center gap-2 cursor-pointer"
        onClick={() => nav('/')}
      >
        airknk Hotels
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-9 h-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
          />
        </svg>
        <span className="text-blue-500 text-sm mt-2 ml-2">
          Welcome <span className="text-green-600">Again!</span>
        </span>
      </h1>

      {/* Right-side Buttons */}
      <div className="flex items-center space-x-4">
        {/* Conditionally show My Bookings if user is logged in */}
        {isLoggedIn && (
          <button
            className="p-2 bg-emerald-500 rounded-xl hover:shadow-lg hover:bg-emerald-600 text-white"
            onClick={() => nav('/mybookings')}
          >
            My Bookings!!
          </button>
        )}

        <button
          className="bg-[#ff7043] p-2.5 text-white hover:shadow-lg shadow-blue-400 rounded-xl"
          onClick={() => {
            if (isLoggedIn) {
              localStorage.removeItem('userId');
              alert('Logged out successfully!');
              nav('/login');
            } else {
              nav('/login');
            }
          }}
        >
          {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
        </button>

        <button
          className="bg-[#ff7043] p-2.5 text-white hover:shadow-lg shadow-green-400 rounded-xl"
          onClick={() => nav('/register')}
        >
          SIGNUP
        </button>
      </div>
    </header>
  );
}
