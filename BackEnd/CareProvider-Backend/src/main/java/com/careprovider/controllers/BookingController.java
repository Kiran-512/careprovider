package com.careprovider.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careprovider.dtos.FeedbackDTO;
import com.careprovider.dtos.PaymentDTO;
import com.careprovider.models.Booking;
import com.careprovider.services.BookingService;
import com.careprovider.services.FeedbackService;

@CrossOrigin
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

	@Autowired
	private BookingService bservice;
	@Autowired
	private FeedbackService fservice;

//booking
	@PostMapping 
	public ResponseEntity<?> save(@RequestBody Booking booking) {
																	
		boolean status = bservice.saveBooking(booking);
		if(status)
		return ResponseEntity.ok("Booked successfully");
		else
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error While booking service!");
	}

// PaymentForm
	@PostMapping("payment")
	public ResponseEntity<?> savepayment(@RequestBody PaymentDTO dto) {

		System.out.println(dto);
		boolean status = bservice.savePayment(dto);
		if(status)
			return ResponseEntity.ok("Paid successfully");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Opps! Payment failed!");
	}

	@GetMapping 
	public ResponseEntity<?> findAll() {
		List<Booking> bookings = bservice.listall();
		if(bookings.size()>0)
			return ResponseEntity.ok(bookings);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Bookings found!");
			
	}


	@GetMapping("{id}") 
	public ResponseEntity<?> findById(@PathVariable("id") int id) {
		Booking booking = bservice.findById(id);
		if(booking !=null)
		return ResponseEntity.ok(booking);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Booking found!");
	}


	@GetMapping("status/{id}/{status}") 
	public ResponseEntity<?> updateBookingById(@PathVariable("id") int id, @PathVariable("status") String status) {
		boolean isUpdated = bservice.updateStatus(id, status);
		
		if(isUpdated )
		return ResponseEntity.ok("Status updated successfully");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error while Updating service");
	}
	
	
	@GetMapping("customers/{id}") 
	public ResponseEntity<?> findCustomerBooking(@PathVariable("id") int id) {
		
		List<Booking> bookings = bservice.findByCustomerId(id);
		System.out.println("bookings " + bookings);
		if(bookings.size()>0)
			return ResponseEntity.ok(bookings);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No bookings found!");
	}


	@GetMapping("caretakers/{id}") 
	public ResponseEntity<?> findCaretakersBooking(@PathVariable("id") int id) {
		List<Booking> bookings = bservice.findByCareTakerId(id);
		if(bookings.size()>0)
		return ResponseEntity.ok(bookings);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No bookings found!");
	}


	@PostMapping("feedbacks") 
	public ResponseEntity<?> savefeedback(@RequestBody FeedbackDTO dto) {
		boolean status = fservice.save(dto);
		if(status)
		return ResponseEntity.ok("saved successfully");
		return ResponseEntity.ok("saved successfully");
	}

}
