package com.parkinglotsystem;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotificationApplication {
    public static void main(String[] args) {
        System.out.println("Notification Services Application Started::");
        SpringApplication.run(NotificationApplication.class,args);
    }
}