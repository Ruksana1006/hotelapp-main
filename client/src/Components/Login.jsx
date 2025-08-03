import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setlogged }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://hotelapp-zatj.onrender.com/user/login', {
        email,
        password,
      });

      const { _id, role } = response.data.user;
      alert('Login successful!!!');

      localStorage.setItem('userId', _id);
      localStorage.setItem('role', role); // ✅ Store role

      setlogged(true);

      if (role === 'admin') {
        nav('/admin/dashboard'); // ✅ Redirect admin
      } else {
        nav('/');
      }

      setTimeout(() => {
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        console.log('User ID and role removed from localStorage.');
      }, 5 * 60 * 1000); // 5 minutes

    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError(
        error.response
          ? error.response.data.message || 'Login failed. Please try again.'
          : 'Network error. Please check your connection.'
      );
      setlogged(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <a href="/forgot-password" className="inline-block align-baseline font-semibold text-sm text-indigo-500 hover:text-indigo-800">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
