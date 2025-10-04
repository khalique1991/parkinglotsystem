package com.parkinglotsystem.listener;

import com.parkinglotsystem.events.PaymentCompletedEvent;
import com.parkinglotsystem.events.ParkingSessionCreatedEvent;
import com.parkinglotsystem.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final NotificationService notificationService;

    @KafkaListener(topics = "parking_session_created", groupId = "notification-service-group")
    public void handleParkingSession(@Payload ParkingSessionCreatedEvent event) {
        log.info("Received ParkingSessionCreatedEvent: {}", event);
        notificationService.notifyParkingStarted(event.getCustomerId(), event.getParkingSessionId());
    }

    @KafkaListener(topics = "payment_completed", groupId = "notification-service-group")
    public void handlePayment(@Payload PaymentCompletedEvent event) {
        log.info("Received PaymentCompletedEvent: {}", event);
        notificationService.notifyPaymentStatus(event.getCustomerId(), event.getReservationId(), event.getStatus().name());
    }
}
