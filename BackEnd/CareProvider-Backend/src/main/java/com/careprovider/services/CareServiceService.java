package com.careprovider.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.careprovider.models.CareService;
import com.careprovider.repos.CareServiceRepository;
import com.careprovider.utils.StorageService;

@Service
public class CareServiceService {

	@Autowired
	private CareServiceRepository repo;
	@Autowired
	private StorageService storage;

	public boolean saveService(CareService cs, MultipartFile photo) {
		boolean status = false;
		try {
			String filename = storage.store(photo);
			cs.setPhoto(filename);
			repo.save(cs);
			status = true;
			return status;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return status;
	}

	public List<CareService> listall() {
		try {
			List<CareService> careservices = repo.findAll();
			return careservices;	
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;
	}

	public CareService findById(int id) {
		Optional<CareService> careservice = repo.findById(id);
		if(careservice.isPresent())
			return careservice.get();
		return null;
	}

	public boolean deleteService(int id) {
		boolean status = false;
		
		try {
			CareService cs = findById(id);
			cs.setIsactive(false);
			repo.save(cs);
			status = true;
			return status;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return status;
	}
}
