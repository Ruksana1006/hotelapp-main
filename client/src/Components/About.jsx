// Components/AboutUs.js
import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">About Us</h1>
      <div className='flex flex-row  justify-around'> 
      <img src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=" className='w-52 rounded-md' alt="" />
      <img src="https://bsmedia.business-standard.com/_media/bs/img/article/2024-08/07/full/1722995892-9811.jpg?im=FeatureCrop,size=(826,465)" className='w-52 rounded-md' alt="" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6s4MeFmZ0WLK6RBaC3HVAyYNQApD9s4d2Kw&s" className='w-52 rounded-md' alt="" />
      <img src="https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/content8494.jpg"  className='w-52 rounded-md'alt="" />
      </div><br />
      <p className="text-gray-700 text-lg mb-6">
        Welcome to <span className="text-pink-500 font-bold capitalize rounded-md">airknk Hotels</span> – your go-to platform for discovering and booking the best hotel stays across India. Whether you're planning a relaxing vacation, a business trip, or a quick weekend getaway, we help you find a place that feels like home.
      </p>

      <p className="text-gray-700 text-lg mb-6">
        Our goal is to make booking a hotel room easy, fast, and reliable. With detailed listings, honest pricing, and rich media galleries, you get the full picture before you book.
      </p>

      <p className="text-gray-700 text-lg mb-6">
        Our small but passionate team is dedicated to providing a smooth experience for every user. We’re constantly working to improve and bring more features your way. 
      </p>

      <p className="text-gray-700 text-lg ">
        Thank you for choosing <span className="text-pink-500 font-semibold">airknk Hotels</span>. We’re happy to be a part of your journey!
      </p>
    </div>
  );
};

export default AboutUs;
