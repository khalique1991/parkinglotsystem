package com.parkinglotsystem.entity;

import com.parkinglotsystem.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;


@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Long lotId; // reference to parking lot
    private Long spotId; // reference to parking spot
    private Long vehicleId;


    private Instant entryTime;
    private Instant exitTime;


    private BigDecimal amount;


    @Enumerated(EnumType.STRING)
    private TicketStatus status;
}