package com.parkinglotsystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class PaymentReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long parkingSessionId;
    private Long reservationId;
    private Double amount;
    private String currency;
    private String transactionId;
    private String status;
    private LocalDateTime timestamp;
}
