import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">Privacy Policy</h1>

      <p className="mb-4 text-gray-700">
        At <strong>airknk Hotels</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Your name, email, mobile number, and age during registration</li>
        <li>Booking information including selected hotel, dates, and payment status</li>
        <li>Technical data like IP address, browser type, and access times</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>To process your hotel bookings and payments</li>
        <li>To personalize your experience and improve our platform</li>
        <li>To send booking confirmations and service-related messages</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-2">3. Sharing Your Information</h2>
      <p className="text-gray-700">
        We do not sell or rent your personal data. We may share it with third-party services for secure payment processing or to comply with legal requirements.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-2">4. Data Security</h2>
      <p className="text-gray-700">
        We implement industry-standard security measures to protect your personal data. However, no system is 100% secure, so we cannot guarantee absolute safety.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-2">5. Your Rights</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>You have the right to view, update, or delete your personal information.</li>
        <li>You can opt-out of marketing emails at any time.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-2">6. Contact Us</h2>
      <p className="text-gray-700">
        If you have questions or concerns about our privacy practices, please contact us at <span className="text-blue-600 underline">support@airknkhotels.com</span>.
      </p>

      <p className="mt-8 text-sm text-gray-500">Last Updated: April 22, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
