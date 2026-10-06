import React from 'react';
import { Compass, Play, Globe, Map, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../store/firebasedb';

function Home() {
  const navigate = useNavigate();
  const {user} = useFirebase()

  const getStarted = () => {
    if(user){
      navigate('/generate-itinerary')
    }else{
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    style={{
        backgroundImage:
          ' url("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* <img
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Travel Background"
            className="w-full h-full object-cover min-h-screen"
          /> */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Your Journey Begins Here
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
              Plan your perfect adventure with our intelligent travel itinerary planner. 
              Discover amazing destinations and create unforgettable memories.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in-delay-2">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group cursor-pointer"
              onClick={getStarted}>
                <Compass className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform duration-300" />
                Get Started
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group cursor-pointer"
              onClick={() => navigate('/demos')}>
                <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Globe, label: 'Destinations', value: '200+' },
                { icon: Map, label: 'Itineraries Created', value: '50K+' },
                { icon: Clock, label: 'Hours Saved', value: '1M+' },
                { icon: Users, label: 'Happy Travelers', value: '100K+' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Home;
