package com.parkinglotsystem.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class SessionResponseDTO {
    private Long id;
    private Long userId;
    private String device;
    private String ipAddress;
    private LocalDateTime loginTime;
    private LocalDateTime logoutTime;
    private boolean active;
}
