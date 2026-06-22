package com.cs.rd.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs.rd.entity.loan;
import com.cs.rd.service.loanservice;

import org.springframework.web.bind.annotation.RequestBody;
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class loanctrl {

	@Autowired
	loanservice ls;
	
	@PostMapping("/loan/save")
	public loan save(@RequestBody loan l)
	{
		return ls.save(l);

	}
	
	@GetMapping("/loan/all")
	public List<loan> getAll(){
		 return ls.getAll();
		 }

	@GetMapping("/loan/approved")
	public List<loan> approvedLoans() {
	    return ls.getApprovedLoans();
	}
	
	@PutMapping("/loan/approve/{id}")
	public loan approveLoan(@PathVariable int id) {

	    loan l = ls.getById(id);

	    l.setStatus("APPROVED");

	    return ls.save(l);
	}
}
