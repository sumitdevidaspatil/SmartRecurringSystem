package com.cs.rd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class loan {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private int rid;
private String name;
private double balance;
private double loanAmount;
private String applydate;
private String status;
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public int getRid() {
	return rid;
}
public void setRid(int rid) {
	this.rid = rid;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public double getBalance() {
	return balance;
}
public void setBalance(double balance) {
	this.balance = balance;
}
public double getLoanAmount() {
	return loanAmount;
}
public void setLoanAmount(double loanAmount) {
	this.loanAmount = loanAmount;
}
public String getApplydate() {
	return applydate;
}
public void setApplydate(String applydate) {
	this.applydate = applydate;
}
public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}

}
