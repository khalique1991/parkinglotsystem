package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.dto.PaymentRequestDTO;
import com.parkinglotsystem.dto.PaymentResponseDTO;
import com.parkinglotsystem.enums.PaymentStatus;
import com.parkinglotsystem.service.PaymentGateway;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MockPaymentGateway implements PaymentGateway {

    @Override
    public PaymentResponseDTO process(PaymentRequestDTO request) {
        // simulate processing delay and success/failure
        try { Thread.sleep(300); } catch (InterruptedException ignored) {}

        // For demo, succeed if amount > 0
        boolean success = request.getAmount() != null && request.getAmount() > 0;
        String tx = "MOCK-" + UUID.randomUUID();

        PaymentResponseDTO resp = PaymentResponseDTO.builder()
                .parkingSessionId(request.getParkingSessionId())
                .amount(request.getAmount())
                .currency(request.getCurrency() == null ? "INR" : request.getCurrency())
                .status(success ? PaymentStatus.SUCCESS : PaymentStatus.FAILED)
                .transactionId(tx)
                .gatewayResponse(success ? "MOCK_SUCCESS" : "MOCK_FAILED")
                .build();

        return resp;
    }
}

