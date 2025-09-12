package com.parkinglotsystem.repository;


import com.parkinglotsystem.entity.Reservation;
import com.parkinglotsystem.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByStatus(ReservationStatus status);
    List<Reservation> findByVehicleId(Long vehicleId);
    List<Reservation> findBySpotId(Long spotId);
}