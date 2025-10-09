package com.parkinglotsystem.event;

import lombok.*;

import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class UserCreatedEvent {
    private Long userId;
    private String username;
    private String email;
    private LocalDateTime timestamp;
}
