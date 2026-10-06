import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Compass, Camera, Clock } from 'lucide-react';
import DayCard from './components/DayCard';
import { useLocation } from 'react-router-dom';
import ShowItinerarySkeleton from './loaders/ShowItinerarySkeleton';
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { useFirebase } from '../store/firebasedb';

function ShowItinerary() {
  const [selectedDay, setSelectedDay] = useState(0);
  const location = useLocation()
  const {res_data} = location.state || {
    City: "",
    Itinerary: [{
      Heading: '',
      Places: [{
        visit_place: '',
        loc: '',
        time: '',
        description: '',
        Images: [
        ]
      },
      ],
      Description: ""
    },]
  }
  const [cityData, setCityData] = useState({
    City: "",
    Itinerary: [{
      Heading: '',
      Places: [{
        visit_place: '',
        loc: '',
        time: '',
        description: '',
        Images: [
        ]
      },
      ],
      Description: ""
    },]
  });
  const {user, db} = useFirebase();

  useEffect(() => {
    // console.log(res_data);
    
    setCityData(res_data)
  }, [res_data])

  // Function to add data one by one to the itinerary document
const addDataToItinerary = async (uid, dataObject) => {
  try {
    // Reference to the user's itinerary document
    const itineraryRef = doc(db, "itineraries", uid);

    // Get the current timestamp for the 'createdAt' field
    const createdAt = new Date().toLocaleDateString(); // You can customize this format

    // Prepare the new object to be added to the data array
    const newData = {
      data: dataObject,
      createdAt: createdAt,
    };

    // Check if the document exists
    const docSnap = await getDoc(itineraryRef);
    if (docSnap.exists()) {
      // Document exists, update the array
      await updateDoc(itineraryRef, {
        data: arrayUnion(newData),
      });
      toast.success("Data added successfully!");
    } else {
      // Document doesn't exist, create it with the first dataObject
      await setDoc(itineraryRef, {
        data: [newData], // Initialize the array with the first data object
      });
      toast.success("Data added successfully!");
    }
  } catch (error) {
    console.error("Error adding data to itinerary: ", error);
    toast.error("Data not Saved. Some Error occured !")
  }
};


  const savedYourItinerary = () => {
    // console.log(cityData);
    if(user){
      addDataToItinerary(user.uid, cityData);
    }
  }

  if(!res_data){
    return (
        <ShowItinerarySkeleton/>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <div className="bg-[#2c1810] text-white">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 rounded-full bg-[#6a4e33] bg-opacity-20 mb-6">
              <Compass className="w-12 h-12 text-[#e6b17e]" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Discover {cityData.City.split(':')[0]}</h1>
            <p className="text-xl text-[#e6b17e]">{cityData.City.split(':')[1]}</p>
          </div>
        </header>

        <nav className="bg-[#1a0f0a] sticky top-0 z-50 border-t border-[#3d261b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center -mb-px">
              {cityData.Itinerary.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`relative py-6 px-8 text-lg font-medium transition-colors ${
                    selectedDay === index
                      ? 'text-[#e6b17e] border-b-2 border-[#e6b17e]'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Day {index + 1}</span>
                  </div>
                  {selectedDay === index && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#e6b17e] to-transparent"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#e6b17e]/20">
              <h2 className="text-2xl font-bold text-[#2c1810] mb-4">
                {cityData.Itinerary[selectedDay].Heading}
              </h2>
              <p className="text-gray-600">
                {cityData.Itinerary[selectedDay].Description}
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[#2c1810]">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Today's Schedule</span>
                </div>
                <div className="mt-4 space-y-3">
                  {cityData.Itinerary[selectedDay].Places.map((place, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-600">
                      <div className="w-6 h-6 rounded-full bg-[#2c1810] text-white flex items-center justify-center text-sm">
                        {idx + 1}
                      </div>
                      <span>{place.visit_place}</span>
                    </div>
                  ))}
                    <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-orange-400 text-white rounded-xl font-semibold hover:bg-gradient-to-l transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transform hover:scale-[1.02] active:scale-95 cursor-pointer" onClick={savedYourItinerary}>
                    Save Itinerary
                    </button>

                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <DayCard day={cityData.Itinerary[selectedDay]} index={selectedDay} />
          </div>
        </div>
      </main>

      <footer className="bg-[#2c1810] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-6 h-6 text-[#e6b17e]" />
                <span className="text-xl font-semibold">{cityData.City.split(':')[0]} Guide</span>
              </div>
              <p className="text-gray-400">
                Your comprehensive guide to exploring the World.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                {cityData.Itinerary.map((day, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => setSelectedDay(idx)}
                      className="hover:text-[#e6b17e] transition-colors"
                    >
                      Day {idx + 1} - {day.Heading.split(':')[1]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-gray-400">
                Discover the magic of Kolkata through our carefully curated travel guide.
                Experience the perfect blend of colonial heritage, spiritual sanctuaries,
                and vibrant culture.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#3d261b] text-center text-gray-400">
            <p>© {new Date().getFullYear()} Trip on Tip. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ShowItinerary;
