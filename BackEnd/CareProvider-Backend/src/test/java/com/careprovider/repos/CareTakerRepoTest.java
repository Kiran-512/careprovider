package com.careprovider.repos;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.careprovider.models.CareService;
import com.careprovider.models.CareTaker;

@SpringBootTest
public class CareTakerRepoTest {

	@Autowired
	private CareTakerRepository repo;

	@Test
	public void careTaker() {

		CareService cs = new CareService();
		cs.setId(4);
		cs.setIsactive(true);
		cs.setServiceName("Meal");
		cs.setCharges(200);
		cs.setPhoto(null);

		List<CareTaker> list = repo.findByService(cs);

		list.forEach(System.out::println);
		/*
		 * Customer [id=4, name=Rahul, phone=null, gender=null, address=null,
		 * question=null, answer=null, uid=null, uidphoto=null, userid=null,
		 * active=true, createdon=null]
		 * 
		 * 
		 * Customer [id=5, name=Rahul, phone=null, gender=null, address=null,
		 * question=null, answer=null, uid=null, uidphoto=null, userid=null,
		 * active=true, createdon=null]
		 * 
		 * 
		 * Customer [id=6, name=RPranit, phone=null, gender=null, address=null,
		 * question=null, answer=null, uid=null, uidphoto=null, userid=null,
		 * active=true, createdon=null]
		 * 
		 * 
		 * Customer [id=7, name=Akshay, phone=null, gender=null, address=null,
		 * question=null, answer=null, uid=null, uidphoto=null, userid=null,
		 * active=true, createdon=null]
		 * 
		 * 
		 * Customer [id=8, name=Karan, phone=null, gender=null, address=null,
		 * question=null, answer=null, uid=null, uidphoto=null, userid=null,
		 * active=true, createdon=null]
		 */
	}

	@Test
	public void findByName() {
		String name;
		name = "meet";
		// System.out.println("caretake is " + repo.findByName(name));
		// caretake is Customer [id=1, name=meet, phone=9837429837, gender=Male,
		// address=meet@gmail.com, question=What is your nick name ?, answer=meet,
		// uid=934723894729, uidphoto=b3533a7f9a7c4ee9809b1ba0495c4557.jpg,
		// userid=meet@gmail.com, active=true, createdon=2022-09-06T10:59:06.309651]

	}
}
