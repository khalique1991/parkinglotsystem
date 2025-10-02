package com.parkinglotsystem.dto;

import com.parkinglotsystem.enums.PaymentStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponseDTO {
    private Long id;
    private Long parkingSessionId;
    private Double amount;
    private String currency;
    private PaymentStatus status;
    private String transactionId;
    private String gatewayResponse;
}

