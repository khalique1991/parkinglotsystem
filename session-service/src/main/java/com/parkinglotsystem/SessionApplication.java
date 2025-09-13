package com.parkinglotsystem;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SessionApplication {
    public static void main(String[] args) {
        System.out.println("Session Services Application Started::");
        SpringApplication.run(SessionApplication.class,args);
    }
}