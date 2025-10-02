package com.parkinglotsystem.repository;

import com.parkinglotsystem.entity.ParkingSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingSessionRepository extends JpaRepository<ParkingSession, Long> {
    List<ParkingSession> findByVehicleId(Long vehicleId);
}
