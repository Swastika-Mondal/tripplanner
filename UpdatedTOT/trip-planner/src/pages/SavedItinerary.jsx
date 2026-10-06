import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { doc, getDoc } from "firebase/firestore";
import { useFirebase } from '../store/firebasedb';
import { useNavigate } from 'react-router-dom';

function SavedItinerary() {
  const [itineraries, setItineraries] = useState([]);
  const [originalItinerary, setOriginalItinerary] = useState([])
  const {user, db} = useFirebase();
  const navigate = useNavigate()

  // Function to get data from a Firestore document
const getItineraryData = async (uid) => {
  try {
    if(!uid) return;
    // Reference to the user's itinerary document
    const itineraryRef = doc(db, "itineraries", uid);

    // Fetch the document
    const docSnap = await getDoc(itineraryRef);

    if (docSnap.exists()) {
      // Access the 'data' array from the document
      const itineraryData = await docSnap.data().data;
      
      // console.log("Itinerary Data:", itineraryData);

      if(itineraryData){
        setOriginalItinerary(itineraryData)
        const data = []
        itineraryData.map((item, id) => {
          // console.log(item);
          data.push({
            id: `${id}`,
            cityName: item.data.City.split(':')[0],
            description: item.data.City.split(':')[1],
            imageUrl: item.data.Itinerary[0].Places[0].Images[0],
            daysCount: item.data.Itinerary.length,
            placesPerDay: item.data.Itinerary[0].Places.length,
            createdAt: item.createdAt,
          },)
          // console.log('hehe', );
          
        })

        setItineraries(data)
        
      }
      
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching itinerary data: ", error);
  }
};

useEffect(() => {
  if(user){
    getItineraryData(user.uid)
  }
}, [user])


const viewItinerary = (id) => {
  // console.log(originalItinerary[id]);
  if(originalItinerary){
    const res_data = originalItinerary[id].data;
    navigate("/show-itinerary", {state: {res_data}})
  }
}

  return (
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

      <div className="max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300 mb-4">
            Your Travel Adventures
          </h1>
          <p className="text-purple-200 text-lg">Relive your planned journeys and dream destinations</p>
        </div>

        {/* Itineraries Grid */}
        {itineraries.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-xl p-12 text-center shadow-lg rounded-2xl">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-200 mb-3">No Itineraries Yet</h2>
            <p className="text-gray-200">Start planning your next adventure to see it here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itineraries.map((itinerary) => (
              <div
                key={itinerary.id}
                className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1] transition-transform duration-300"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={itinerary.imageUrl}
                    alt={itinerary.cityName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {itinerary.cityName}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="text-gray-200 mb-4">{itinerary.description}</p>
                  
                  {/* Trip Details */}
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{itinerary.daysCount} days</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{itinerary.placesPerDay} places/day</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      Created on {new Date(itinerary.createdAt).toLocaleDateString()}
                    </span>
                    <button className="text-blue-500 hover:text-blue-600 font-medium text-sm cursor-pointer"
                    onClick={() => viewItinerary(itinerary.id)}>
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedItinerary;
