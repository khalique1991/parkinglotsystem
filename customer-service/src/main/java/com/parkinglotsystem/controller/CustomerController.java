package com.parkinglotsystem.controller;

import com.parkinglotsystem.dtos.CustomerRequestDTO;
import com.parkinglotsystem.dtos.CustomerResponseDTO;
import com.parkinglotsystem.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@Tag(name = "Customer API", description = "Operations related to customers")
@SecurityRequirement(name = "bearerAuth")
public class CustomerController {

    private final CustomerService customerService;

    // ------------------ CREATE CUSTOMER ------------------
    @PostMapping("/create")
    @Operation(summary = "Create a new customer", description = "Adds a new customer to the system")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Customer created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public CustomerResponseDTO createCustomer(@Valid @RequestBody CustomerRequestDTO requestDTO) {
        return customerService.saveCustomer(requestDTO);
    }

    // ------------------ GET ALL CUSTOMERS (NON-PAGINATED) ------------------
    @GetMapping
    @Operation(summary = "Get all customers", description = "Returns all customers without pagination")
    public List<CustomerResponseDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // ------------------ GET ALL CUSTOMERS (PAGINATED) ------------------
    @GetMapping("/paginated")
    @Operation(summary = "Get paginated customers", description = "Returns customers with pagination, sorting & search")
    public Page<CustomerResponseDTO> getPaginatedCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name,asc") String sort,
            @RequestParam(required = false) String search
    ) {
        return customerService.getAllCustomers(page, size, sort, search);
    }

    // ------------------ GET CUSTOMER BY ID ------------------
    @GetMapping("/{id}")
    @Operation(summary = "Get customer by ID", description = "Retrieve a single customer by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Customer found"),
            @ApiResponse(responseCode = "404", description = "Customer not found")
    })
    public CustomerResponseDTO getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    // ------------------ DELETE CUSTOMER ------------------
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete customer", description = "Delete a customer by ID (Admin only)")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
}
