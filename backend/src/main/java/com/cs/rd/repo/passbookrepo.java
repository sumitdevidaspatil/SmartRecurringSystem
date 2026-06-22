package com.cs.rd.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cs.rd.entity.rdpassbook;
import com.cs.rd.pdto.userpassbookdto;

public interface passbookrepo extends JpaRepository<rdpassbook,Integer>{
 
	@Query(value ="select max(ramt) from rdpassbook ",nativeQuery=true)
	Long getpassbookentry();
	
	@Query(value = "SELECT pid ,name, acno, rdpassbook.ramt, rdpassbook.rdate " +
			"FROM rduser INNER JOIN rdpassbook ON rduser.rid = rdpassbook.rid",nativeQuery = true)
          List<userpassbookdto> getuserpassbookdetails();
          
          @Query(value = "SELECT rduser.name, rduser.acno, rdpassbook.ramt, rdpassbook.rdate " +
                  "FROM rduser INNER JOIN rdpassbook ON rduser.rid = rdpassbook.rid " +
                  "WHERE rdpassbook.rid = :rid", 
          nativeQuery = true)
   List<userpassbookdto> getuserpassbookDetailbyId(@Param("rid") int rid);
}

