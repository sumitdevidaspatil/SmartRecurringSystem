package com.cs.rd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.rd.entity.rdpassbook;
import com.cs.rd.pdto.DashboardDTO;
import com.cs.rd.pdto.userpassbookdto;
import com.cs.rd.repo.passbookrepo;
import com.cs.rd.repo.rdrepo;

@Service
public class passbookservice {
@Autowired
 
private passbookrepo ppr;
public List<userpassbookdto> getdetails(){
	return ppr.getuserpassbookdetails();
}
public List<userpassbookdto> getpassbookid(int rid){
	return ppr.getuserpassbookDetailbyId(rid);
}
public List<rdpassbook> getAllHistory() {
    return ppr.findAll();
}
@Autowired
private rdrepo rd;   // user table

public DashboardDTO getDashboardData() {

    DashboardDTO dto = new DashboardDTO();

    // Total Users
    int totalUsers = rd.findAll().size();

    // Total Balance
    double totalBalance = rd.findAll()
            .stream()
            .mapToDouble(u -> u.getRdamt())
            .sum();

    double totalLateFees = ppr.findAll()
            .stream()
            .mapToDouble(p -> p.getFamt() != null ? p.getFamt() : 0.0)
            .sum();

    dto.setTotalUsers(totalUsers);
    dto.setTotalBalance(totalBalance);
    dto.setTotalLateFees(totalLateFees);

    return dto;
}
}
