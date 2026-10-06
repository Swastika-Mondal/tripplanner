import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, Compass } from 'lucide-react';
import { useFirebase } from '../../store/firebasedb';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const {user} = useFirebase()

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Contact', to: '/contact' },
    { name: 'About', to: '/about' },
    { name: 'Login', to: '/login' },
  ];

  const profileMenuItems = [
    { name: 'Profile', to: '/profile' },
    { name: 'Saved Itineraries', to: '/saved-itineraries' },
    { name: 'Logout', to: '/logout' },
  ];

  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80");

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileImage(savedProfile);
    }
  }, []);

  return (
    <nav className="sticky w-full z-90 top-0 left-0 bg-black/70">
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation Links */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Compass className="h-8 w-8 text-purple-500" />
                <span className="ml-2 text-xl font-bold text-white">TripOnTip</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  {navLinks.map((link) => (
                    
                    user && link.to == '/login'?
                    <p key={link.name}></p>
                    :
                    <NavLink
                        key={link.name}
                        to={link.to}
                        className={({ isActive }) =>
                          `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${isActive ? 'text-purple-500' : 'hover:text-purple-500'}`
                        }
                      >
                        {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Section */}
            {user?
            <>
            <div className="flex items-center">
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center group"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2 border-purple-500 group-hover:border-purple-400 transition-all duration-200"
                      src={profileImage}
                      alt="Profile"
                    />
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-300 group-hover:text-white transition-colors duration-200" />
                  </button>
                </div>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    {profileMenuItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden ml-4">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
                >
                  {isMenuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
            </>
            :
            <></>}
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 transform hover:scale-105 ${isActive ? 'text-purple-500' : 'hover:text-purple-500'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
