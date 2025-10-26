package com.parkinglotsystem.mapper;


import com.parkinglotsystem.dto.TicketResponseDTO;
import com.parkinglotsystem.entity.Reservation;

public class TicketMapper {
    public static TicketResponseDTO mapToDTO(Reservation reservation) {
            TicketResponseDTO dto = new TicketResponseDTO();
            dto.setId(reservation.getId());
            dto.setParkingSessionId(reservation.getParkingSessionId());
            dto.setCustomerId(reservation.getCustomerId());
            dto.setStatus(reservation.getStatus());
            dto.setStartTime(reservation.getStartTime());
            dto.setCreatedAt(reservation.getCreatedAt());
            return dto;
        }
}
