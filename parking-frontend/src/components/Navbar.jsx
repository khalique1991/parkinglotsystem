import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function Navbar() {
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">Parking System</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/parking" className="hover:underline">Parking Lot</Link>
          {user ? (
            <button onClick={logout} className="ml-4 px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          ) : (
            <Link to="/" className="ml-4 px-3 py-1 bg-blue-500 text-white rounded">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
