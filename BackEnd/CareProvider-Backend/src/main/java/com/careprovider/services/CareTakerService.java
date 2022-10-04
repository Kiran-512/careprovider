package com.careprovider.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.careprovider.dtos.CareServiceResponse;
import com.careprovider.dtos.ForgotPasswordDTO;
import com.careprovider.dtos.LoginDTO;
import com.careprovider.models.CareService;
import com.careprovider.models.CareTaker;
import com.careprovider.repos.CareTakerRepository;
import com.careprovider.utils.StorageService;

@Service
public class CareTakerService {

	@Autowired
	private CareTakerRepository caretakerrepo;
	@Autowired
	private StorageService storageService;
	@Autowired
	private AdminService adminservice;
	@Autowired
	private CareServiceService csrv;

	public CareTaker saveCaretaker(CareTaker caretaker, MultipartFile uidPhoto, MultipartFile profilePhoto) {

		try {
			String picname = storageService.store(uidPhoto);
			if(picname == null) {
				return null;
			}
			caretaker.setUidphoto(picname);
			String picname2 = storageService.store(profilePhoto);
			if(picname2 == null) {
				return null;
			}
			caretaker.setProfilephoto(picname2);
			caretaker.setPwd(adminservice.encrypt(caretaker.getPwd()));
			caretakerrepo.save(caretaker);
			System.out.println("end of the method caretaker...");
			return caretaker;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
		
	}

	public boolean updateCaretaker(CareTaker cc) {
		boolean status = false;
		
		try {

			CareTaker ct = caretakerrepo.findById(cc.getId()).get();
			ct.setAddress(cc.getAddress());
			ct.setPhone(cc.getPhone());
			ct.setGender(cc.getGender());
			ct.setName(cc.getName());
			caretakerrepo.save(ct);
			status = true;
			return status;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return status;
	}

	public boolean validate(ForgotPasswordDTO dto) {
		if (caretakerrepo.findByUserid(dto.getUserid()) != null) {
			CareTaker admin = caretakerrepo.findByUserid(dto.getUserid());
			if (admin.getQuestion().equals(dto.getQuestion()) && admin.getAnswer().equals(dto.getAnswer()))
				return true;
			else
				return false;
		} else {
			return false;
		}
	}

	public void updatePassword(ForgotPasswordDTO dto) {
		CareTaker caretaker = caretakerrepo.findByUserid(dto.getUserid());
		caretaker.setPwd(adminservice.encrypt(dto.getPwd()));
		caretakerrepo.save(caretaker);
	}

	public List<CareTaker> listAll() {
		return caretakerrepo.findAll();
	}

	public CareServiceResponse listServiceCaretakers(int id) {
		CareServiceResponse csr = new CareServiceResponse();
		CareService cs = csrv.findById(id);
		if(cs == null) return null;
		csr.setService(cs);
		csr.setCaretakers(caretakerrepo.findByService(cs));
		return csr;
	}

	public boolean checkExist(String userid) {
		System.out.println("userId is " + userid);
		return caretakerrepo.findByUserid(userid) != null;
	}

	public CareTaker findByUserId(String userid) {
		return caretakerrepo.findByUserid(userid);
	}

	public CareTaker findById(int id) {
	
		Optional<CareTaker> careTaker =  caretakerrepo.findById(id);

		if(careTaker.isPresent())
			return careTaker.get();
		
		return null;
	}

	public boolean updateStatus(int id) {
		boolean status = false;
		
		Optional<CareTaker> caretaker = caretakerrepo.findById(id);

		if(caretaker.isPresent())
		{
		caretaker.get().setActive(!caretaker.get().isActive());
		caretakerrepo.save(caretaker.get());
		status = true;
		return status;
		}
		return status;
	}

	public CareTaker validate(LoginDTO dto) {
		CareTaker cust = findByUserId(dto.getUserid());
		if (cust != null && cust.getPwd().equals(adminservice.encrypt(dto.getPwd())) && cust.isActive()) {
			return cust;
		} else {
			return null;
		}
	}
}
