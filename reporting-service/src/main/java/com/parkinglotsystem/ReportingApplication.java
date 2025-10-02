package com.parkinglotsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReportingApplication {
    public static void main(String[] args) {
        System.out.println("Reporting Services Application Started::");
        SpringApplication.run(ReportingApplication.class,args);
    }
}