package com.parkinglotsystem.events;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParkingSessionCreatedEvent {
    private Long parkingSessionId;
    private String vehicleNumber;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double amount;
    private Long customerId;
}
