package com.careprovider.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String status; 
	private LocalDate startdate;
	private LocalDate enddate;

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;

	@ManyToOne
	@JoinColumn(name = "service_id")
	private CareService service;

	@ManyToOne
	@JoinColumn(name = "caretaker_id")
	private CareTaker caretaker;

	@OneToOne
	@JoinColumn(name = "feedback_id")
	private Feedback feedback;

	@OneToOne
	@JoinColumn(name = "payment_id")
	private Payment payment;

	private LocalDate createdon;

	public Booking() {
		this.createdon = LocalDate.now();
		this.status = "Pending";
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public Booking(int id) {
		this.id = id;
	}

	public LocalDate getCreatedon() {
		return createdon;
	}

	public void setCreatedon(LocalDate createdon) {
		this.createdon = createdon;
	}

	public CareTaker getCaretaker() {
		return caretaker;
	}

	public void setCaretaker(CareTaker caretaker) {
		this.caretaker = caretaker;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public CareService getService() {
		return service;
	}

	public void setService(CareService service) {
		this.service = service;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDate getStartdate() {
		return startdate;
	}

	public void setStartdate(LocalDate startdate) {
		this.startdate = startdate;
	}

	public LocalDate getEnddate() {
		return enddate;
	}

	public void setEnddate(LocalDate enddate) {
		this.enddate = enddate;
	}

	public Feedback getFeedback() {
		return feedback;
	}

	public void setFeedback(Feedback feedback) {
		this.feedback = feedback;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", status=" + status + ", startdate=" + startdate + ", enddate=" + enddate
				+ ", customer=" + customer + ", service=" + service + ", caretaker=" + caretaker + ", feedback="
				+ feedback + ", payment=" + payment + ", createdon=" + createdon + "]";
	}

}
