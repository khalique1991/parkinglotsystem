package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.Payment;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

public interface PaymentService {
    @Transactional
    Payment processPayment(Long ticketId, Long methodId, BigDecimal amount);

    Payment processPayment(Long ticketId, BigDecimal amount);
    Payment getPaymentByTicket(Long ticketId);
    List<Payment> getAllPayments();
}
