package com.parkinglotsystem.repository;


import com.parkinglotsystem.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Reservation, Long> {
}
