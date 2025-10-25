// src/features/parking/Parking.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ParkingList from './ParkingList';
import ParkingDetail from './ParkingDetail';

export default function Parking() {
  return (
    <Routes>
      <Route path="/" element={<ParkingList />} />
      <Route path=":id" element={<ParkingDetail />} />
    </Routes>
  );
}
