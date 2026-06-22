package com.cs.rd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.rd.entity.register;
import com.cs.rd.repo.registerrepo;

@Service
public class registerservice {

    @Autowired
    registerrepo rr;

    public register save(register r) {
        return rr.save(r);
    }

    public register login(
            String phone,
            String password) {

        return rr.findByPhoneAndPassword(
                phone,
                password);
    }
}