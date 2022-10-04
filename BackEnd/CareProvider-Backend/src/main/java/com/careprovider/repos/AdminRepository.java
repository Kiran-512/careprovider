package com.careprovider.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.careprovider.models.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {//CrudRepostiory<Admin, String>

}
