package com.parkinglotsystem.controller;

import com.parkinglotsystem.entity.Ticket;
import com.parkinglotsystem.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    // Vehicle entry
    @PostMapping("/entry")
    public ResponseEntity<Ticket> createEntry(@RequestParam String vehicleNumber,
                                              @RequestParam String vehicleType) {
        Ticket ticket = ticketService.createEntry(vehicleNumber, vehicleType);
        return ResponseEntity.ok(ticket);
    }

    // Vehicle exit (just closes ticket, does NOT trigger payment)
    @PostMapping("/{ticketId}/exit")
    public ResponseEntity<Ticket> closeTicket(@PathVariable Long ticketId) {
        Ticket ticket = ticketService.closeTicket(ticketId);
        return ResponseEntity.ok(ticket);
    }
}
