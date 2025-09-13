package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.*;
import com.parkinglotsystem.enums.PaymentStatus;
import com.parkinglotsystem.enums.TicketStatus;
import com.parkinglotsystem.enums.VehicleType;
import com.parkinglotsystem.repository.TicketRepository;
import com.parkinglotsystem.repository.VehicleRepository;
import com.parkinglotsystem.service.impl.TicketServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


import java.math.BigDecimal;
import java.time.Instant;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


public class TicketServiceTest {


    @Test
    void testCreateEntry() {
        // Mock dependencies
        VehicleRepository vehicleRepo = Mockito.mock(VehicleRepository.class);
        TicketRepository ticketRepo = Mockito.mock(TicketRepository.class);
        SpotAssigner spotAssigner = Mockito.mock(SpotAssigner.class); //
        PaymentService paymentService= Mockito.mock(PaymentService.class);// <-- mock this, not real SimpleSpotAssigner

        // Service under test
        TicketServiceImpl service = new TicketServiceImpl(ticketRepo, vehicleRepo, spotAssigner,paymentService);

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
        TicketRepository ticketRepo = Mockito.mock(TicketRepository.class);
        VehicleRepository vehicleRepo = Mockito.mock(VehicleRepository.class);
        SpotAssigner spotAssigner = Mockito.mock(SpotAssigner.class);
        PaymentService paymentService = Mockito.mock(PaymentService.class);

        TicketServiceImpl service = new TicketServiceImpl(ticketRepo, vehicleRepo, spotAssigner, paymentService);

        Ticket activeTicket = Ticket.builder()
                .id(1L)
                .vehicleId(100L)
                .spotId(10L)
                .entryTime(Instant.now().minusSeconds(3600)) // 1 hour ago
                .status(TicketStatus.ACTIVE)
                .build();

        Mockito.when(ticketRepo.findById(1L)).thenReturn(Optional.of(activeTicket));
        Mockito.when(ticketRepo.save(Mockito.any(Ticket.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        Mockito.when(paymentService.processPayment(Mockito.eq(1L), Mockito.any(BigDecimal.class)))
                .thenReturn(Payment.builder().id(50L).ticketId(1L).amount(BigDecimal.TEN).status(PaymentStatus.COMPLETED).build());

        Ticket closed = service.closeTicket(1L);

        assertNotNull(closed.getExitTime());
        assertEquals(TicketStatus.CLOSED, closed.getStatus());
        Mockito.verify(spotAssigner).releaseSpot(10L);
        Mockito.verify(paymentService).processPayment(Mockito.eq(1L), Mockito.any(BigDecimal.class));
    }
}
