import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 mt-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h6 className="text-gray-500 font-semibold mb-4 uppercase tracking-wider">Discover</h6>
            <ul className="list-none space-y-2">
              <li>
                <a href="/" className="text-gray-700 hover:text-indigo-600">Places to Stay</a>
              </li>
              <li>
                <a href="/experiences" className="text-gray-700 hover:text-indigo-600">Experiences</a>
              </li>
              <li>
                <a href="/destinations" className="text-gray-700 hover:text-indigo-600">Destinations</a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-gray-500 font-semibold mb-4 uppercase tracking-wider">Support</h6>
            <ul className="list-none space-y-2">
              <li>
                <a href="/contact" className="text-gray-700 hover:text-indigo-600" onClick={()=>{navigator('/contact')}}>Help Center</a>
              </li>
              <li>
                <a href="/privacypolicy" className="text-gray-700 hover:text-indigo-600">Safety Information</a>
              </li>
              <li>
                <a href="/cancellation" className="text-gray-700 hover:text-indigo-600">Cancellation Policy</a>
              </li>
              
            </ul>
          </div>
          <div>
            <h6 className="text-gray-500 font-semibold mb-4 uppercase tracking-wider">About</h6>
            <ul className="list-none space-y-2">
              <li>
                <a href="/how-it-works" className="text-gray-700 hover:text-indigo-600">How AIR KNK Works</a>
              </li>
              <li>
                <a href="/how-it-works" className="text-gray-700 hover:text-indigo-600">About Us</a>
              </li>
              
            </ul>
          </div>
          <div>
            <h6 className="text-gray-500 font-semibold mb-4 uppercase tracking-wider">Connect</h6>
            <ul className="list-none space-y-2">
              
            <a
  href="mailto:ruksanakhatun0410@gmail.com"
  className="text-gray-700 hover:text-indigo-600 underline transition duration-150"
  target="_blank"
  rel="noopener noreferrer"
>
  Email Me
</a>

            </ul>
          </div>
        </div>
        <div className="mt-12 py-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} AIRKNK. All rights reserved.
          <span className="mx-2">&middot;</span>
          <a href="/privacypolicy" className="hover:text-indigo-600">Privacy Policy</a>
          <span className="mx-2">&middot;</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;