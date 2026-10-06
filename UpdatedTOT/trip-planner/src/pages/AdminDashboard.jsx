import React, { useEffect, useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Target, 
  TrendingUp,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { useFirebase } from '../store/firebasedb';
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const AdminDashboard = () => {
  const [noUsers, setNoUsers] = useState(0)
  const [noMessages, setNoMessages] = useState(0)
  const [noItineraries, setNoItineraries] = useState(0)
  const [newRegistrationTime, setNewRegistrationTime] = useState('1 seconds ago')
  const [newMessageTime, setNewMessageTime] = useState('1 seconds ago')
  const stats = [
    { icon: Users, label: 'Total Users', value: noUsers, change: '+12%' },
    { icon: MessageCircle, label: 'New Messages', value: noMessages, change: '+18%' },
    { icon: Target, label: 'Itineraries', value: noItineraries, change: '+25%' },
    { icon: TrendingUp, label: 'Growth', value: '42%', change: '+8%' }
  ];
  const {db} = useFirebase()

  const getAllUsers = async () => {
    try {
      // Reference to the "users" collection
      const usersCollectionRef = collection(db, "users");
      const messagesCollectionRef = collection(db, "messages");
      const itinerariesCollectionRef = collection(db, "itineraries");
  
      // Get all documents in the "users" collection
      const usersquerySnapshot = await getDocs(usersCollectionRef);
      const messagesquerySnapshot = await getDocs(messagesCollectionRef);
      const itinerariesquerySnapshot = await getDocs(itinerariesCollectionRef);
  
      // Extract the user data from the querySnapshot
      const usersList = usersquerySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),  // Spread the data of the user document
      }));

      const messagesList = messagesquerySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),  // Spread the data of the user document
      }));

      const itinerariesList = itinerariesquerySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),  // Spread the data of the user document
      }));

      let total_itineraries = 0;

      itinerariesList.map((item) => {
        total_itineraries+=item.data.length
      })
  
      // Log or return the users list
      setNoUsers(usersList.length)
      setNoMessages(messagesList.length)
      setNoItineraries(total_itineraries)
  
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const getLastRegistrationTime = async () => {
    try {
      // Reference to the 'users' collection
      const usersCollectionRef = collection(db, "users");
  
      // Query to get the user with the most recent registration (sorted by timestamp)
      const q = query(usersCollectionRef, orderBy("timestamp", "desc"), limit(1));
  
      // Fetch the document(s)
      const querySnapshot = await getDocs(q);
  
      // Check if there are any users
      if (!querySnapshot.empty) {
        // Get the most recent user document
        const latestUserDoc = querySnapshot.docs[0];
        const timestamp = latestUserDoc.data().timestamp;
  
        // Calculate the time ago from the timestamp
        const timeAgo = calculateTimeAgo(timestamp);
        
        setNewRegistrationTime(timeAgo)
        // console.log(`Last registration: ${timeAgo}`);
        // return timeAgo;
      } else {
        console.log("No users found.");
        return "No users found.";
      }
    } catch (error) {
      console.error("Error fetching last registration time: ", error);
    }
  };
  
  // Helper function to calculate the time difference
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

  // Function to get the last message time
const getLastMessageTime = async () => {
  try {
    // Reference to the 'messages' collection
    const messagesCollectionRef = collection(db, "messages");

    // Query to get the most recent message (sorted by timestamp)
    const q = query(messagesCollectionRef, orderBy("timestamp", "desc"), limit(1));

    // Fetch the document(s)
    const querySnapshot = await getDocs(q);

    // Check if there are any messages
    if (!querySnapshot.empty) {
      // Get the most recent message document
      const latestMessageDoc = querySnapshot.docs[0];
      const timestamp = latestMessageDoc.data().timestamp;

      // Calculate the time ago from the timestamp
      const timeAgo = calculateTimeAgo(timestamp);

      setNewMessageTime(timeAgo)
      
      // console.log(`Last message: ${timeAgo}`);
      // return timeAgo;
    } else {
      console.log("No messages found.");
      return "No messages found.";
    }
  } catch (error) {
    console.error("Error fetching last message time: ", error);
  }
};


  

  useEffect(() => {
    getAllUsers()
    getLastRegistrationTime()
    getLastMessageTime()
  }, [])



  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your TravelPal admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-green-500 text-sm font-medium flex items-center">
                {stat.change}
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { title: 'New user registration', time: newRegistrationTime },
              { title: 'Contact message received', time: newMessageTime },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-gray-800 font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">System Status</h2>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">All systems operational</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Server Uptime', status: '99.9%' },
              { name: 'API Response Time', status: '145ms' },
              { name: 'Database Load', status: '24%' },
              { name: 'Storage Usage', status: '42%' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <span className="text-gray-600">{item.name}</span>
                <span className="font-medium text-gray-800">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
