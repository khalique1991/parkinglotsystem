package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.Ticket;
import com.parkinglotsystem.entity.Vehicle;

public interface TicketService {
    Ticket createEntry(Vehicle vehicle);
    Ticket createEntry(String vehicleNumber, String vehicleType); // overload
    Ticket closeTicket(Long ticketId);
}
