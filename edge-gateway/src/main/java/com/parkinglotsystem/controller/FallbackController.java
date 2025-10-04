package com.parkinglotsystem.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping(value = "/reporting", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Object> reportingFallback() {
        return Mono.just(Map.of(
                "message", "Reporting service is temporarily unavailable. Please try again later.",
                "timestamp", System.currentTimeMillis()
        ));
    }

    @GetMapping(value = "/generic", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Object> genericFallback() {
        return Mono.just(Map.of(
                "message", "Service temporarily unavailable. Please try again later.",
                "timestamp", System.currentTimeMillis()
        ));
    }
}
