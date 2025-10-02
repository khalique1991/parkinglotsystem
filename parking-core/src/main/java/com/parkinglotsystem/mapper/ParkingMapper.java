package com.parkinglotsystem.mapper;

import com.parkinglotsystem.dto.ParkingSessionResponseDTO;
import com.parkinglotsystem.entity.ParkingSession;

public class ParkingMapper {

    public static ParkingSessionResponseDTO mapToDTO(ParkingSession session) {
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
