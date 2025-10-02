package com.parkinglotsystem.controller;

import com.parkinglotsystem.entity.PaymentReport;
import com.parkinglotsystem.entity.ReservationReport;
import com.parkinglotsystem.repository.PaymentReportRepository;
import com.parkinglotsystem.repository.ReservationReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportingController {

    private final PaymentReportRepository paymentRepo;
    private final ReservationReportRepository reservationRepo;

    @GetMapping("/payments")
    public List<PaymentReport> getAllPayments() {
        return paymentRepo.findAll();
    }

    @GetMapping("/reservations")
    public List<ReservationReport> getAllReservations() {
        return reservationRepo.findAll();
    }

    @GetMapping("/payments/summary")
    public Double getTotalRevenue() {
        return paymentRepo.findAll().stream().mapToDouble(PaymentReport::getAmount).sum();
    }
}


