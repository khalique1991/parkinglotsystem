package com.parkinglotsystem.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReservationRequestDTO {
    private Long parkingSessionId;
    private Long customerId;
    private LocalDateTime startTime;
}
