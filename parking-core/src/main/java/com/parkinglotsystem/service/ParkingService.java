package com.parkinglotsystem.service;


import com.parkinglotsystem.entity.ParkingLot;
import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.entity.Vehicle;

import java.util.List;

public interface ParkingService {
    ParkingLot createParkingLot(ParkingLot lot);
    ParkingSpot createSpot(Long parkingLotId, ParkingSpot spot);
    Vehicle createVehicle(Vehicle vehicle);
    List<ParkingSpot> findAvailableSpots(Long parkingLotId);
}