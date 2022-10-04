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

import com.careprovider.dtos.CareServiceResponse;
import com.careprovider.models.CareTaker;
import com.careprovider.services.CareTakerService;
import com.careprovider.services.CustomerService;

@CrossOrigin
@RestController
@RequestMapping("/api/caretakers")
public class CaretakerController {

	@Autowired
	private CareTakerService cservice;

	@Autowired
	private CustomerService customerservice;
	

	@PostMapping 
	public ResponseEntity<?> save(@Valid CareTaker dto, MultipartFile adharpic, MultipartFile profilepic) {// fd.append("adharpic",uidPic)
		
	if (cservice.checkExist(dto.getUserid())) {
			return ResponseEntity.badRequest().body("Email already registered");
	}
		
	if (customerservice.checkExist(dto.getUserid())) {
			return ResponseEntity.badRequest().body("Please use anothe email ID, Already registered with some other account!");
	}
		
	CareTaker caretaker = cservice.saveCaretaker(dto, adharpic, profilepic);
		 System.err.println(" caretaker is "+ caretaker);
		 if(caretaker == null) {
				return ResponseEntity.badRequest().body("Please Upload Photo");
	}
		 return ResponseEntity.ok("Registration successfull!");
}


	@PutMapping("profile/{id}") 
	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody CareTaker dto) {
		dto.setId(id);
		boolean isUpdated = cservice.updateCaretaker(dto);
		if(isUpdated)
		return ResponseEntity.ok("caretaker updated successfully");
		return ResponseEntity.badRequest().body("Error while updating profile!");
	}


	@GetMapping 
	public ResponseEntity<?> findAll() {
		List<CareTaker> caretakers =  cservice.listAll();
		if(caretakers.size()>0)
		return ResponseEntity.ok(caretakers);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No caretakers found!");		
	}


	@GetMapping("{id}") 
	public ResponseEntity<?> findById(@PathVariable("id") int id) {
		CareTaker caretaker =  cservice.findById(id);
		if(caretaker != null)
		return ResponseEntity.ok(caretaker);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No caretaker found with the given id");
	}


	@PutMapping("{id}") 
	public ResponseEntity<?> updateStatus(@PathVariable("id") int id) {
		boolean status = cservice.updateStatus(id);
		if(status)
		return ResponseEntity.ok("User status updated");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while updating status");		
	}


	@GetMapping("services/{id}") 
	public ResponseEntity<?> findServiceCaretakers(@PathVariable("id") int id) {
		System.out.println("customer requested caretakers list!!");
		CareServiceResponse careservcieResponse =  cservice.listServiceCaretakers(id);
		if(careservcieResponse == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Such Service exist");
			return ResponseEntity.ok(careservcieResponse);
	}
}
