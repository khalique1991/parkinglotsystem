package com.parkinglotsystem.dto;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class SessionRequestDTO {
    private Long userId;
    private String jwtToken;
    private String device;
    private String ipAddress;
}
