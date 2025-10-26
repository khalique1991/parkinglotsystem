package com.parkinglotsystem.service;

import com.parkinglotsystem.dto.TicketRequestDTO;
import com.parkinglotsystem.dto.TicketResponseDTO;
import com.parkinglotsystem.entity.Reservation;
import com.parkinglotsystem.enums.ReservationStatus;
import com.parkinglotsystem.events.ParkingSessionCreatedEvent;
import com.parkinglotsystem.mapper.TicketMapper;
import com.parkinglotsystem.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.parkinglotsystem.mapper.TicketMapper.mapToDTO;

@Slf4j
@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketResponseDTO createReservation(TicketRequestDTO request) {
        Reservation reservation = new Reservation();
        reservation.setParkingSessionId(request.getParkingSessionId());
        reservation.setCustomerId(request.getCustomerId());
        reservation.setStartTime(
                request.getStartTime() != null ? request.getStartTime() : LocalDateTime.now()
        );
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setCreatedAt(LocalDateTime.now());

        Reservation saved = ticketRepository.save(reservation);
        log.info("🎟 Created reservation: {}", saved.getId());

        return mapToDTO(saved);
    }

    public TicketResponseDTO updateReservationStatus(Long id, ReservationStatus status) {
        Reservation reservation = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        reservation.setStatus(status);
        Reservation updated = ticketRepository.save(reservation);
        log.info("✅ Updated reservation {} to {}", id, status);

        return mapToDTO(updated);
    }

    public List<TicketResponseDTO> getAllReservations() {
        return ticketRepository.findAll()
                .stream()
                .map(TicketMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public Optional<TicketResponseDTO> getReservationById(Long id) {
        return ticketRepository.findById(id).map(TicketMapper::mapToDTO);
    }
    public TicketResponseDTO createReservationFromParkingSession(ParkingSessionCreatedEvent event) {
        TicketRequestDTO dto = new TicketRequestDTO();
        dto.setParkingSessionId(event.getParkingSessionId());
        dto.setCustomerId(event.getCustomerId()); // null if event has no customerId
        dto.setStartTime(event.getStartTime());
        return createReservation(dto);
    }


}
