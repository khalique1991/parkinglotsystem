package com.parkinglotsystem.listener;

import com.parkinglotsystem.events.PaymentCompletedEvent;
import com.parkinglotsystem.service.ParkingSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PaymentEventListener {

    private final ParkingSessionService parkingSessionService;

    @KafkaListener(
            topics = "payment-completed",
            groupId = "parking-service-group",
            containerFactory = "kafkaListenerContainerFactory"
    )
    public void listen(@Payload PaymentCompletedEvent event, Acknowledgment ack) {
        try {
            log.info("✅ Received PaymentCompletedEvent: {}", event);

            parkingSessionService.markSessionAsPaid(event.getParkingSessionId(), event.getTransactionId());

            // Manually acknowledge after successful processing
            ack.acknowledge();

        } catch (Exception ex) {
            log.error("❌ Failed to process PaymentCompletedEvent: {}", event, ex);
            // Don’t acknowledge → message will be retried depending on Kafka config
        }
    }
}
