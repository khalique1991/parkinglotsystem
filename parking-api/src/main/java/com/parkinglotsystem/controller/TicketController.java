package com.parkinglotsystem.controller;

import com.parkinglotsystem.entity.Ticket;
import com.parkinglotsystem.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/entry")
    public ResponseEntity<Ticket> createEntry(@RequestParam String licensePlate,
                                              @RequestParam String vehicleType) {
        return ResponseEntity.status(201).body(ticketService.createEntry(licensePlate, vehicleType));
    }

    @PostMapping("/{ticketId}/close")
    public ResponseEntity<Ticket> closeTicket(@PathVariable Long ticketId) {
        return ResponseEntity.ok(ticketService.closeTicket(ticketId));
    }
}

