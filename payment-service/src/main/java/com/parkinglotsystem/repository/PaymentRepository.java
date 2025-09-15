package com.parkinglotsystem.repository;

import com.parkinglotsystem.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // find all payments for a given ticket id
    Optional<Payment> findByTicketId(Long ticketId);

    // find payments by status (SUCCESS, FAILED, etc.)
    List<Payment> findByStatus(String status);
}
