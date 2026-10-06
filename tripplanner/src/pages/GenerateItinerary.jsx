import React, { useState } from 'react';
import { MapPin, Calendar, List, Palmtree } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShowItinerarySkeleton from './loaders/ShowItinerarySkeleton';

function GenerateItinerary() {
  const [formData, setFormData] = useState({
    place: '',
    days: 2,
    placesPerDay: 3,
  });
  const navigate = useNavigate()
  const [showSkeleton, setShowSkeleton] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setShowSkeleton(true)

    try {
        const response = await fetch("http://127.0.0.1:8000/generate-itinerary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    city_name: formData.place,
                    days_for_tour: formData.days,
                    places_per_day: formData.placesPerDay
                }),
        })

        const res_data = await response.json()
        // console.log(res_data)

        if(response.ok){
            setShowSkeleton(false)
            navigate("/show-itinerary", {state: {res_data}})
        }
    } catch (error) {
        console.log(error);
        
    }finally{
        setShowSkeleton(false)
    }
  };

  return (

    showSkeleton ?
    <ShowItinerarySkeleton/>
    :
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.45)), url("https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-400/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-400/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-sm w-full backdrop-blur-xl bg-white/10 p-6 rounded-[1.5rem] shadow-2xl shadow-purple-900/30 border-2 border-white/20 relative z-10 transform hover:scale-[1] transition-transform duration-500">
        <div className="text-center mb-6 group">
          <div className="flex justify-center mb-4 animate-float">
            <div className="bg-gradient-to-br from-purple-500 to-orange-400 p-4 rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-500 shadow-lg shadow-purple-500/30">
              <Palmtree className="h-10 w-10 text-white animate-sway" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300 mb-2 tracking-tighter font-[Poppins]">
            Trip Planner
          </h1>
          <p className="text-purple-200/90 text-lg font-light tracking-wide">
            Craft Your Perfect Adventure 🌍
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          {[ 
            { icon: <MapPin />, label: 'Where to?', name: 'place', type: 'text', placeholder: 'Dream destination...' },
            { icon: <Calendar />, label: 'How many days?', name: 'days', type: 'number', min: 1, max: 10 },
            { icon: <List />, label: 'Places per day?', name: 'placesPerDay', type: 'number', min: 1, max: 10 }
          ].map((field, index) => (
            <div key={index} className="group">
              <label className="flex items-center text-purple-100/90 text-lg font-medium mb-3">
                <div className="bg-white/10 p-2 rounded-xl mr-3 backdrop-blur-sm border border-white/20">
                  {React.cloneElement(field.icon, { className: 'w-5 h-5 text-purple-300' })}
                </div>
                {field.label}
              </label>
              <input
                type={field.type}
                value={formData[field.name]}
                onChange={(e) => setFormData({ ...formData, [field.name]: field.type === 'number' ? parseInt(e.target.value) : e.target.value })}
                className="w-full px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-white/20 focus:border-purple-400/50 focus:ring-4 focus:ring-purple-400/20 
                  transition-all duration-300 text-purple-100 placeholder-purple-200/50 font-light
                  shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20 focus:shadow-purple-900/30"
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-orange-400 text-white py-3 rounded-2xl hover:bg-gradient-to-l transition-all duration-500 
              font-bold text-lg flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40
              transform hover:scale-[1.02] active:scale-95 group cursor-pointer"
          >
            <span>Generate Itinerary</span>
            <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
              🚀
            </span>
          </button>
        </form>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-4 right-4 text-purple-200/30 text-sm font-light tracking-wide">
        Made with ❤️ by Travel Experts
      </div>

      <style jsx="true" global="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(3deg); }
          50% { transform: rotate(-3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-sway {
          animation: sway 8s ease-in-out infinite;
        }
        .font-[Poppins] {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
}

export default GenerateItinerary;
