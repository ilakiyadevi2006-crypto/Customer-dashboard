package com.example.CustomerDashboard;
 import java.util.List;
 import org.springframework.http.HttpStatus;
 import org.springframework.web.bind.annotation.*;
 import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("\api\Customer")
@CrossOrigin(origins="http:\\localhost:5173")
public class CustomerController(){
    private final CustomerRepository repository;
public CustomerController (CustomerRepository repository){
    this.repository=repository;
}
}

@GetMapping
public list <Customer> getCustomers(){
    return repository=findAll();

}

@PutMapping("/customer/{id}")
    public String updateCustomer(@PathVariable int id, @RequestBody Customer updatedCustomer) {
        Customer setStatus (updatedCustomer getStatus());
    {Status?"Resolved": "Unresolved"}

    }
