package com.parkinglotsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.parkinglotsystem")
public class ParkingApiApplication {
    public static void main(String[] args) {
        System.out.println("Parking Api Application Started...");
        SpringApplication.run(ParkingApiApplication.class, args);
    }
}
