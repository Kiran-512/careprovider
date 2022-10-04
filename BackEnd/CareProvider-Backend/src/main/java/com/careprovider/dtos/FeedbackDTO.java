package com.careprovider.dtos;

import com.careprovider.models.Feedback;

public class FeedbackDTO extends Feedback {

	private int bookingId;

	public int getBookingId() {
		return bookingId;
	}

	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}
	
}
