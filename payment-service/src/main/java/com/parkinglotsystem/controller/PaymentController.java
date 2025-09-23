/*
package com.parkinglotsystem.controller;

import com.parkinglotsystem.entity.Payment;
import com.parkinglotsystem.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // 🔹 Process a new payment for a ticket
    @PostMapping
    public ResponseEntity<Payment> processPayment(@RequestParam Long ticketId,
                                                  @RequestParam BigDecimal amount) {
        Payment payment = paymentService.processPayment(ticketId, amount);
        return ResponseEntity.ok(payment);
    }

    // 🔹 Get payment details by ticketId
    @GetMapping("/{ticketId}")
    public ResponseEntity<Payment> getPaymentByTicket(@PathVariable Long ticketId) {
        Payment payment = paymentService.getPaymentByTicket(ticketId);
        return ResponseEntity.ok(payment);
    }

    // 🔹 List all payments (admin/reporting use case)
    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
}
*/
