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

import com.cs.rd.entity.rduser;
import com.cs.rd.repo.rdrepo;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class rdctrl {
@Autowired
private rdrepo rd;

@GetMapping("/rdmaxamt")
public Map<String , Object> getSummary() {
 Long total=rd.getuserdetail();
  Map<String , Object> result= new HashMap<>();
  result.put("total", total);
  return result;
}
@GetMapping("/rdusers")  // count users how many users
public Map<String ,Object> getcout(){
	Long total=rd.getuserscount();
	Map<String , Object>result=new HashMap<>();
	result.put("total", total);
	return result;
}

	@GetMapping("/rduserdata")
	List <rduser> getrd(){
	List<rduser> user = rd.findAll();
	return user;
	}
	@PostMapping("/rdsave")
	public rduser saveps(@RequestBody  rduser p) {
		return rd.save(p);	
	}
	@PutMapping("/rdupdt")
	public rduser updt(@RequestBody rduser s) {
		return rd.save(s);
	}
	@DeleteMapping("/rddel/{id}")
	public String DeleteBlg(@PathVariable("id") int id)
	{
	rd.deleteById(id);
	return "Record Delete Successfully......" ; 
	}
}


