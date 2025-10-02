package com.parkinglotsystem.listener;


import com.parkinglotsystem.enums.ReservationStatus;
import com.parkinglotsystem.events.PaymentCompletedEvent;
import com.parkinglotsystem.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PaymentEventListener {

    private final ReservationService reservationService;

    @KafkaListener(
            topics = "payment_completed",
            groupId = "ticket-service-group"
    )
    public void listen(@Payload PaymentCompletedEvent event) {
        log.info("💰 Received PaymentCompletedEvent: {}", event);

        // Update reservation status to PAID
        reservationService.updateReservationStatus(
                event.getReservationId(),
                ReservationStatus.PAID
        );
    }
}
