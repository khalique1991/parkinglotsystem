package com.parkinglotsystem.controller;

import com.parkinglotsystem.dto.ReservationRequestDTO;
import com.parkinglotsystem.dto.ReservationResponseDTO;
import com.parkinglotsystem.enums.ReservationStatus;
import com.parkinglotsystem.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * Create a new reservation (manual flow via REST).
     */
    @PostMapping
    public ResponseEntity<ReservationResponseDTO> createReservation(@RequestBody ReservationRequestDTO request) {
        ReservationResponseDTO created = reservationService.createReservation(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Update reservation status (e.g., CANCELLED, PAID).
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<ReservationResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam ReservationStatus status
    ) {
        ReservationResponseDTO updated = reservationService.updateReservationStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    /**
     * Get all reservations.
     */
    @GetMapping
    public ResponseEntity<List<ReservationResponseDTO>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    /**
     * Get reservation by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReservationResponseDTO> getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
