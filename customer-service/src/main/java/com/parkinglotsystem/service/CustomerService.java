package com.parkinglotsystem.service;

import com.parkinglotsystem.dtos.CustomerRequestDTO;
import com.parkinglotsystem.dtos.CustomerResponseDTO;
import com.parkinglotsystem.entity.Customer;
import com.parkinglotsystem.mapper.CustomerMapper;
import com.parkinglotsystem.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    private final CustomerRepository repository;
    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public CustomerResponseDTO saveCustomer(CustomerRequestDTO requestDTO) {
        Customer customer = CustomerMapper.toEntity(requestDTO);
        Customer saved = repository.save(customer);
        return CustomerMapper.toDTO(saved);
    }

    public List<CustomerResponseDTO> getAllCustomers() {
        return repository.findAll()
                .stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CustomerResponseDTO getCustomerById(Long id) {
        return repository.findById(id)
                .map(CustomerMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public void deleteCustomer(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Customer not found");
        }
        repository.deleteById(id);
    }
}
