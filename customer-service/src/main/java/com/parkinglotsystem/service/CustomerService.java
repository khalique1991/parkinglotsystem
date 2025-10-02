package com.parkinglotsystem.service;

import com.parkinglotsystem.dtos.CustomerRequestDTO;
import com.parkinglotsystem.dtos.CustomerResponseDTO;
import com.parkinglotsystem.entity.Customer;
import com.parkinglotsystem.exception.DuplicateCustomerException;
import com.parkinglotsystem.mapper.CustomerMapper;
import com.parkinglotsystem.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public CustomerResponseDTO saveCustomer(CustomerRequestDTO requestDTO) {
        Customer customer = CustomerMapper.toEntity(requestDTO);
        System.out.println("Saving customer: " + customer.getFirstName() + " " + customer.getPhoneNumber());
        if (customerRepository.existsByEmail(requestDTO.getEmail())) {
            throw new DuplicateCustomerException("Customer already exists with email: " + requestDTO.getEmail());
        }
        Customer saved = customerRepository.save(customer);
        return CustomerMapper.toDTO(saved);
    }

    public List<CustomerResponseDTO> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CustomerResponseDTO getCustomerById(Long id) {
        return customerRepository.findById(id)
                .map(CustomerMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found");
        }
        customerRepository.deleteById(id);
    }
}
