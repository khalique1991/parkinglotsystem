import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function Navbar() {
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight text-blue-700">Parking System</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/dashboard" className="hover:underline text-gray-700 font-medium">Dashboard</Link>
          <Link to="/parking" className="hover:underline text-gray-700 font-medium">Parking Lot</Link>
          {user ? (
            <button onClick={logout} className="ml-4 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition font-semibold">Logout</button>
          ) : (
            <Link to="/" className="ml-4 px-4 py-2 bg-blue-700 text-white rounded shadow hover:bg-blue-800 transition font-semibold">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
