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
    public ResponseEntity<Ticket> entry(@RequestParam String vehicleNumber,
                                        @RequestParam String vehicleType) {
        Ticket ticket = ticketService.createEntry(vehicleNumber, vehicleType);
        return ResponseEntity.ok(ticket);
    }

    // closeTicket only updates ticket state and computes fee (no payment)
    @PostMapping("/{ticketId}/close")
    public ResponseEntity<Ticket> closeTicket(@PathVariable Long ticketId) {
        Ticket closed = ticketService.closeTicket(ticketId);
        return ResponseEntity.ok(closed);
    }
}
