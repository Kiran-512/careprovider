package com.careprovider.dtos;

public class LoginResponse {

	private int id;
	private String userid;
	private String uname;
	private String role;
	
	public LoginResponse() {
		// TODO Auto-generated constructor stub
	}
	
	public LoginResponse(int id, String userid, String uname, String role) {
		this.id = id;
		this.userid = userid;
		this.uname = uname;
		this.role = role;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
}


//Use of this dto : When user go for log in that time we want to return the object of that use (caretaker, customer, admin )
//If we return the object of our entity class directly we would end up send the password too from server to client which is not necessary and threat to security!
//Hence we created another pojo class which ommits the password attribute from it and send that pojo class object from server to client so that we can use that data in our session management!



