package com.parkinglotsystem.repository;


import com.parkinglotsystem.entity.ParkingSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {
    List<ParkingSpot> findByOccupied(boolean occupied);
    List<ParkingSpot> findByParkingLotId(Long parkingLotId);
    Optional<ParkingSpot> findBySpotNumber(String spotNumber);
    Optional<ParkingSpot> findFirstByOccupiedFalse();

}