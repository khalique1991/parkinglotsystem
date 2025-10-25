/*
import { NavLink } from "react-router-dom";
import { navLinks } from "../config/navigation.js";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Sidebar({ collapsed = false }) {
  const { user } = useAuth();
  if (!user) return <div>Loading...</div>; // wait for user to load

  const filteredLinks = navLinks.filter(link => link.roles.includes(user.role));

  return (
    <aside className={`bg-gray-800 text-white ${collapsed ? 'w-20' : 'w-60'} min-h-screen p-4 flex flex-col`}>
      <div className="mb-6 flex items-center gap-3">
        <div className="text-2xl">🚗</div>
        {!collapsed && <h1 className="text-lg font-bold">Parking Admin</h1>}
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {filteredLinks.map(link => (
          <NavLink
            key={link.key}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-gray-700 ${
                isActive ? 'bg-gray-700 font-semibold' : 'text-gray-200'
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <hr className="border-gray-700" />
        <NavLink to="/profile" className="mt-4 block text-sm text-gray-300">Profile</NavLink>
        <NavLink to="/help" className="mt-2 block text-sm text-gray-300">Help & Support</NavLink>
      </div>
    </aside>
  );
}
 *//*

import { NavLink } from "react-router-dom";
import { Navigation } from "../config/navigation.js";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Sidebar({ collapsed = false }) {
  const { user } = useAuth();
  if (!user) return <div>Loading...</div>;

  const filteredLinks = Navigation.filter(link => link.roles.includes(user.role));

  return (
    <aside className={`bg-gray-800 text-white ${collapsed ? 'w-20' : 'w-60'} min-h-screen p-4 flex flex-col`}>
      <div className="mb-6 flex items-center gap-3">
        <div className="text-2xl">🚗</div>
        {!collapsed && <h1 className="text-lg font-bold">Parking Admin</h1>}
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {filteredLinks.map(link => (
          <NavLink
            key={link.key}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-gray-700 ${
                isActive ? 'bg-gray-700 font-semibold' : 'text-gray-200'
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Users', path: '/users' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Sessions', path: '/sessions' },
    { name: 'Payments', path: '/payments' },
    { name: 'Customers', path: '/customers' },
    { name: 'Reports', path: '/reports' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Parking', path: '/parking' },
    { name: 'Tickets', path: '/tickets' },
  ];

  return (
    <aside className="p-6 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-8">Parking Admin</h1>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path} className={`px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-700 font-semibold' : ''}`}>
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
