import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded shadow p-10 mx-auto max-w-lg border border-gray-200">
      <div className="text-6xl font-extrabold text-blue-700 mb-4">404</div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Sorry, the page you are looking for does not exist, was moved, or is temporarily unavailable.
      </p>
      <Link to="/" className="px-6 py-2 rounded bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition">Back to Home</Link>
    </div>
  )
}
