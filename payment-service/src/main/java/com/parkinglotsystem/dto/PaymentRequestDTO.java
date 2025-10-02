package com.parkinglotsystem.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class PaymentRequestDTO {

    @NotNull(message = "Parking session ID is required")
    private Long parkingSessionId;

    @NotNull(message = "Amount is required")
    private Double amount;

    private String currency;

    private String paymentMethod; // e.g., CARD, UPI, CASH
}
