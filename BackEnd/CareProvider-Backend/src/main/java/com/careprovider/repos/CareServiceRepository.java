package com.careprovider.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.careprovider.models.CareService;

@Repository
public interface CareServiceRepository extends JpaRepository<CareService, Integer> {

}
