import React, { useEffect, useState } from 'react';
import { Send, MessageSquare, Mail, User, MapPin, Phone, Clock } from 'lucide-react';
import { useFirebase } from '../store/firebasedb';
import { doc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });
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
        
            setFormData({...formData,
              username: data[0].username,
              email: data[0].email,
              message: ''
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

  const storeMessage = async (username, email, message) => {
    try {
      // Reference to the "messages" collection
      const messagesRef = collection(db, "messages");
  
      // Create a new message object with current system timestamp
      const newMessage = {
        username: username,
        email: email,
        message: message,
        timestamp: Date.now(), // Adds the current system timestamp in milliseconds
      };
  
      // Add the new message document to Firestore
      const docRef = await addDoc(messagesRef, newMessage);
      
      toast.success("Message stored successfully!");
      setFormData({...formData, message: ''})
    } catch (error) {
      toast.success("Message stored unsuccessfully!");
      console.error("Error adding message: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeMessage(formData.username, formData.email, formData.message)
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      className="min-h-screen pt-16 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.45)), url("https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative Bubbles (Top and Middle) */}
      {/* <div className="absolute top-16 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-32 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-72 left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl transform hover:scale-[1] transition-transform duration-300">
            <h2 className="text-3xl font-bold text-gray-100 mb-2">Get in Touch</h2>
            <p className="text-gray-300 mb-6">We'd love to hear from you. Send us a message! 💌✨</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-500" />
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-purple-200/50 text-purple-100"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-purple-500" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-purple-200/50 text-purple-100"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-purple-500" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none placeholder-purple-200/50 text-purple-100"
                  placeholder="Your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group"
              >
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side Content */}
          <div className="space-y-6">
            {/* Hero Image */}
            <div className="relative rounded-xl overflow-hidden shadow-xl transform hover:scale-[1] transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Contact Us"
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-xl font-bold">We're Here to Help</h3>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl space-y-4 transform hover:scale-[1] transition-transform duration-300">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm">123 Travel Street, Adventure City, 12345</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white transform hover:scale-[1] transition-transform duration-300">
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
              <p className="text-white/90 mb-4">
                Have questions about our services? Check out our comprehensive FAQ section for quick answers.
              </p>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors duration-300">
                View FAQs
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Contact;
