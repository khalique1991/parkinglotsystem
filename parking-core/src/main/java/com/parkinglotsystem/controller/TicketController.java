package com.parkinglotsystem.controller;

import com.parkinglotsystem.entity.Ticket;
import com.parkinglotsystem.entity.Vehicle;
import com.parkinglotsystem.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;
    @PostMapping("/entry")
    public ResponseEntity<Ticket> createEntry(@RequestBody Vehicle vehicle) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.createEntry(vehicle));
    }


    @PostMapping("/exit/{ticketId}")
    public ResponseEntity<Ticket> closeTicket(@PathVariable Long ticketId) {
        return ResponseEntity.ok(ticketService.closeTicket(ticketId));
    }
}
