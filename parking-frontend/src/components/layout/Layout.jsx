/*
import Sidebar from "../Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
 */
import React, { useState } from "react";
import Sidebar from "../Sidebar.jsx";
import { FiMenu, FiX } from "react-icons/fi"; // Requires lucide-react or react-icons

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-40 inset-y-0 left-0 w-60 bg-gray-900 text-white transform transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-60">
        {/* Mobile Topbar */}
        <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
          <button onClick={toggleSidebar}>
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-lg font-bold">Parking Admin</h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );

}

