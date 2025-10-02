package com.parkinglotsystem.service;


import com.parkinglotsystem.dto.ParkingSessionResponseDTO;
import com.parkinglotsystem.entity.ParkingSession;

import java.util.List;

public interface ParkingSessionService {
    ParkingSessionResponseDTO startSession(Long customerId, Long vehicleId);
    ParkingSessionResponseDTO stopSession(Long sessionId);
    ParkingSessionResponseDTO getSession(Long sessionId);
    List<ParkingSessionResponseDTO> getSessionsByVehicle(Long vehicleId);

    // NEW - mark session as paid
    void markSessionAsPaid(Long sessionId, String transactionId);
}

