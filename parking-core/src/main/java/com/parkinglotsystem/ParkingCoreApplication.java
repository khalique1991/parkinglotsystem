package com.parkinglotsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ParkingCoreApplication {
    public static void main(String[] args) {
        System.out.println("Parking Core Service Application Started::");
        SpringApplication.run(ParkingCoreApplication.class, args);
    }
}