package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.*;
import com.parkinglotsystem.enums.TicketStatus;
import com.parkinglotsystem.enums.VehicleType;
import com.parkinglotsystem.repository.TicketRepository;
import com.parkinglotsystem.repository.VehicleRepository;
import com.parkinglotsystem.repository.ParkingSpotRepository;
import com.parkinglotsystem.service.impl.TicketServiceImpl;
import com.parkinglotsystem.service.impl.SimpleSpotAssigner;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;


import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


public class TicketServiceTest {


    @Test
    void testCreateEntry() {
        // Mock dependencies
        VehicleRepository vehicleRepo = Mockito.mock(VehicleRepository.class);
        TicketRepository ticketRepo = Mockito.mock(TicketRepository.class);
        SpotAssigner spotAssigner = Mockito.mock(SpotAssigner.class); // <-- mock this, not real SimpleSpotAssigner

        // Service under test
        TicketServiceImpl service = new TicketServiceImpl(ticketRepo, vehicleRepo, spotAssigner);

        // Arrange vehicle
        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .licensePlate("ABC123")
                .type(String.valueOf(VehicleType.CAR))
                .build();

        // Arrange parking spot
        ParkingSpot mockSpot = ParkingSpot.builder()
                .id(10L)
                .spotNumber("A1")
                .occupied(false)
                .build();

        // Arrange ticket that repo will save
        Ticket savedTicket = Ticket.builder()
                .id(100L)
                .vehicleId(vehicle.getId())
                .spotId(mockSpot.getId())
                .status(TicketStatus.ACTIVE)
                .build();

        // Mock repository & assigner behavior
        Mockito.when(vehicleRepo.save(Mockito.any(Vehicle.class)))
                .thenReturn(vehicle);

        Mockito.when(spotAssigner.assignAvailableSpot(Mockito.anyString()))
                .thenReturn(mockSpot);

        Mockito.when(ticketRepo.save(Mockito.any(Ticket.class)))
                .thenReturn(savedTicket);

        // Act
        Ticket ticket = service.createEntry(vehicle);

        // Assert
        assertNotNull(ticket);
        assertEquals(vehicle.getId(), ticket.getVehicleId());
        assertEquals(mockSpot.getId(), ticket.getSpotId());
        assertEquals(TicketStatus.ACTIVE, ticket.getStatus());
    }


    @Test
    void testCloseTicket() {
        VehicleRepository vehicleRepo = Mockito.mock(VehicleRepository.class);
        TicketRepository ticketRepo = Mockito.mock(TicketRepository.class);
        ParkingSpotRepository spotRepo = Mockito.mock(ParkingSpotRepository.class);
        SimpleSpotAssigner spotAssigner = new SimpleSpotAssigner(spotRepo);


        TicketServiceImpl service = new TicketServiceImpl(ticketRepo, vehicleRepo, spotAssigner);


        Ticket t = Ticket.builder()
                .id(1L)
                .vehicleId(1L)
                .spotId(10L)
                .entryTime(Instant.now().minus(2, ChronoUnit.HOURS)) // ✅ Instant
                .status(TicketStatus.ACTIVE)
                .build();
        ParkingSpot s = ParkingSpot.builder().id(10L).spotNumber("A1").occupied(true).build();


        Mockito.when(ticketRepo.findById(1L)).thenReturn(Optional.of(t));
        Mockito.when(ticketRepo.save(Mockito.any())).thenAnswer(i -> i.getArguments()[0]);
        Mockito.when(spotRepo.findById(10L)).thenReturn(Optional.of(s));
        Mockito.when(spotRepo.save(Mockito.any())).thenAnswer(i -> i.getArguments()[0]);


        Ticket closed = service.closeTicket(1L);


        assertThat(closed.getStatus()).isEqualTo(TicketStatus.PAID);
        assertThat(closed.getAmount()).isGreaterThan(0);
        assertThat(s.isOccupied()).isFalse();
    }
}
