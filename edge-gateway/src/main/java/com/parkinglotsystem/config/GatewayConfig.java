package com.parkinglotsystem.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                // Parking Service
                .route("parking-service", r -> r.path("/api/parking/**")
                        .uri("http://parking-service:8081"))
                // Reservation Service
                .route("reservation-service", r -> r.path("/api/reservations/**")
                        .uri("http://reservation-service:8082"))
                // Payment Service
                .route("payment-service", r -> r.path("/api/payments/**")
                        .uri("http://payment-service:8083"))
                // Notification Service
                .route("notification-service", r -> r.path("/api/notifications/**")
                        .uri("http://notification-service:8085"))
                // Reporting Service
                .route("reporting-service", r -> r.path("/api/reports/**")
                        .uri("http://reporting-service:8086"))
                .build();
    }
}
