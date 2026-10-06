import React, { useState, useEffect, useRef } from 'react';
import { Camera, Lock, Map, HelpCircle, MessageSquare, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../store/firebasedb';
import { collection, query, where, getDocs } from "firebase/firestore";

function Profile() {
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: '',
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  });

  const navigate = useNavigate();
  const {user, db} = useFirebase()

  const getUsersDataUsingEmail = async (email) => {
      
          if(!email) return;
          // Reference to the 'users' collection
          const usersCollectionRef = collection(db, "users");
      
          // Create a query to find the user with the matching email
          const q = query(usersCollectionRef, where("email", "==", email));
      
          try {
              // Get the documents from Firestore that match the query
              const querySnapshot = await getDocs(q);
          
              // Check if any user data was found
              if (querySnapshot.empty) {
                  return;
              }
          
              // If a user is found, retrieve the data
              const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
              setProfile({...profile, username: data[0].username, email: data[0].email, phone: data[0].phone});
            } catch (error) {
              console.error("Error fetching user data: ", error);
              throw error; // You can rethrow or handle the error depending on your needs
            }
      }
  
    useEffect(() => {
      if(user){
        getUsersDataUsingEmail(user.email)
      }
    }, [user])

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile({...profile, profileImage: savedProfile});
    }
  }, [profile.profileImage]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfile = reader.result
        setProfile(newProfile);
        localStorage.setItem('userProfile', newProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { icon: <Map className="w-6 h-6" />, text: 'Saved Itineraries', color: 'bg-teal-100 text-teal-600', link: '/saved-itineraries' },
    { icon: <User className="w-6 h-6" />, text: 'Update Profile', color: 'bg-purple-100 text-purple-600', link: '/update-profile' },
    { icon: <HelpCircle className="w-6 h-6" />, text: 'Help Center', color: 'bg-green-100 text-green-600', link: '/demos' },
    { icon: <MessageSquare className="w-6 h-6" />, text: 'Feedback', color: 'bg-yellow-100 text-yellow-600', link: '/contact' },
    { icon: <LogOut className="w-6 h-6" />, text: 'Logout', color: 'bg-red-100 text-red-600', link: '/logout' }
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-8" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.45)), url("https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")', 
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
    }}>
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white/20 backdrop-blur-xl rounded-[2rem] shadow-xl overflow-hidden">
          {/* Header with background pattern */}
          <div className="h-32 bg-gradient-to-r from-teal-500 to-indigo-500 pattern-dots pattern-teal-600 pattern-bg-white pattern-size-6 pattern-opacity-20"></div>

          {/* Profile Section */}
          <div className="px-8 pb-8">
            {/* Profile Image */}
            <div className="relative -mt-16 mb-8 flex justify-center">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 p-2 rounded-full">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.username}</h1>
              <p className="text-teal-600">{profile.email}</p>
              <p className="text-teal-600">{profile.phone}</p>
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center p-4 rounded-2xl ${item.color} hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_0_rgba(0,0,0,0.1)] active:shadow-[0_2px_0_rgba(0,0,0,0.1)] active:translate-y-1`}
                  onClick={() => navigate(item.link)}
                >
                  <div className="bg-white/50 p-2 rounded-xl mr-4">
                    {item.icon}
                  </div>
                  <span className="font-semibold">{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fun Decorative Elements */}
        <div className="absolute top-16 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-float-delay"></div>
        <div className="absolute bottom-20 left-24 w-28 h-28 bg-pink-300 rounded-full opacity-30 animate-float-delay-2"></div>
        <div className="absolute top-72 left-40 w-24 h-24 bg-blue-300 rounded-full opacity-25 animate-float-delay-3"></div>
      </div>

      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-delay-2 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 4s;
        }
        .animate-float-delay-3 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 6s;
        }
        .pattern-dots {
          background-image: radial-gradient(currentColor 2px, transparent 2px);
        }
      `}</style>
    </div>
  );
}

export default Profile;
