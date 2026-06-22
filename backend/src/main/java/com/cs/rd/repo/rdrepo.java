package com.cs.rd.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cs.rd.entity.rduser;

public interface rdrepo extends JpaRepository<rduser,Integer>{

	
	 @Query(value = "select sum(rdamt) from rduser", nativeQuery= true)
	 Long getuserdetail();
	@Query(value = "select count(*) from rduser", nativeQuery=true)
	Long getuserscount();
}
