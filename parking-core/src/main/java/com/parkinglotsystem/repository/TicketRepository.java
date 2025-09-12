package com.parkinglotsystem.repository;


import com.parkinglotsystem.entity.Ticket;
import com.parkinglotsystem.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByIdAndStatus(Long id, TicketStatus status);
}