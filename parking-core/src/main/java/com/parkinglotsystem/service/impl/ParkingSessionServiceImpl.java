package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.dto.ParkingSessionResponseDTO;
import com.parkinglotsystem.entity.ParkingSession;
import com.parkinglotsystem.repository.ParkingSessionRepository;
import com.parkinglotsystem.service.ParkingSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ParkingSessionServiceImpl implements ParkingSessionService {

    private final ParkingSessionRepository repository;

    @Override
    public ParkingSessionResponseDTO startSession(Long customerId, Long vehicleId) {
        ParkingSession session = new ParkingSession();
        session.setCustomerId(customerId);
        session.setVehicleId(vehicleId);
        session.setStartTime(LocalDateTime.now());
        session.setPaid(false);

        ParkingSession saved = repository.save(session);
        log.info("🚗 Parking session started: {}", saved.getId());
        return mapToDTO(saved);
    }

    @Override
    public ParkingSessionResponseDTO stopSession(Long sessionId) {
        ParkingSession session = repository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Parking session not found"));
        session.setEndTime(LocalDateTime.now());
        ParkingSession updated = repository.save(session);
        log.info("🛑 Parking session stopped: {}", sessionId);
        return mapToDTO(updated);
    }

    @Override
    public ParkingSessionResponseDTO getSession(Long sessionId) {
        ParkingSession session = repository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Parking session not found"));
        return mapToDTO(session);
    }

    @Override
    public List<ParkingSessionResponseDTO> getSessionsByVehicle(Long vehicleId) {
        List<ParkingSession> sessions = repository.findByVehicleId(vehicleId);
        return sessions.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public void markSessionAsPaid(Long sessionId, String transactionId) {
        ParkingSession session = repository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Parking session not found"));
        session.setPaid(true);
        session.setTransactionId(transactionId);
        repository.save(session);
        log.info("✅ Parking session {} marked as PAID with transactionId={}", sessionId, transactionId);
    }

    // Mapper
    private ParkingSessionResponseDTO mapToDTO(ParkingSession session) {
        ParkingSessionResponseDTO dto = new ParkingSessionResponseDTO();
        dto.setId(session.getId());
        dto.setCustomerId(session.getCustomerId());
        dto.setVehicleId(session.getVehicleId());
        dto.setStartTime(session.getStartTime());
        dto.setEndTime(session.getEndTime());
        dto.setPaid(session.isPaid());
        dto.setTransactionId(session.getTransactionId());
        return dto;
    }
}
