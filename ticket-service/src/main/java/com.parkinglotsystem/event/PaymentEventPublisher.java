package com.parkinglotsystem.event;

import com.parkinglotsystem.entity.Reservation;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentEventPublisher {

    // Note: use Object instead of String so you can send DTOs or objects as JSON later.
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishPaymentRequest(Reservation reservation) {
        kafkaTemplate.send("payment_request", reservation);
        System.out.println("✅ Payment request published for reservation ID: " + reservation.getId());
    }
}
