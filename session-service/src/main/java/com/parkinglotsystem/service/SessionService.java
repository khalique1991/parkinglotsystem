package com.parkinglotsystem.service;


import com.parkinglotsystem.dto.SessionRequestDTO;
import com.parkinglotsystem.dto.SessionResponseDTO;

import java.util.List;

public interface SessionService {
    SessionResponseDTO startSession(SessionRequestDTO request);
    void endSession(Long sessionId);
    List<SessionResponseDTO> getSessionsForUser(Long userId);
    List<SessionResponseDTO> getActiveSessions();
}
