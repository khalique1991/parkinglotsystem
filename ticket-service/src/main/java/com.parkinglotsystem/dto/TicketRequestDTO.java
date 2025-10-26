package com.parkinglotsystem.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TicketRequestDTO {
    private Long parkingSessionId;
    private Long customerId;
    private LocalDateTime startTime;
}
