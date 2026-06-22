package com.cs.rd.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class rdpassbook {

@Id
@GeneratedValue (strategy=GenerationType.IDENTITY)
private int pid;
private int rid;
@Column(name="rdate")
private String rdate;
private String ramt;
private String lday;
private Double famt;
private String flag;
public int getPid() {
	return pid;
}
public void setPid(int pid) {
	this.pid = pid;
}
public int getRid() {
	return rid;
}
public void setRid(int rid) {
	this.rid = rid;
}
public String getRdate() {
	return rdate;
}
public void setRdate(String rdate) {
	this.rdate = rdate;
}
public String getRamt() {
	return ramt;
}
public void setRamt(String ramt) {
	this.ramt = ramt;
}
public String getLday() {
	return lday;
}
public void setLday(String lday) {
	this.lday = lday;
}
public Double getFamt() {
	return famt;
}
public void setFamt(Double famt) {
	this.famt = famt;
}
public String getFlag() {
	return flag;
}
public void setFlag(String flag) {
	this.flag = flag;
}

}
