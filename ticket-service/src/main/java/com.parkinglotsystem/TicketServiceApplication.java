package com.parkinglotsystem;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TicketServiceApplication {
    public static void main(String[] args) {
        System.out.println("Ticket Service Application Started");
        SpringApplication.run(TicketServiceApplication.class,args);
    }
}