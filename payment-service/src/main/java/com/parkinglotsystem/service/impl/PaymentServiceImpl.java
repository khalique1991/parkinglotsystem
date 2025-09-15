package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.entity.Payment;
import com.parkinglotsystem.entity.PaymentStatus;
import com.parkinglotsystem.repository.PaymentRepository;
import com.parkinglotsystem.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    @Override
    public Payment processPayment(Long ticketId, BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        Payment payment = Payment.builder()
                .ticketId(ticketId)
                .amount(amount)
                .status(PaymentStatus.COMPLETED) // assume instant success for now
                .build();

        return paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentByTicket(Long ticketId) {
        return paymentRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new RuntimeException("Payment not found for ticketId: " + ticketId));
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
