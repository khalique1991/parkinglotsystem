package com.parkinglotsystem.entity;

import com.parkinglotsystem.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long parkingSessionId;
    private Long customerId;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    private LocalDateTime startTime;
    private LocalDateTime createdAt;
}
