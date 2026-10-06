import React, { useEffect, useState } from 'react';
import { Mail, User, Clock } from 'lucide-react';
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from '../store/firebasedb';
import { data } from 'react-router-dom';

const AdminContacts = () => {
  const {db} = useFirebase();
  // Mock data - replace with actual data from your backend
  const [contacts, setContacts] = useState([
    {
      id: 1,
      username: 'John Doe',
      email: 'john@example.com',
      message: 'I love your platform! The itinerary planning feature is amazing.',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      username: 'Sarah Smith',
      email: 'sarah@example.com',
      message: 'Having some issues with the booking system. Can you help?',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      username: 'Mike Johnson',
      email: 'mike@example.com',
      message: 'Great service! Looking forward to using more features.',
      timestamp: '1 day ago'
    },
    {
      id: 4,
      username: 'Emily Brown',
      email: 'emily@example.com',
      message: 'Would love to see more destinations added to the platform.',
      timestamp: '2 days ago'
    }
  ]);

  const calculateTimeAgo = (timestamp) => {
    const now = new Date(); // Current date and time
    const past = new Date(timestamp); // User's registration date
  
    const diffInSeconds = Math.floor((now - past) / 1000); // Difference in seconds
    const diffInMinutes = Math.floor(diffInSeconds / 60); // Difference in minutes
    const diffInHours = Math.floor(diffInMinutes / 60); // Difference in hours
    const diffInDays = Math.floor(diffInHours / 24); // Difference in days
    const diffInMonths = Math.floor(diffInDays / 30); // Difference in months
    const diffInYears = Math.floor(diffInDays / 365); // Difference in years
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }
  };

  const getAllContacts = async () => {
        try {
          // Reference to the "users" collection
          const messagesCollectionRef = collection(db, "messages");
      
          // Get all documents in the "users" collection
          const messagesquerySnapshot = await getDocs(messagesCollectionRef);
      
          // Extract the user data from the querySnapshot
          const messagesList = messagesquerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),  // Spread the data of the user document
          }));
  
          const data = []
          messagesList.map((item) => {
            data.push({
              id: item.id,
              username: item.username,
              email: item.email,
              message: item.message,
              timestamp: calculateTimeAgo(item.timestamp),
              })
          })
          
          setContacts(data)
      
        } catch (error) {
          console.error("Error fetching users: ", error);
        }
      };

      useEffect(() => {
        getAllContacts();
      }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
        <p className="text-gray-600">View and manage user inquiries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{contact.username}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="w-4 h-4 mr-1" />
                      {contact.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {contact.timestamp}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">{contact.message}</p>
              </div>
              {/* <div className="mt-4 flex justify-end">
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200">
                  Mark as Resolved
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContacts;
