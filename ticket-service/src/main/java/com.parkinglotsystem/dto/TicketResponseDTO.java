package com.parkinglotsystem.dto;

import com.parkinglotsystem.enums.ReservationStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TicketResponseDTO {
    private Long id;
    private Long parkingSessionId;
    private Long customerId;
    private ReservationStatus status;
    private LocalDateTime startTime;
    private LocalDateTime createdAt;
}
