package com.parkinglotsystem.repository;


import com.parkinglotsystem.entity.ReservationReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationReportRepository extends JpaRepository<ReservationReport, Long> {}
