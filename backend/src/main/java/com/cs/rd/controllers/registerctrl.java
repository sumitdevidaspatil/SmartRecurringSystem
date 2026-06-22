package com.cs.rd.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cs.rd.entity.register;
import com.cs.rd.service.registerservice;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class registerctrl {
@Autowired
registerservice rs;

 @PostMapping("/register")
 public register save(@RequestBody register r)
 {
	  return rs.save(r);
 }

}
