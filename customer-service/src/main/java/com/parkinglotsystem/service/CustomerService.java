package com.parkinglotsystem.service;

import com.parkinglotsystem.dtos.CustomerRequestDTO;
import com.parkinglotsystem.dtos.CustomerResponseDTO;
import com.parkinglotsystem.entity.Customer;
import com.parkinglotsystem.exception.DuplicateCustomerException;
import com.parkinglotsystem.mapper.CustomerMapper;
import com.parkinglotsystem.repository.CustomerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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


    public Page<CustomerResponseDTO> getAllCustomers(int page, int size, String sort, String search) {
        // ✅ Parse sort param like "firstName,asc"
        String[] sortParts = sort.split(",");
        String sortField = sortParts[0];
        Sort.Direction sortDir = sortParts.length > 1 && sortParts[1].equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDir, sortField));

        Page<Customer> customerPage;

        // ✅ Search across name and email
        if (search != null && !search.trim().isEmpty()) {
            customerPage = customerRepository
                    .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                            search, search, search, pageable);
        } else {
            customerPage = customerRepository.findAll(pageable);
        }

        // ✅ Convert to DTOs
        return customerPage.map(this::convertToDTO);
    }
    private CustomerResponseDTO convertToDTO(Customer customer) {
        CustomerResponseDTO dto = new CustomerResponseDTO();
        BeanUtils.copyProperties(customer, dto);
        return dto;
    }
}
