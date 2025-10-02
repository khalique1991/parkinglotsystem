/*
package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.dto.PaymentRequestDTO;
import com.parkinglotsystem.entity.Payment;
import com.parkinglotsystem.enums.PaymentStatus;
import com.parkinglotsystem.event.PaymentEventProducer;
import com.parkinglotsystem.events.PaymentCompletedEvent;
import com.parkinglotsystem.repository.PaymentRepository;
import com.parkinglotsystem.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentEventProducer producer;

    @Override
    public Payment processPayment(PaymentRequestDTO requestDTO) {

        // Mocking a payment gateway response
        String transactionId = UUID.randomUUID().toString();

        Payment payment = Payment.builder()
                .parkingSessionId(requestDTO.getParkingSessionId())
                .amount(requestDTO.getAmount())
                .paymentMethod(requestDTO.getPaymentMethod())
                .transactionId(transactionId)
                .status(PaymentStatus.SUCCESS) // Assume success for mock
                .timestamp(Instant.now())
                .build();

        Payment saved = paymentRepository.save(payment);

        // Publish Kafka event after successful payment
        PaymentCompletedEvent event = new PaymentCompletedEvent(
                saved.getId(),
                saved.getParkingSessionId(),
                saved.getAmount(),
                saved.getTransactionId(),
                saved.getTimestamp()
        );

        producer.publish(event);

        return saved;
    }
}
*/
