package com.cs.rd.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cs.rd.entity.rdpassbook;
import com.cs.rd.pdto.DashboardDTO;
import com.cs.rd.pdto.userpassbookdto;
import com.cs.rd.repo.passbookrepo;
import com.cs.rd.service.passbookservice;
@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class passbookctrl {
@Autowired
private passbookrepo rp;

@Autowired
private passbookservice service;
@GetMapping("/detail")
public List<userpassbookdto> getdetaills(){
	return service.getdetails();
	
}
@GetMapping("/passbookid/{rid}")
public List<userpassbookdto> getpassbookids(@PathVariable("rid") int rid){
	return service.getpassbookid(rid);
}

@GetMapping("/passbookentry")
public Map<String , Object> getSummary(){
	Long total=rp.getpassbookentry();
	Map<String , Object> result=new HashMap<>();
	result.put("total", total);
	return result;
  }
@GetMapping("/phistory")
public List<rdpassbook> getHistory() {
    return service.getAllHistory();
}
@GetMapping("/dashboard")
public DashboardDTO getDashboard() {
    return service.getDashboardData();
}
@PostMapping("/psave")
   public  rdpassbook psaves(@RequestBody rdpassbook r) {
	return rp.save(r);
}
@PostMapping("/psaveall")
public List<rdpassbook> savesall(@RequestBody List <rdpassbook> rps){
	return rp.saveAll(rps);
}
@PutMapping("/pupdt")
public rdpassbook updts(@RequestBody rdpassbook r) {
	return rp.save(r);
}

@DeleteMapping("/pdel/{id}")
 public String Deleterbl(@PathVariable ("id")int id) {
	rp.deleteById(id);
	return "Record Delete Successfully";
}
}
