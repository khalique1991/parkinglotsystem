package com.parkinglotsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReservationServiceApplication {
    public static void main(String[] args) {
        System.out.println("Reservation Services Application Started::");
        SpringApplication.run(ReservationServiceApplication.class, args);
    }
}