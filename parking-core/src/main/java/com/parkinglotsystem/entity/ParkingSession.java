package com.parkinglotsystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ParkingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;

    private Long vehicleId;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private boolean paid = false;

    private String transactionId;
}
