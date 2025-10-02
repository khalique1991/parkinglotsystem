package com.parkinglotsystem.repository;


import com.parkinglotsystem.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
