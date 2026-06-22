package com.cs.rd.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs.rd.entity.register;
import com.cs.rd.pdto.logindto;
import com.cs.rd.service.registerservice;

import org.springframework.web.bind.annotation.RequestBody;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class loginctrl {

	@Autowired
	registerservice rr;
	
	@PostMapping("/login")
   public register login(@RequestBody logindto l) {
		
		register r= rr.login(
				l.getPhone(),
				l.getPassword());
		
		return r;
//		if(r!=null) {
//			return "success";
//		}
//		return "fail";
				
	}
}
