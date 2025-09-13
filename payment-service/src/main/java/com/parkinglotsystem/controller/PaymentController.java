package com.parkinglotsystem.controller;

import com.parkinglotsystem.entity.Payment;
import com.parkinglotsystem.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // Process payment for a ticket
    @PostMapping("/{ticketId}")
    public ResponseEntity<Payment> processPayment(@PathVariable Long ticketId,
                                                  @RequestParam BigDecimal amount) {
        Payment payment = paymentService.processPayment(ticketId, amount);
        return ResponseEntity.ok(payment);
    }
}
