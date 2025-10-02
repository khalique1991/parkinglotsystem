package com.parkinglotsystem.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ParkingSessionResponseDTO {
    private Long id;
    private Long customerId;
    private Long vehicleId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean paid;
    private String transactionId;
}
