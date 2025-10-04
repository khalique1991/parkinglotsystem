package com.parkinglotsystem.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class LoggingFilter implements GatewayFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("Incoming request: {} {}", exchange.getRequest().getMethod(),
                exchange.getRequest().getURI());
        return chain.filter(exchange)
                .doOnSuccess(aVoid -> log.info("Outgoing response: {}", exchange.getResponse().getStatusCode()));
    }
}

