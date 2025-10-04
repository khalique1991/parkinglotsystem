package com.parkinglotsystem.events;

import com.parkinglotsystem.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCompletedEvent {
    private Long reservationId;        // Reservation associated with payment
    private Long parkingSessionId;     // Parking session ID
    private Long customerId;           // Customer who made the payment
    private String transactionId;      // Transaction ID from gateway
    private Double amount;             // Paid amount
    private String currency;           // Currency, e.g., INR
    private PaymentStatus status;      // SUCCESS / FAILED
    private LocalDateTime timestamp;   // Event creation time
}
