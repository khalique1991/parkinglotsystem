package com.parkinglotsystem.listener;



import com.parkinglotsystem.events.ParkingSessionCreatedEvent;
import com.parkinglotsystem.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ParkingEventListener {

    private final ReservationService reservationService;

    @KafkaListener(
            topics = "parking_session_created",
            groupId = "ticket-service-group"
    )
    public void listen(@Payload ParkingSessionCreatedEvent event) {
        log.info("🎟 Received ParkingSessionCreatedEvent: {}", event);

        // Convert event → ReservationRequestDTO internally
        reservationService.createReservationFromParkingSession(event);
    }
}
