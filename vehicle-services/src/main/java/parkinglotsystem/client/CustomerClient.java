package parkinglotsystem.client;

import com.parkinglotsystem.dtos.CustomerResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "customer-service", url = "${customer.service.url}")
public interface CustomerClient {
    @GetMapping("/api/customers/{id}")
    CustomerResponseDTO getCustomer(@PathVariable("id") Long id);
}

