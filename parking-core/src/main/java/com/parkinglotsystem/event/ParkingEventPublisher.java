package com.parkinglotsystem.event;


import com.parkinglotsystem.events.ParkingSessionCreatedEvent;
import lombok.RequiredArgsConstructor;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ParkingEventPublisher {

    private final KafkaTemplate<String, ParkingSessionCreatedEvent> kafkaTemplate;

    public void publishParkingSessionCreated(ParkingSessionCreatedEvent event) {
        kafkaTemplate.send("parking_session_created", event);
    }
}
