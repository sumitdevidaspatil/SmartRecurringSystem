package com.cs.rd.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs.rd.entity.loan;

public interface loanrepo extends JpaRepository<loan, Integer> {

	 List<loan> findByStatus(String status);
}
