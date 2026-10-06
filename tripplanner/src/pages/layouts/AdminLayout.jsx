import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  Home, 
  Info, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: MessageSquare, label: 'Contacts', path: '/admin/contacts' },
    { icon: Home, label: 'Home', path: '/' },
    { icon: Info, label: 'About Us', path: '/about' }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 bg-white shadow-lg transform transition-all duration-300 z-30
          ${isOpen ? 'w-64 translate-x-0' : 'w-20 translate-x-0'}`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b mt-[4rem]">
            <h1 className={`font-bold text-xl text-purple-600 transition-opacity duration-300
                ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              Admin Panel
            </h1>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5 text-purple-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-purple-600" />
              )}
            </button>
          </div>

          <nav className="mt-6 px-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center px-4 py-3 mb-3 text-gray-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span className={`ml-4 transition-opacity duration-300
                    ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
          <div className="p-8">
            {/* Render child components via Outlet */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
