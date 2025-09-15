package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.entity.Payment;
import com.parkinglotsystem.entity.PaymentMethod;
import com.parkinglotsystem.repository.PaymentMethodRepository;
import com.parkinglotsystem.repository.PaymentRepository;
import com.parkinglotsystem.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentMethodRepository paymentMethodRepository;

    @Override
    @Transactional
    public Payment processPayment(Long ticketId, Long methodId, BigDecimal amount) {
        PaymentMethod method = paymentMethodRepository.findById(methodId)
                .orElseThrow(() -> new IllegalArgumentException("Payment method not found: " + methodId));

        Payment payment = Payment.builder()
                .ticketId(ticketId)          // ✅ no circular dependency
                .paymentMethod(method)
                .amount(amount)
                .paymentTime(LocalDateTime.now())   // ✅ correct
                .status("SUCCESS")
                .build();

        return paymentRepository.save(payment);
    }

    @Override
    public Payment processPayment(Long ticketId, BigDecimal amount) {
        // Default to CASH if no method provided
        PaymentMethod method = paymentMethodRepository.findByMethodName("CASH")
                .orElseThrow(() -> new IllegalArgumentException("Default payment method not found: CASH"));

        return processPayment(ticketId, method.getId(), amount);
    }

    @Override
    public Payment getPaymentByTicket(Long ticketId) {
        return paymentRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found for ticketId: " + ticketId));
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

}
