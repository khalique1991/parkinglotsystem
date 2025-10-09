package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.dto.SessionRequestDTO;
import com.parkinglotsystem.dto.SessionResponseDTO;
import com.parkinglotsystem.entity.UserSession;
import com.parkinglotsystem.events.SessionEndedEvent;
import com.parkinglotsystem.events.SessionStartedEvent;
import com.parkinglotsystem.repository.UserSessionRepository;
import com.parkinglotsystem.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SessionServiceImpl implements SessionService {

    private final UserSessionRepository repo;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private static final String TOPIC_SESSION_STARTED = "session.started";
    private static final String TOPIC_SESSION_ENDED = "session.ended";

    @Override
    public SessionResponseDTO startSession(SessionRequestDTO request) {
        UserSession s = UserSession.builder()
                .userId(request.getUserId())
                .jwtToken(request.getJwtToken())
                .device(request.getDevice())
                .ipAddress(request.getIpAddress())
                .loginTime(LocalDateTime.now())
                .active(true)
                .build();
        s = repo.save(s);
        kafkaTemplate.send(TOPIC_SESSION_STARTED, new SessionStartedEvent(s.getUserId(), s.getId(), s.getLoginTime()));
        return toDto(s);
    }

    @Override
    public void endSession(Long sessionId) {
        repo.findById(sessionId).ifPresent(s -> {
            s.setActive(false);
            s.setLogoutTime(LocalDateTime.now());
            repo.save(s);
            kafkaTemplate.send(TOPIC_SESSION_ENDED, new SessionEndedEvent(s.getUserId(), s.getId(), s.getLogoutTime()));
        });
    }

    @Override
    public List<SessionResponseDTO> getSessionsForUser(Long userId) {
        return repo.findByUserIdOrderByLoginTimeDesc(userId).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<SessionResponseDTO> getActiveSessions() {
        return repo.findByActiveTrue().stream().map(this::toDto).collect(Collectors.toList());
    }

    private SessionResponseDTO toDto(UserSession s) {
        return SessionResponseDTO.builder()
                .id(s.getId())
                .userId(s.getUserId())
                .device(s.getDevice())
                .ipAddress(s.getIpAddress())
                .loginTime(s.getLoginTime())
                .logoutTime(s.getLogoutTime())
                .active(s.isActive())
                .build();
    }
}
