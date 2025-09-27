package com.parkinglotsystem;

import com.parkinglotsystem.security.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
@EntityScan("com.parkinglotsystem.entity")
public class AuthServiceApplication {
    public static void main(String[] args) {
        System.out.println("Auth service Application Started !!");
        SpringApplication.run(AuthServiceApplication.class,args);


    }
}