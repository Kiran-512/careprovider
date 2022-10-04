package com.careprovider.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.careprovider.models.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
