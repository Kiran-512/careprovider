package com.careprovider.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.careprovider.models.CareService;
import com.careprovider.models.CareTaker;

@Repository
public interface CareTakerRepository extends JpaRepository<CareTaker, Integer> {

	CareTaker findByUserid(String userid);

	List<CareTaker> findByService(CareService service);

}
