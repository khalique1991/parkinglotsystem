package com.parkinglotsystem.event;


import com.parkinglotsystem.events.PaymentCompletedEvent;
import lombok.RequiredArgsConstructor;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentEventPublisher {

    private final KafkaTemplate<String, PaymentCompletedEvent> kafkaTemplate;

    public void publishPaymentCompleted(PaymentCompletedEvent event) {
        kafkaTemplate.send("payment_completed", event);
    }
}
