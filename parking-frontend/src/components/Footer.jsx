import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-6">
      <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Parking System — Built with ❤️
      </div>
    </footer>
  )
}
