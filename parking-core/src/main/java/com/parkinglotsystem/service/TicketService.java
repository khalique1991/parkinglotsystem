package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.Ticket;
import com.parkinglotsystem.entity.Vehicle;

public interface TicketService {
    Ticket createEntry(Vehicle vehicle);
    Ticket closeTicket(Long ticketId);
}
