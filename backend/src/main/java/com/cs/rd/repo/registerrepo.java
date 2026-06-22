package com.cs.rd.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs.rd.entity.register;

public interface registerrepo  extends  JpaRepository<register,Integer>{
  
	 register findByPhoneAndPassword(
		 String phone,
		 String password
	 );
}
