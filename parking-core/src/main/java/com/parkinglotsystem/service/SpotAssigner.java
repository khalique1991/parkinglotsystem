package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.ParkingSpot;

public interface SpotAssigner {
    ParkingSpot assignAvailableSpot(String vehicleType);
    void releaseSpot(Long spotId);
}
