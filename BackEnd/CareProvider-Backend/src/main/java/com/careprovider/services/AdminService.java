package com.careprovider.services;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.careprovider.dtos.ForgotPasswordDTO;
import com.careprovider.models.Admin;
import com.careprovider.repos.AdminRepository;

@Service
public class AdminService {
	@Autowired
	private AdminRepository dao;

	public void saveAdmin(Admin admin) {
		dao.save(admin);
		System.out.println("Admin saved!!");
	}

	public Admin validate(String userid, String pwd) {

		System.out.println(userid + pwd);
		// TODO Auto-generated method stub
		Optional<Admin> admin = dao.findById(userid);

		System.out.println("Admin is from service" + admin.get().getPwd());
		System.out.println(encrypt(pwd));

		if (admin.isPresent() && admin.get().getPwd().equals(encrypt(pwd)))
			return admin.get();

		return null;
	}

	public boolean updatePassword(ForgotPasswordDTO dto) {
		boolean status = false;
		Optional<Admin> admin = dao.findById(dto.getUserid());
		if (admin.isPresent()) {
			admin.get().setPwd(dto.getPwd());
			dao.save(admin.get());
			status = true;
			return status;
		}
		return status;
	}

	public long countAdmin() {
		// TODO Auto-generated method stub
		return dao.count();
	}

	public String encrypt(String text) {
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			System.out.println("messageDigest is " + messageDigest);// MD5 Message Digest from SUN
			byte[] md = messageDigest.digest(text.getBytes());
			for (byte b : md) {
				System.out.println(b + "  ++++++ ");
			}
			/*
			 * -44 ++++++ 29 ++++++ -116 ++++++ -39 ++++++ -113 ++++++ 0 ++++++ -78 ++++++ 4
			 * ++++++ -23 ++++++ -128 ++++++ 9 ++++++ -104 ++++++ -20 ++++++ -8 ++++++ 66
			 * ++++++ 126 ++++++
			 */

			BigInteger bi = new BigInteger(1, md);

			System.out.println("bgiInt is " + bi);// bgiInt is 281949768489412648962353822266799178366

			return bi.toString(16);

		} catch (Exception ex) {
			System.err.println("Error " + ex.getMessage());
		}
		return null;
	}
}
//MessageDigest works with the MD2 , MD5, SHA-1, SHA-224, SHA-256
//SHA-384, SHA-512

/*
 * 
 * The java.security package provides a class, i.e., MessageDigest that supports
 * algorithms such as SHA-1, SHA 256, and MD5 etc., for converting a message of
 * arbitrary length to a message digest.
 * 
 * Steps to convert a message into MessageDigest 1. In the first step, we will
 * create an instance of the MessageDigest by using the getInstance() method of
 * the MessageDigest The getInstance() method accepts a parameter, i.e., algo,
 * which defines the algorithm to be used.
 * 
 * MessageDigest obj = MessageDigest.getInstance("SHA-1");
 * 
 * 
 * 
 * 
 */
