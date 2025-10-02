package com.parkinglotsystem.mapper;

import com.parkinglotsystem.dto.PaymentResponseDTO;
import com.parkinglotsystem.entity.Payment;

public class PaymentMapper {

    public static PaymentResponseDTO mapToDTO(Payment p) {
        return PaymentResponseDTO.builder()
                .id(p.getId())
                .parkingSessionId(p.getParkingSessionId())
                .amount(p.getAmount())
                .currency(p.getCurrency())
                .status(p.getStatus())
                .transactionId(p.getTransactionId())
                .gatewayResponse(p.getGatewayResponse())
                .build();
    }
}
