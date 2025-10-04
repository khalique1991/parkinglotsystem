package com.parkinglotsystem.service;

import com.parkinglotsystem.event.PaymentEventPublisher;
import com.parkinglotsystem.events.PaymentCompletedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentEventPublisher eventPublisher;

    public void processPayment(Long reservationId, Long parkingSessionId, Double amount) {
        // Simulate payment processing...
        System.out.println("💳 Processing payment for reservation: " + reservationId);

        // Create a payment event after successful processing
        PaymentCompletedEvent event = new PaymentCompletedEvent(
                reservationId,
                parkingSessionId,
                UUID.randomUUID().toString(),  // generate unique transactionId
                amount,
                LocalDateTime.now()
        );

        // Publish event to Kafka
        eventPublisher.publishPaymentCompleted(event);

        System.out.println("✅ Payment completed, event published: " + event);
    }
}
