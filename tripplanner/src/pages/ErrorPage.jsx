import React from 'react';
import { NavLink } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a0c4ff] via-[#6c6be3] to-[#b9a5f9] flex flex-col justify-center items-center text-center relative">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffadad] via-[#ffd6a5] to-[#fdffb6] opacity-25 animate-float"></div>

      {/* Error Content */}
      <div className="relative z-10 p-6 max-w-lg mx-auto">
        {/* Cartoon Character */}
        <div className="animate-shake">
          <img
            src="https://img.icons8.com/ios/452/ghost.png"
            alt="Cartoon Error Character"
            className="w-28 h-28 animate-pulse mb-6"
          />
        </div>

        <h1 className="text-5xl font-extrabold text-[#2c1810] mb-4 animate-bounce">
          Oops! Something went wrong! 🎃
        </h1>
        <p className="text-lg text-[#6a4e33] mb-6">
          It looks like we’ve lost our way. Don't worry, we'll guide you back on track! 🧭
        </p>

        {/* NavLink to "Go Home" */}
        <div className="space-x-4">
          <NavLink
            to="/"
            className="bg-gradient-to-r from-[#ff5858] to-[#ff7373] text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-gradient-to-r hover:from-[#ff7373] hover:to-[#ff5858] transition-all duration-500 ease-in-out"
          >
            Go Home
          </NavLink>

          {/* Contact Button */}
          <NavLink
            to="/contact"  
            className="bg-gradient-to-r from-[#6c63ff] to-[#8e6eff] text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-gradient-to-r hover:from-[#8e6eff] hover:to-[#6c63ff] transition-all duration-500 ease-in-out"
          >
            Contact Us
          </NavLink>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-40 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-300 rounded-full opacity-40 animate-float-delay"></div>
      <div className="absolute top-48 left-32 w-32 h-32 bg-pink-200 rounded-full opacity-40 animate-float-delay-2"></div>
      <div className="absolute bottom-48 right-32 w-20 h-20 bg-blue-200 rounded-full opacity-40 animate-float-delay-3"></div>

      {/* Custom Animations */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }
        @keyframes float-delay-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delay-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-delay-2 {
          animation: float 8s ease-in-out infinite;
          animation-delay: 4s;
        }
        .animate-float-delay-3 {
          animation: float 10s ease-in-out infinite;
          animation-delay: 6s;
        }
        .animate-shake {
          animation: shake 1s ease-in-out infinite;
        }
        .animate-bounce {
          animation: bounce 2s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default ErrorPage;
