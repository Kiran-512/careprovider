package com.careprovider.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.careprovider.dtos.ForgotPasswordDTO;
import com.careprovider.dtos.LoginDTO;
import com.careprovider.models.Customer;
import com.careprovider.repos.CustomerRepository;
import com.careprovider.utils.StorageService;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository crepo;
	@Autowired
	private StorageService storageService;
	@Autowired
	private AdminService asrv;

	public Customer saveCustomer(Customer customer, MultipartFile uidPhoto, MultipartFile profilePhoto) {
		String picname = storageService.store(uidPhoto);
		if(picname == null)
			return null;
		customer.setUidphoto(picname);
		String picname2 = storageService.store(profilePhoto);
		if(picname2 == null)
			return null;
		customer.setProfilephoto(picname2);
		customer.setPwd(asrv.encrypt(customer.getPwd()));
		crepo.save(customer);
		return customer;
	}

	public boolean updateCustomer(Customer customer) {
		boolean status = false;
		try {
			Customer customerupdate = crepo.findById(customer.getId()).get();
			customerupdate.setAddress(customer.getAddress());
			customerupdate.setPhone(customer.getPhone());
			customerupdate.setGender(customer.getGender());
			customerupdate.setName(customer.getName());
			crepo.save(customerupdate);
			status = true;
			return status;
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return status;
		
	}

	public boolean validate(ForgotPasswordDTO dto) {
		if (crepo.findByUserid(dto.getUserid()) != null) {
			
			Customer admin = crepo.findByUserid(dto.getUserid());
			if (admin.getQuestion().equals(dto.getQuestion()) && admin.getAnswer().equals(dto.getAnswer()))
				return true;
			else
				return false;
		} else {
			return false;
		}
	}

	public void updatePassword(ForgotPasswordDTO dto) {
		Customer admin = crepo.findByUserid(dto.getUserid());
		admin.setPwd(asrv.encrypt(dto.getPwd()));
		crepo.save(admin);
	}

	public List<Customer> listAll() {
		return crepo.findAll();
	}

	public boolean checkExist(String userid) {
		return crepo.findByUserid(userid) != null;
	}

	public Customer findByUserId(String userid) {
		return crepo.findByUserid(userid);
	}

	public Customer findById(int id) {
		Optional<Customer> customer = crepo.findById(id);

		if(customer.isPresent())
		return customer.get();

		return null;
	}

	public boolean updateStatus(int id) {
		boolean status = false;
		Optional<Customer> customer = crepo.findById(id);

		if(customer.isPresent())
		{
			customer.get().setActive(!customer.get().isActive());
			crepo.save(customer.get());
			status = true;
			return status;
		}
		return status;
	}

	public Customer validate(LoginDTO dto) {
		Customer cust = findByUserId(dto.getUserid());
		if (cust != null && cust.getPwd().equals(asrv.encrypt(dto.getPwd())) && cust.isActive()) {
			return cust;
		} else {
			return null;
		}
	}
}
