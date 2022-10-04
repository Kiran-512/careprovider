package com.careprovider.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.careprovider.dtos.PaymentDTO;
import com.careprovider.models.Booking;
import com.careprovider.models.Payment;
import com.careprovider.repos.BookingRepository;
import com.careprovider.repos.PaymentRepository;

@Service
public class BookingService {//8

	@Autowired
	private BookingRepository repo;//at run time spring will create the anonymous child class of this interface and implement all the methods of interface and will call the method with the child class object!
	
	@Autowired
	private PaymentRepository prepo;

	public boolean saveBooking(Booking bk) {
		boolean status = false;
		try {
			repo.save(bk);//Exception if foreign key is violated!
			status = true;
			return status;
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return status;
	}

	public boolean updateStatus(int bkid, String status) {
		boolean isUpdated = false;
			Optional<Booking> booking = repo.findById(bkid);
			if(booking.isPresent())
			{
				booking.get().setStatus(status);
				repo.save(booking.get());
				isUpdated =true;
				return isUpdated;
			}
			return isUpdated;
	}

	public List<Booking> listall() {
		return repo.findAll();
	}

	public List<Booking> findByCustomerId(int id) {
		
		try {
			List<Booking> bookings = repo.findByCustomerId(id);
			return repo.findByCustomerId(id);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;
	}

	public List<Booking> findByCareTakerId(int id) {
		
		try {
			List<Booking> bookings = repo.findByCaretakerId(id);
			System.out.println("Bookings list is  " );
			
			bookings.stream().forEach(System.out::println);
			
			return bookings;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;
	}

	public Booking findById(int id) {
		Optional<Booking> booking = repo.findById(id);
		if(booking.isPresent())
			return booking.get();
			return null;
	}

	public boolean deleteBooking(int id) {
		boolean status = false;
		try {
			repo.deleteById(id);
			status=true;
			return status;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}
			return status;
	}

	public boolean savePayment(PaymentDTO dto) {
			boolean status = false;
		try {
			Payment pay = new Payment();
			BeanUtils.copyProperties(dto, pay);// to avoid getter and setter we used this copyProperties method
			prepo.save(pay);
			Booking bk = findById(dto.getBookingid());
			bk.setPayment(pay);
			bk.setStatus("Paid");
			saveBooking(bk);
			status = true;
			return status;
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return status;
	}

}
