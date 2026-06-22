package com.cs.rd.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class rduser {
@Id
@GeneratedValue(strategy =GenerationType.IDENTITY)
private int rid;
private String name;
@Column(name = "gender")
private String gender;
private String addr;
@Column(name="dob")
private LocalDate dob;
@Column(name="rddate")
private LocalDate rddate;
private int rdamt;
private String occupation;
private String acno;
@Column(name="adharno",unique=true , nullable=false)
private String adharno;
private String panno;
private String nominenm;
private String nomineaddr;
private String nomineadhar;
private String nominepanno;
private boolean agree;
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
public String getGender() {
   return gender;
}
public void setGender(String gender) {
	this.gender=gender;
}

public String getAddr() {
	return addr;
}
public void setAddr(String addr) {
	this.addr = addr;
}
public LocalDate getDob() {
	return dob;
}
public void setDob(LocalDate dob) {
	this.dob = dob;
}
public LocalDate getRddate() {
	return rddate;
}
public void setRddate(LocalDate rddate) {
	this.rddate = rddate;
}
public int getRdamt() {
	return rdamt;
}
public void setRdamt(int rdamt) {
	this.rdamt = rdamt;
}
public String getOccupation() {
	return occupation;
}
public void setOccupation(String occupation) {
	this.occupation = occupation;
}
public String getAcno() {
	return acno;
}
public void setAcno(String acno) {
	this.acno = acno;
}
public String getAdharno() {
	return adharno;
}
public void setAdharno(String adharno) {
	this.adharno = adharno;
}
public String getPanno() {
	return panno;
}
public void setPanno(String panno) {
	this.panno = panno;
}
public String getNominenm() {
	return nominenm;
}
public void setNominenm(String nominenm) {
	this.nominenm = nominenm;
}
public String getNomineaddr() {
	return nomineaddr;
}
public void setNomineaddr(String nomineaddr) {
	this.nomineaddr = nomineaddr;
}
public String getNomineadhar() {
	return nomineadhar;
}
public void setNomineadhar(String nomineadhar) {
	this.nomineadhar = nomineadhar;
}
public String getNominepanno() {
	return nominepanno;
}
public void setNominepanno(String nominepanno) {
	this.nominepanno = nominepanno;
}
public boolean isAgree() {
	return agree;
}
public void setAgree(boolean agree) {
	this.agree = agree;
}	
}
