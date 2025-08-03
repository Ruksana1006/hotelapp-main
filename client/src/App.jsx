// App.js
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';
import Loader2 from './Components/Loader2'
// Lazy-loaded components
const SearchAndResults = lazy(() => import('./Components/Cards'));
const Hotel = lazy(() => import('./Components/Hotel'));
const LoginForm = lazy(() => import('./Components/Login'));
const SignupForm = lazy(() => import('./Components/Signup'));
const PageNotFound = lazy(() => import('./Components/404'));
const Booking = lazy(() => import('./Components/Booking'));
const MyBookings = lazy(() => import('./Components/MyBookings'));
const PrivacyPolicy = lazy(() => import('./Components/PrivacyPolicy'));
const About = lazy(() => import('./Components/About'));
const Cancellation = lazy(() => import('./Components/Cancellation'));
const Destination = lazy(() => import('./Components/Destination'));
const ContactUs = lazy(() => import('./Components/ContactUs'));
const AdminDashboard = lazy(() => import('./Components/Admin'));
const Exp=lazy(()=>import('./Components/Experience'));

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
  </div>
);

const App = () => {
  const [logged, setlogged] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setlogged(true);
    }
  }, []);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SearchAndResults />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<LoginForm setlogged={setlogged} />} />
          <Route path="/register" element={<SignupForm />} />
          {logged && <Route path="/booking/:hotelId" element={<Booking />} />}
          {logged && <Route path="/mybookings" element={<MyBookings />} />}
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/how-it-works" element={<About />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/experiences" element={<Exp/>}/>
          <Route path="/destinations" element={<Destination />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roleRequired="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
