/*
package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.enums.SpotType;
import com.parkinglotsystem.repository.ParkingSpotRepository;
import com.parkinglotsystem.service.SpotAssigner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SimpleSpotAssigner implements SpotAssigner {
    private final ParkingSpotRepository parkingSpotRepository;

    @Override
    public ParkingSpot assignAvailableSpot(String vehicleType) {
        SpotType spotType = SpotType.valueOf(vehicleType.toUpperCase());

        ParkingSpot spot = parkingSpotRepository.findFirstByTypeAndOccupiedFalse(spotType)
                .orElseThrow(() -> new RuntimeException("No available spots for type: " + spotType));

        spot.setOccupied(true);
        return parkingSpotRepository.save(spot);
    }


    @Override
    public void releaseSpot(Long spotId) {
        ParkingSpot spot = parkingSpotRepository.findById(spotId)
                .orElseThrow(() -> new RuntimeException("Spot not found"));
        spot.setOccupied(false);
        parkingSpotRepository.save(spot);
    }

}
*/
