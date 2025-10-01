package com.parkinglotsystem.entity;

import com.parkinglotsystem.enums.RoleName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor

@Table(name = "roles", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleName name;

    public Role() {}
    public Role(RoleName name) { this.name = name; }
}


