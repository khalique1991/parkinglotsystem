package com.parkinglotsystem.entity;

import com.parkinglotsystem.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long parkingSessionId;

    private Double amount;

    private String currency;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String transactionId;

    @Lob
    private String gatewayResponse;

    private LocalDateTime createdAt = LocalDateTime.now();
}
