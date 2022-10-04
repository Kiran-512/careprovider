package com.careprovider.dtos;

import java.util.List;

import com.careprovider.models.CareService;
import com.careprovider.models.CareTaker;

public class CareServiceResponse {

	private CareService service;
	private List<CareTaker> caretakers;

	public CareService getService() {
		return service;
	}

	public void setService(CareService service) {
		this.service = service;
	}

	public List<CareTaker> getCaretakers() {
		return caretakers;
	}

	public void setCaretakers(List<CareTaker> caretakers) {
		this.caretakers = caretakers;
	}

}
