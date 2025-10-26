package com.parkinglotsystem.controller;

import com.parkinglotsystem.dto.TicketRequestDTO;
import com.parkinglotsystem.dto.TicketResponseDTO;
import com.parkinglotsystem.enums.ReservationStatus;
import com.parkinglotsystem.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    /**
     * Create a new reservation (manual flow via REST).
     */
    @PostMapping
    public ResponseEntity<TicketResponseDTO> createReservation(@RequestBody TicketRequestDTO request) {
        TicketResponseDTO created = ticketService.createReservation(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Update reservation status (e.g., CANCELLED, PAID).
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<TicketResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam ReservationStatus status
    ) {
        TicketResponseDTO updated = ticketService.updateReservationStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    /**
     * Get all reservations.
     */
    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getAllReservations() {
        return ResponseEntity.ok(ticketService.getAllReservations());
    }

    /**
     * Get reservation by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> getReservationById(@PathVariable Long id) {
        return ticketService.getReservationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
