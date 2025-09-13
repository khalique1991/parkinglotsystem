package com.parkinglotsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EdgeGatewayApplication {
    public static void main(String[] args) {
        System.out.println("Edge Gateway Services Application Started::");
        SpringApplication.run(EdgeGatewayApplication.class,args);
    }
}