package com.parkinglotsystem.listener;

import com.parkinglotsystem.entity.PaymentReport;
import com.parkinglotsystem.entity.ReservationReport;
import com.parkinglotsystem.events.PaymentCompletedEvent;
import com.parkinglotsystem.events.ParkingSessionCreatedEvent;
import com.parkinglotsystem.repository.PaymentReportRepository;
import com.parkinglotsystem.repository.ReservationReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReportingEventListener {

    private final PaymentReportRepository paymentReportRepository;
    private final ReservationReportRepository reservationRepo;
    private final ElasticsearchOperations elasticsearchOps;

    @KafkaListener(topics = "payment_completed", groupId = "reporting-service-group")
    public void handlePayment(PaymentCompletedEvent event, Acknowledgment ack) {
        try {
            PaymentReport report = new PaymentReport();
            report.setParkingSessionId(event.getParkingSessionId());
            report.setReservationId(event.getReservationId());
            report.setAmount(event.getAmount());
            report.setCurrency("INR");
            report.setTransactionId(event.getTransactionId());
            report.setStatus(event.getPaymentStatus().name());
            report.setTimestamp(event.getTimestamp());

            paymentReportRepository.save(report);
            elasticsearchOps.save(report);
            ack.acknowledge();
        } catch (Exception e) {
            log.error("Failed to process PaymentCompletedEvent: {}", event, e);
            // Could send to a Kafka DLQ for retry
        }
    }

    @KafkaListener(topics = "parking_session_created", groupId = "reporting-service-group")
    public void handleReservation(ParkingSessionCreatedEvent event, Acknowledgment ack) {
        try {
            ReservationReport report = new ReservationReport();
            report.setReservationId(event.getParkingSessionId());
            report.setParkingSessionId(event.getParkingSessionId());
            report.setCustomerId(event.getCustomerId());
            report.setStatus("PENDING");
            report.setCreatedAt(event.getStartTime());

            reservationRepo.save(report);
            elasticsearchOps.save(report);
            ack.acknowledge();
        } catch (Exception e) {
            log.error("Failed to process ParkingSessionCreatedEvent: {}", event, e);
        }
    }
}
