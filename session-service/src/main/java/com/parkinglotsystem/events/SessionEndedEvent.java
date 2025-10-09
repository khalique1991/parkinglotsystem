package com.parkinglotsystem.events;

import lombok.*;

import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class SessionEndedEvent {
    private Long userId;
    private Long sessionId;
    private LocalDateTime logoutTime;
}
