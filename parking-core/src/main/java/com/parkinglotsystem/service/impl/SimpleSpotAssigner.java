package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.repository.ParkingSpotRepository;
import com.parkinglotsystem.service.SpotAssigner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SimpleSpotAssigner implements SpotAssigner {
    private final ParkingSpotRepository parkingSpotRepository;

    @Override
    public ParkingSpot assignAvailableSpot(String vehicleType) {
        ParkingSpot spot = parkingSpotRepository.findFirstByOccupiedFalse()
                .orElseThrow(() -> new RuntimeException("No available spots"));
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
