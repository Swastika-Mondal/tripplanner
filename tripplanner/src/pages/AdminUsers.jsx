import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useFirebase } from '../store/firebasedb';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  // Mock data - replace with actual data from your backend
  const {db} = useFirebase()
  const [users, setUsers] = useState([
    { id: 1, username: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900' },
    { id: 2, username: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8901' },
    { id: 3, username: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234-567-8902' },
    { id: 4, username: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 234-567-8903' },
    { id: 5, username: 'Tom Brown', email: 'tom@example.com', phone: '+1 234-567-8904' }
  ])

  const getAllUsers = async () => {
      try {
        // Reference to the "users" collection
        const usersCollectionRef = collection(db, "users");
    
        // Get all documents in the "users" collection
        const usersquerySnapshot = await getDocs(usersCollectionRef);
    
        // Extract the user data from the querySnapshot
        const usersList = usersquerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),  // Spread the data of the user document
        }));

        // console.log(usersList);
        setUsers(usersList)
        
    
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    useEffect(() => {
      getAllUsers();
    }, [])

  const handleUpdate = (id) => {
    console.log('Update user:', id);
  };

  const handleDelete = async (id) => {
    try {
      // Reference to the 'users' collection and the specific document (user) by id
      const userRef = doc(db, "users", id);
  
      // Delete the user document
      await deleteDoc(userRef);
      toast.success('User deleted successfully!');
      getAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600">Manage your platform users</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-3">
                      {/* <button
                        onClick={() => handleUpdate(user.id)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <Pencil className="w-5 h-5" />
                      </button> */}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
