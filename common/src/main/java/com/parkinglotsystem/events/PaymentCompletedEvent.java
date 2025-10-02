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
    private Long reservationId;
    private Long parkingSessionId;
    private String transactionId;   // ✅ Add this
    private Double amount;
    private LocalDateTime timestamp;
    private PaymentStatus paymentStatus;
}
