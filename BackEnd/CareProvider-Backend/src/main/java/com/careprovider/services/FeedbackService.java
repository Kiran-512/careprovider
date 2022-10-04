package com.careprovider.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.careprovider.dtos.FeedbackDTO;
import com.careprovider.models.Booking;
import com.careprovider.models.Feedback;
import com.careprovider.repos.FeedbackRepository;

@Service
public class FeedbackService {

	@Autowired private FeedbackRepository repo;
	@Autowired private BookingService bservice;
	
	public boolean save(FeedbackDTO dto) {
		
		boolean status = false;
		try {

			Feedback fb=new Feedback();
			fb.setMsg(dto.getMsg());
			fb.setRatings(dto.getRatings());
			Feedback f= repo.save(fb);
			Booking bk=bservice.findById(dto.getBookingId());
			bk.setFeedback(f);
			bservice.saveBooking(bk);
			status = true;
			return status;
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return status;
	}
	
}
