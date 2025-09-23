package com.parkinglotsystem.init;

import com.parkinglotsystem.entity.Role;
import com.parkinglotsystem.enums.RoleName;
import com.parkinglotsystem.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        for (RoleName roleName : RoleName.values()) {
            roleRepository.findByName(roleName)
                    .orElseGet(() -> {
                        Role role = new Role(roleName);
                        System.out.println("✅ Seeding role: " + roleName);
                        return roleRepository.save(role);
                    });
        }
    }
}
