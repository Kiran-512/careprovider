package com.careprovider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.careprovider.models.Admin;
import com.careprovider.services.AdminService;
import com.careprovider.utils.FileUploadProperties;

@SpringBootApplication
@EnableConfigurationProperties({ FileUploadProperties.class })
public class CareProviderBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(CareProviderBackendApplication.class, args);
	}

	@Autowired
	AdminService srv;

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		if (srv.countAdmin() == 0) {
			Admin admin = new Admin();
			admin.setUserid("admin");
			admin.setPwd(srv.encrypt("admin"));
			admin.setUname("Administrator");
			srv.saveAdmin(admin);
		}
	}
}
