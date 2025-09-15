package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.entity.Ticket;
import com.parkinglotsystem.entity.Vehicle;
import com.parkinglotsystem.enums.TicketStatus;
import com.parkinglotsystem.repository.ParkingSpotRepository;
import com.parkinglotsystem.repository.TicketRepository;
import com.parkinglotsystem.repository.VehicleRepository;
import com.parkinglotsystem.service.SpotAssigner;
import com.parkinglotsystem.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final VehicleRepository vehicleRepository;
    private final SpotAssigner spotAssigner; // a small interface to pick/free spots
    private final ParkingSpotRepository parkingSpotRepository;


    @Override
    @Transactional
    public Ticket createEntry(Vehicle vehicle) {
        // persist or find vehicle (simplified)
        Vehicle saved = vehicleRepository.save(vehicle);

        // assign spot (spotAssigner can be implemented using parkingSpotRepository)
        ParkingSpot assigned = spotAssigner.assignAvailableSpot(vehicle.getType());

        Ticket ticket = Ticket.builder()
                .vehicleId(saved.getId())
                .spotId(assigned.getId())
                .entryTime(Instant.now())
                .status(TicketStatus.ACTIVE)
                .build();

        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket createEntry(String vehicleNumber, String vehicleType) {
        Vehicle vehicle = Vehicle.builder()
                .licensePlate(vehicleNumber)
                .type(vehicleType)
                .build();
        return createEntry(vehicle);
    }

    @Override
    @Transactional
    public Ticket closeTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + ticketId));

        if (ticket.getStatus() != TicketStatus.ACTIVE) {
            throw new IllegalStateException("Ticket not active");
        }

        Instant exit = Instant.now();
        ticket.setExitTime(exit);

        // Simple fee calculation: $10 per hour, minimum 1 hour
        long hours = Math.max(1, Duration.between(ticket.getEntryTime(), ticket.getExitTime()).toHours());
        BigDecimal amount = BigDecimal.valueOf(hours * 10L);
        ticket.setAmount(amount);

        ticket.setStatus(TicketStatus.CLOSED);
        Ticket saved = ticketRepository.save(ticket);

        // release spot
        spotAssigner.releaseSpot(ticket.getSpotId());

        return saved;
    }
}
