package com.parkinglotsystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ReservationReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long reservationId;
    private Long parkingSessionId;
    private Long customerId;
    private String status;
    private LocalDateTime createdAt;
}
