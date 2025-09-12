package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.entity.ParkingLot;
import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.entity.Vehicle;
import com.parkinglotsystem.repository.ParkingLotRepository;
import com.parkinglotsystem.repository.ParkingSpotRepository;
import com.parkinglotsystem.repository.VehicleRepository;
import com.parkinglotsystem.service.ParkingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParkingServiceImpl implements ParkingService {

    private final ParkingLotRepository parkingLotRepository;
    private final ParkingSpotRepository parkingSpotRepository;
    private final VehicleRepository vehicleRepository;

    @Override
    @Transactional
    public ParkingLot createParkingLot(ParkingLot lot) {
        return parkingLotRepository.save(lot);
    }

    @Override
    @Transactional
    public ParkingSpot createSpot(Long parkingLotId, ParkingSpot spot) {
        ParkingLot lot = parkingLotRepository.findById(parkingLotId)
                .orElseThrow(() -> new IllegalArgumentException("ParkingLot not found: " + parkingLotId));
        spot.setParkingLot(lot);
        return parkingSpotRepository.save(spot);
    }

    @Override
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Override
    public List<ParkingSpot> findAvailableSpots(Long parkingLotId) {
        List<ParkingSpot> all = parkingSpotRepository.findByParkingLotId(parkingLotId);
        // filter locally to avoid creating query complexity here (could push to repo)
        // keep Java 8 friendly
        List<ParkingSpot> available = new ArrayList<ParkingSpot>();
        for (ParkingSpot s : all) {
            if (!s.isOccupied()) {
                available.add(s);
            }
        }
        return available;
    }
}
