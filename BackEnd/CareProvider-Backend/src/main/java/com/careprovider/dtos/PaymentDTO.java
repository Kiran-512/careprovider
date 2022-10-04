package com.careprovider.dtos;

import com.careprovider.models.Payment;

public class PaymentDTO extends Payment {

	private int bookingid;

	public int getBookingid() {
		return bookingid;
	}

	public void setBookingid(int bookingid) {
		this.bookingid = bookingid;
	}

	@Override
	public String toString() {
		return "PaymentDTO [bookingid=" + bookingid + super.toString() + "]";
	}

}
