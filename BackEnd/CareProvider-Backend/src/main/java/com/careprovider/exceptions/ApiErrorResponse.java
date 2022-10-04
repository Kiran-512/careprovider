package com.careprovider.exceptions;

public class ApiErrorResponse {

	private String message;
	private boolean status;
	
	public ApiErrorResponse() {}
	public ApiErrorResponse(String message, boolean status) {
		this.message=message;
		this.status=status;
	}
	
}
