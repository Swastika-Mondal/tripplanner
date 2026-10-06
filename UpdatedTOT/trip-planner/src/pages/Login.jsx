import React, { useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';  // Import Eye and EyeOff icons
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../store/firebasedb';
import { setDoc, doc, collection, query, where, getDocs} from "firebase/firestore";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);  // State to control password visibility
  const navigate = useNavigate();

  const {SignInWithGoogle, SignInWithEmailPassword, user, db} = useFirebase()

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
              const userRef = doc(db, "users", user.uid);
              const user_data = {
                  username: '',
                  email: email,
                  phone: '',
                  isAdmin: false, // Default value for isAdmin
                  timestamp: Date.now(),
              }
              await setDoc(userRef, user_data);
              navigate('/update-profile')
              return;
          }
      
          // If a user is found, retrieve the data
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
          // console.log("User data fetched successfully:", data[0]);
          if(data[0].username && data[0].phone){
           navigate('/')
          }else{
            navigate('/update-profile')
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          throw error; // You can rethrow or handle the error depending on your needs
        }
  }
  
  useEffect(() =>{
      if(user){
          getUsersDataUsingEmail(user.email)
      }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic (e.g., send request to server)
    // console.log(formData);
    SignInWithEmailPassword(formData.email, formData.password)
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

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
            Signin
          </h1>
          <p className="text-purple-200/90 text-lg font-light tracking-wide">
            Welcome back to your journey 🌍
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          {[{
              icon: <Mail />,
              label: 'Email',
              name: 'email',
              id: 'email',
              type: 'email',
              placeholder: 'Enter your email...',
            },
            {
              icon: <Lock />,
              label: 'Password',
              name: 'password',
              id: 'password',
              type: passwordVisible ? 'text' : 'password',  // Use state to toggle between 'password' and 'text'
              placeholder: 'Enter your password...',
              toggleVisibility: togglePasswordVisibility,
              showIcon: passwordVisible ? <EyeOff /> : <Eye />,  // Toggle the icon based on visibility
            }
          ].map((field, index) => (
            <div key={index} className="group relative">
              <label className="flex items-center text-purple-100/90 text-lg font-medium mb-3">
                <div className="bg-white/10 p-2 rounded-xl mr-3 backdrop-blur-sm border border-white/20">
                  {React.cloneElement(field.icon, { className: 'w-5 h-5 text-purple-300' })}
                </div>
                {field.label}
              </label>
              <input
                type={field.type}
                value={formData[field.name]}
                id={field.id}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                className="w-full px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-white/20 focus:border-purple-400/50 focus:ring-4 focus:ring-purple-400/20 
                  transition-all duration-300 text-purple-100 placeholder-purple-200/50 font-light
                  shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20 focus:shadow-purple-900/30"
                placeholder={field.placeholder}
                required
              />
              {field.name === 'password' && (
                <button
                  type="button"
                  onClick={field.toggleVisibility}
                  className="absolute right-4 top-3/4 transform -translate-y-1/2 cursor-pointer"
                >
                  {field.showIcon} {/* Eye icon for toggle */}
                </button>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-orange-400 text-white py-3 rounded-2xl hover:bg-gradient-to-l transition-all duration-500 
              font-bold text-lg flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40
              transform hover:scale-[1.02] active:scale-95 group cursor-pointer"
          >
            <span>Signin</span>
            <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
              🚀
            </span>
          </button>

          {/* Google Login Option */}
          <button
            type="button"
            className="w-full bg-white/10 text-white py-3 rounded-2xl border-2 border-white/20 flex items-center justify-center space-x-2 mt-4 transition-all duration-500 
              font-bold text-lg hover:bg-white/20 cursor-pointer"
              onClick={SignInWithGoogle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
            <span>Or Sign in with Google</span>
          </button>
        </form>

        {/* <div className="text-center mt-4 text-purple-200/90 text-sm">
          <a href="/forgot-password" className="text-purple-400 hover:text-purple-300">
            Forgot password?
          </a>
        </div> */}

        {/* <div className="text-center mt-2 text-purple-200/90 text-sm">
          <span>Don't have an account? </span>
          <a href="/signup" className="text-purple-400 hover:text-purple-300">
            Sign up
          </a>
        </div> */}
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

export default Login;
