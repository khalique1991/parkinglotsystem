package com.parkinglotsystem.event;

import com.parkinglotsystem.entity.Reservation;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentEventPublisher {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void publishPaymentRequest(Reservation reservationId) {
        kafkaTemplate.send("payment_request", reservationId.toString());
    }
}
