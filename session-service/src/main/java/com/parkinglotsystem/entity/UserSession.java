package com.parkinglotsystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_sessions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserSession {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(length = 2000)
    private String jwtToken;

    private String device;
    private String ipAddress;

    private LocalDateTime loginTime;
    private LocalDateTime logoutTime;

    private boolean active;
}
