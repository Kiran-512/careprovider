package com.careprovider;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.careprovider.services.AdminService;

@SpringBootTest
public class AdminServiceTest {

	@Autowired
	private AdminService aservice;

	@Test
	public void TestEncryption() {

		String encr = aservice.encrypt("Kiran");

		System.out.println(encr);

		// d41d8cd98f00b204e9800998ecf8427e
		// ff8b90ee309b6b82dd1585bc99af1a2d

	}
}
