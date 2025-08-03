import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    rating: 3,
    description: '',
    images: '',
    pricePerNight: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      toast.error('Access Denied: Admin privileges required');
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Hotel name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.images.trim()) newErrors.images = 'At least one image URL is required';
    if (!formData.pricePerNight || isNaN(formData.pricePerNight) || formData.pricePerNight <= 0) {
      newErrors.pricePerNight = 'Valid price is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        rating: parseInt(formData.rating),
        pricePerNight: parseFloat(formData.pricePerNight),
        images: formData.images.split(',').map(img => img.trim())
      };
      
      await axios.post('https://hotelapp-zatj.onrender.com/hotels/create', payload);
      
      toast.success('Hotel added successfully!');
      setFormData({
        name: '',
        city: '',
        rating: 3,
        description: '',
        images: '',
        pricePerNight: ''
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to add hotel');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h2 className="text-3xl font-bold">Add New Hotel</h2>
            <p className="text-blue-100">Fill in the details below to add a new hotel to the system</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Hotel Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Grand Hotel"
                  className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              {/* City Field */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className={`w-full px-4 py-2 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>
              
              {/* Rating Field */}
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select 
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>⭐ (1 Star)</option>
                  <option value={2}>⭐⭐ (2 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                </select>
              </div>
              
              {/* Price Field */}
              <div>
                <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700 mb-1">
                  Price Per Night ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    id="pricePerNight"
                    name="pricePerNight"
                    type="number"
                    min="1"
                    step="0.01"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    placeholder="99.99"
                    className={`w-full pl-8 px-4 py-2 rounded-lg border ${errors.pricePerNight ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                {errors.pricePerNight && <p className="mt-1 text-sm text-red-600">{errors.pricePerNight}</p>}
              </div>
            </div>
            
            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the hotel amenities, location, and unique features..."
                className={`w-full px-4 py-2 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            
            {/* Images Field */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                Image URLs (comma separated) <span className="text-red-500">*</span>
              </label>
              <textarea
                id="images"
                name="images"
                rows="2"
                value={formData.images}
                onChange={handleChange}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                className={`w-full px-4 py-2 rounded-lg border ${errors.images ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
              <p className="mt-1 text-sm text-gray-500">Enter comma-separated URLs of hotel images</p>
            </div>
            
            {/* Preview Section */}
            {formData.images && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Image Preview</h3>
                <div className="flex flex-wrap gap-4">
                  {formData.images.split(',').filter(url => url.trim()).map((url, index) => (
                    <div key={index} className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={url.trim()} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors duration-200 flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Add Hotel'
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Help Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gray-100 p-4 border-b">
            <h3 className="font-medium text-gray-800">Quick Tips</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Use high-quality images for better presentation</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Be descriptive about amenities and location</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Double-check pricing information before submitting</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}