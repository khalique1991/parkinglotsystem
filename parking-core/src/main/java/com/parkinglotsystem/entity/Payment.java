package com.parkinglotsystem.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket_id", nullable = false)
    private Long ticketId;   // ✅ store only the ID

    @ManyToOne
    @JoinColumn(name = "method_id", nullable = false)
    private PaymentMethod paymentMethod;

    private BigDecimal amount;

    private LocalDateTime paymentTime;

    private String status;
}
