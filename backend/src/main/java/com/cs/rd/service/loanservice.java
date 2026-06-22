package com.cs.rd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.rd.entity.loan;
import com.cs.rd.repo.loanrepo;
@Service
public class loanservice {


	@Autowired
	loanrepo lr;
	public loan save(loan l) {
		return lr.save(l);
	}
	public List<loan> getAll()
	{
		return lr.findAll();
	}
	public List<loan> getApprovedLoans() {
	     return lr.findByStatus("APPROVED");
	    }
	
	public loan getById(int id) {
	    return lr.findById(id).orElse(null);
	}
}

