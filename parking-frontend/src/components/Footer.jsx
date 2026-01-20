import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-6 shadow-inner">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-700">Parking System</span>
          <span className="hidden md:inline">|</span>
          <span>Enterprise Parking Management Platform</span>
        </div>
        <div className="mt-2 md:mt-0">
          © {new Date().getFullYear()} Parking System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
