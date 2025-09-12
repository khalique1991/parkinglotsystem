package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.constant.AppConstant;
import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.entity.Ticket;
import com.parkinglotsystem.entity.Vehicle;
import com.parkinglotsystem.enums.TicketStatus;
import com.parkinglotsystem.repository.TicketRepository;
import com.parkinglotsystem.repository.VehicleRepository;
import com.parkinglotsystem.service.SpotAssigner;
import com.parkinglotsystem.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
    private final TicketRepository ticketRepository;
    private final VehicleRepository vehicleRepository;
    private final SpotAssigner spotAssigner;


    @Override
    public Ticket createEntry(Vehicle vehicle) {
        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        ParkingSpot assigned = spotAssigner.assignAvailableSpot(String.valueOf(vehicle.getType()));


        Ticket ticket = Ticket.builder()
                .vehicleId(savedVehicle.getId())
                .spotId(assigned.getId())
                .entryTime(Instant.now())
                .status(TicketStatus.ACTIVE)
                .build();


        return ticketRepository.save(ticket);
    }


    @Override
    public Ticket closeTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));


        ticket.setExitTime(Instant.now());
        long hours = Math.max(1, Duration.between(ticket.getEntryTime(), ticket.getExitTime()).toHours());
        ticket.setAmount(hours * 10.0);
        ticket.setStatus(TicketStatus.PAID);


        spotAssigner.releaseSpot(ticket.getSpotId());
        return ticketRepository.save(ticket);
    }
}
