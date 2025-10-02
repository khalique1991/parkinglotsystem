package com.parkinglotsystem.scheduler;



import com.parkinglotsystem.repository.PaymentReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReportScheduler {

    private final PaymentReportRepository paymentRepo;

    // Every day at 00:05
    @Scheduled(cron = "0 5 0 * * ?")
    public void dailyRevenueReport() {
        double totalRevenue = paymentRepo.findAll().stream().mapToDouble(p -> p.getAmount()).sum();
        log.info("📊 Daily Revenue Report: {}", totalRevenue);
        // Optionally, export to CSV or push to dashboard
    }
}
