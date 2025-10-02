package com.parkinglotsystem.mapper;


import com.parkinglotsystem.dto.ReservationResponseDTO;
import com.parkinglotsystem.entity.Reservation;

public class ReservationMapper {
    public static ReservationResponseDTO mapToDTO(Reservation reservation) {
            ReservationResponseDTO dto = new ReservationResponseDTO();
            dto.setId(reservation.getId());
            dto.setParkingSessionId(reservation.getParkingSessionId());
            dto.setCustomerId(reservation.getCustomerId());
            dto.setStatus(reservation.getStatus());
            dto.setStartTime(reservation.getStartTime());
            dto.setCreatedAt(reservation.getCreatedAt());
            return dto;
        }
}
