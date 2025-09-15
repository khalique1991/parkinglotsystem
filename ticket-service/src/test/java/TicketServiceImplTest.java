/*
import com.parkinglotsystem.TicketServiceApplication;
import com.parkinglotsystem.controller.ParkingController;
import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.entity.Ticket;
import com.parkinglotsystem.entity.Vehicle;
import com.parkinglotsystem.enums.SpotType;
import com.parkinglotsystem.enums.TicketStatus;
import com.parkinglotsystem.repository.ParkingSpotRepository;
import com.parkinglotsystem.repository.TicketRepository;
import com.parkinglotsystem.repository.VehicleRepository;
import com.parkinglotsystem.service.SpotAssigner;
import com.parkinglotsystem.service.impl.TicketServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TicketServiceImplTest {

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private VehicleRepository vehicleRepository;

    @Mock
    private SpotAssigner spotAssigner;

    @Mock
    private ParkingSpotRepository parkingSpotRepository;

    @InjectMocks
    private TicketServiceImpl ticketService;

    private Vehicle vehicle;
    private ParkingSpot spot;
    private Ticket ticket;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        vehicle = Vehicle.builder()
                .id(1L)
                .licensePlate("ABC123")
                .type("CAR")
                .build();

        spot = ParkingSpot.builder()
                .id(10L)
                .spotNumber("A1")
                .type(SpotType.SMALL)
                .occupied(false)
                .build();

        ticket = Ticket.builder()
                .id(100L)
                .vehicleId(vehicle.getId())
                .spotId(spot.getId())
                .entryTime(Instant.now())
                .status(TicketStatus.ACTIVE)
                .build();
    }

    @Test
    void testCreateEntry_success() {
        when(vehicleRepository.save(any(Vehicle.class))).thenReturn(vehicle);
        when(spotAssigner.assignAvailableSpot("CAR")).thenReturn(spot);
        when(ticketRepository.save(any(Ticket.class))).thenAnswer(inv -> inv.getArgument(0));

        Ticket created = ticketService.createEntry(vehicle);

        assertNotNull(created);
        assertEquals(1L, created.getVehicleId());
        assertEquals(10L, created.getSpotId());
        assertEquals(TicketStatus.ACTIVE, created.getStatus());
    }

    @Test
    void testCreateEntry_withVehicleNumber_success() {
        when(vehicleRepository.save(any(Vehicle.class))).thenReturn(vehicle);
        when(spotAssigner.assignAvailableSpot("CAR")).thenReturn(spot);
        when(ticketRepository.save(any(Ticket.class))).thenAnswer(inv -> inv.getArgument(0));

        Ticket created = ticketService.createEntry("XYZ789", "CAR");

        assertNotNull(created);
        assertEquals(1L, created.getVehicleId());
        assertEquals(10L, created.getSpotId());
    }

    @Test
    void testCloseTicket_success() {
        ticket.setEntryTime(Instant.now().minusSeconds(3600)); // 1 hour ago
        when(ticketRepository.findById(100L)).thenReturn(Optional.of(ticket));
        when(ticketRepository.save(any(Ticket.class))).thenAnswer(inv -> inv.getArgument(0));

        Ticket closed = ticketService.closeTicket(100L);

        assertEquals(TicketStatus.CLOSED, closed.getStatus());
        assertNotNull(closed.getExitTime());
        assertTrue(closed.getAmount().compareTo(BigDecimal.ZERO) > 0);

        verify(spotAssigner, times(1)).releaseSpot(ticket.getSpotId());
    }

    @Test
    void testCloseTicket_notFound() {
        when(ticketRepository.findById(999L)).thenReturn(Optional.empty());

        Exception ex = assertThrows(IllegalArgumentException.class, () -> ticketService.closeTicket(999L));

        assertEquals("Ticket not found: 999", ex.getMessage());
    }
}
*/
