import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center mt-12">
      <h2 className="text-3xl font-bold">404 — Not Found</h2>
      <p className="mt-4"><Link to="/" className="text-blue-600">Go home</Link></p>
    </div>
  )
}
