package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.Payment;

import java.math.BigDecimal;
import java.util.List;

public interface PaymentService {
    Payment processPayment(Long ticketId, BigDecimal amount);
    Payment getPaymentByTicket(Long ticketId);
    List<Payment> getAllPayments();
}
