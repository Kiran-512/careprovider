package com.careprovider.models;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotEmpty 
	@Column(length=40)
	@Size(min=2, max = 40, message="Name must contain at least two and at max 40 characters!" )
	private String name;
	
	@Pattern(regexp = "^[0-9]{10}$", message="Phone number must have min 10 digits")
	@NotEmpty
	@Column(length=10)
	private String phone;
	
	@NotEmpty(message="Gender can not be empty" )
	@Column(length=15)
	private String gender;

	@NotEmpty
	@Column(length=80)
	@Pattern(regexp = "^[a-zA-Z0-9]{2,80}$", message="Max 30 chracters allowed in address!")
	private String address;
	
	@NotEmpty(message="Please choose security question" )
	private String question;
	
	@NotEmpty(message="Please enter the answer to the security question!" )
	private String answer;

	@NotEmpty
	@Column(length=12)
	@Pattern(regexp = "^[0-9]{12}$", message="AdharCard has only 12 digits!")	
	private String uid;
	private String uidphoto;
	private String profilephoto;
	
	@Email(message="Please enter the well formed email ID")
	@NotEmpty
	@Column(length=30)
	private String userid;

	@NotEmpty(message="Please enter the password!")
	private String pwd;
	
	private LocalDate dob;
	private boolean active;
	private LocalDateTime createdon;

	public Customer() {
		this.createdon = LocalDateTime.now();
		this.active = false;
	}

	public Customer(int id) {
		this.id = id;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getUidphoto() {
		return uidphoto;
	}

	public void setUidphoto(String uidphoto) {
		this.uidphoto = uidphoto;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public LocalDateTime getCreatedon() {
		return createdon;
	}

	public void setCreatedon(LocalDateTime createdon) {
		this.createdon = createdon;
	}

	public String getProfilephoto() {
		return profilephoto;
	}

	public void setProfilephoto(String profilephoto) {
		this.profilephoto = profilephoto;
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", name=" + name + ", phone=" + phone + ", gender=" + gender + ", address="
				+ address + ", question=" + question + ", answer=" + answer + ", uid=" + uid + ", uidphoto=" + uidphoto
				+ ", userid=" + userid + ", active=" + active + ", createdon=" + createdon + "]";
	}

}
