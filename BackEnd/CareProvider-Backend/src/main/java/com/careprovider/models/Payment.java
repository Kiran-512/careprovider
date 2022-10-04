package com.careprovider.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

@Entity
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotEmpty
	@Column(length=25)
	private String cardno;
	
	@NotEmpty
	@Column(length=40)
	private String nameoncard;
	
	private int amount;
	private int days;
	
	private LocalDate pmtdate;

	public int getDays() {
		return days;
	}

	public void setDays(int days) {
		this.days = days;
	}

	public Payment() {
		this.pmtdate = LocalDate.now();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCardno() {
		return cardno;
	}

	public void setCardno(String cardno) {
		this.cardno = cardno;
	}

	public String getNameoncard() {
		return nameoncard;
	}

	public void setNameoncard(String nameoncard) {
		this.nameoncard = nameoncard;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public LocalDate getPmtdate() {
		return pmtdate;
	}

	public void setPmtdate(LocalDate pmtdate) {
		this.pmtdate = pmtdate;
	}

	@Override
	public String toString() {
		return "Payment [id=" + id + ", cardno=" + cardno + ", nameoncard=" + nameoncard + ", amount=" + amount
				+ ", days=" + days + ", pmtdate=" + pmtdate + "]";
	}

}
