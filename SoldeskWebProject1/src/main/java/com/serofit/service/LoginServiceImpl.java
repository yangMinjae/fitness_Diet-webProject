package com.serofit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serofit.domain.LoginDTO;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class LoginServiceImpl implements LoginService{
	@Autowired
	UserMapper uMapper;
	public String login(LoginDTO ldto) {
		String uno = "0";
		if(uMapper.login(ldto)!=0) {
			uno = uMapper.getUno(ldto)+"";
		}
		log.warn("login result uno : "+uno);
		return uno;
	}
}
