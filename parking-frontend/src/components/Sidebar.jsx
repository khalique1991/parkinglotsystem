import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
  { name: 'Users', path: '/users', icon: '👤' },
  { name: 'Vehicles', path: '/vehicles', icon: '🚗' },
  { name: 'Sessions', path: '/sessions', icon: '⏱️' },
  { name: 'Payments', path: '/payments', icon: '💳' },
  { name: 'Customers', path: '/customers', icon: '🧑‍💼' },
  { name: 'Reports', path: '/reports', icon: '📊' },
  { name: 'Notifications', path: '/notifications', icon: '🔔' },
  { name: 'Parking', path: '/parking', icon: '🅿️' },
  { name: 'Tickets', path: '/tickets', icon: '🎫' },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="p-8 flex flex-col h-full bg-gray-900 text-white min-h-screen shadow-lg w-64">
      <div className="flex items-center gap-3 mb-10">
        <span className="text-3xl">🚗</span>
        <h1 className="text-xl font-extrabold tracking-tight">Parking Admin</h1>
      </div>
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-base hover:bg-blue-700/80 hover:text-white ${isActive ? 'bg-blue-700 text-white shadow' : 'text-gray-200'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-8 border-t border-gray-700">
        <Link to="/profile" className="block text-sm text-gray-300 hover:text-white py-1">Profile</Link>
        <Link to="/help" className="block text-sm text-gray-300 hover:text-white py-1">Help & Support</Link>
      </div>
    </aside>
  );
}
