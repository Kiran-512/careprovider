package com.careprovider.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.careprovider.models.Customer;
import com.careprovider.services.CareTakerService;
import com.careprovider.services.CustomerService;

@CrossOrigin
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

	@Autowired
	private CustomerService customerservice;
	
	@Autowired
	private CareTakerService caretakerservice;


	@PostMapping 
	public ResponseEntity<?> save(@Valid Customer dto, MultipartFile adharpic, MultipartFile profilepic) {

			if (customerservice.checkExist(dto.getUserid())) {
			return ResponseEntity.badRequest().body("Email already registered");
     		}//duplicate customer check
			
			if (caretakerservice.checkExist(dto.getUserid())) {
				return ResponseEntity.badRequest().body("Please use anothe email ID, Already registered with some other account!");
			}//care taker with the same email id

		Customer customer = customerservice.saveCustomer(dto, adharpic, profilepic);
		if(customer  == null)
			return ResponseEntity.badRequest().body("Please Upload profile photo!");		
		return ResponseEntity.ok("Customer registered successfully");
	}


	@PutMapping("profile/{id}") 
	public ResponseEntity<?> save(@PathVariable("id") int id, @RequestBody Customer dto) {
		boolean status = customerservice.updateCustomer(dto);
		if(status)
		return ResponseEntity.ok("Profile updated successfully");
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while updating profile!");
	}


	@GetMapping 
	public ResponseEntity<?> findAll() {
		List<Customer> customers = customerservice.listAll();
		if(customers.size() > 0)
		return ResponseEntity.ok(customers);	
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No customer details found");		
	}

	@GetMapping("{id}") 
	public ResponseEntity<?> findById(@PathVariable("id") int id) {
		Customer customer = customerservice.findById(id);
		if(customer !=null)
		return ResponseEntity.ok(customer);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No details not found");
	}

	@PutMapping("{id}") 
	public ResponseEntity<?> updateStatus(@PathVariable("id") int id) {
		boolean status = customerservice.updateStatus(id);
		if(status)
		return ResponseEntity.ok("User status updated");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No details not found to update!");		
	}
}
