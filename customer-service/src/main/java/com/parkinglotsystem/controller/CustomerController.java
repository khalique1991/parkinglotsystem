package com.parkinglotsystem.controller;

import com.parkinglotsystem.dtos.CustomerRequestDTO;
import com.parkinglotsystem.dtos.CustomerResponseDTO;
import com.parkinglotsystem.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@Tag(name = "Customer API", description = "Operations related to customers")
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping
    @Operation(summary = "Create a new customer", description = "Adds a new customer to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Customer created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public CustomerResponseDTO createCustomer(@Valid @RequestBody CustomerRequestDTO requestDTO) {
        return customerService.saveCustomer(requestDTO);
    }

    @GetMapping
    public List<CustomerResponseDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get customer by ID", description = "Retrieve a single customer by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Customer found"),
            @ApiResponse(responseCode = "404", description = "Customer not found")
    })
    public CustomerResponseDTO getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
}
