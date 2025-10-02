package com.parkinglotsystem.service;

import com.parkinglotsystem.dto.ReservationRequestDTO;
import com.parkinglotsystem.dto.ReservationResponseDTO;
import com.parkinglotsystem.entity.Reservation;
import com.parkinglotsystem.enums.ReservationStatus;
import com.parkinglotsystem.events.ParkingSessionCreatedEvent;
import com.parkinglotsystem.mapper.ReservationMapper;
import com.parkinglotsystem.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.parkinglotsystem.mapper.ReservationMapper.mapToDTO;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationResponseDTO createReservation(ReservationRequestDTO request) {
        Reservation reservation = new Reservation();
        reservation.setParkingSessionId(request.getParkingSessionId());
        reservation.setCustomerId(request.getCustomerId());
        reservation.setStartTime(
                request.getStartTime() != null ? request.getStartTime() : LocalDateTime.now()
        );
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setCreatedAt(LocalDateTime.now());

        Reservation saved = reservationRepository.save(reservation);
        log.info("🎟 Created reservation: {}", saved.getId());

        return mapToDTO(saved);
    }

    public ReservationResponseDTO updateReservationStatus(Long id, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        reservation.setStatus(status);
        Reservation updated = reservationRepository.save(reservation);
        log.info("✅ Updated reservation {} to {}", id, status);

        return mapToDTO(updated);
    }

    public List<ReservationResponseDTO> getAllReservations() {
        return reservationRepository.findAll()
                .stream()
                .map(ReservationMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ReservationResponseDTO> getReservationById(Long id) {
        return reservationRepository.findById(id).map(ReservationMapper::mapToDTO);
    }
    public ReservationResponseDTO createReservationFromParkingSession(ParkingSessionCreatedEvent event) {
        ReservationRequestDTO dto = new ReservationRequestDTO();
        dto.setParkingSessionId(event.getParkingSessionId());
        dto.setCustomerId(event.getCustomerId()); // null if event has no customerId
        dto.setStartTime(event.getStartTime());
        return createReservation(dto);
    }


}
