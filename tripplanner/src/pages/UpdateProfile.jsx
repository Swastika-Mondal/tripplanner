import React, { useEffect, useState } from 'react';
import { User, Phone, Mail } from 'lucide-react'; // importing icons from lucide-react
import { useFirebase } from '../store/firebasedb';
import { doc, collection, query, where, getDocs, updateDoc} from "firebase/firestore";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
  });
  const {user, db} = useFirebase()
  const navigate = useNavigate()
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
        
            setFormData({
              username: data[0].username,
              phone: data[0].phone,
              email: data[0].email,
            })
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle profile update logic here (e.g., sending data to API)
    try {
            // Reference to the specific user's document using their unique ID
            const userRef = doc(db, "users", user.uid);
        
            // Update the user data with the provided updatedData
            await updateDoc(userRef, formData);
        
            toast.success("User data updated successfully.");
            
            // Optionally navigate to another page after updating
            navigate('/profile');
          } catch (error) {
            console.error("Error updating user data: ", error);
          }
  };

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

      <div className="max-w-sm w-full backdrop-blur-xl bg-white/10 p-6 rounded-[1.5rem] shadow-2xl shadow-purple-900/30 border-2 border-white/20 relative z-10 transform hover:scale-[1] transition-transform duration-500">
        <div className="text-center mb-6 group">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300 mb-2 tracking-tighter font-[Poppins]">
            Update Profile
          </h1>
          <p className="text-purple-200/90 text-lg font-light tracking-wide">
            Update your profile information ✨
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          {[
            { label: 'Username', name: 'username', type: 'text', icon: <User className="w-5 h-5 text-purple-300" /> },
            { label: 'Phone', name: 'phone', type: 'text', icon: <Phone className="w-5 h-5 text-purple-300" /> },
            { label: 'Email', name: 'email', type: 'email', icon: <Mail className="w-5 h-5 text-purple-300" /> },
          ].map((field, index) => (
            <div key={index} className="group">
              <label className="flex items-center text-purple-100/90 text-lg font-medium mb-3">
                <div className="bg-white/10 p-2 rounded-xl mr-3 backdrop-blur-sm border border-white/20">
                  {field.icon}
                </div>
                {field.label}
              </label>
              <input
                type={field.type}
                value={formData[field.name]}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                className="w-full px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-white/20 focus:border-purple-400/50 focus:ring-4 focus:ring-purple-400/20 
                  transition-all duration-300 text-purple-100 placeholder-purple-200/50 font-light
                  shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20 focus:shadow-purple-900/30"
                placeholder={`${field.label}...`}
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
            <span>Update Profile</span>
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

export default UpdateProfile;
