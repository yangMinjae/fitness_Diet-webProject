package com.serofit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.serofit.domain.LoginDTO;
import com.serofit.domain.UserVO;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class LoginServiceImpl implements LoginService{
	@Autowired
	UserMapper uMapper;
	
	@Autowired
	PasswordEncoder pwEncoder;
	
	// 로그인 함수
	@Override
	public String login(LoginDTO ldto) {
		String uno = "0";
		if(uMapper.login(ldto)!=0) {
			uno = uMapper.getUno(ldto)+"";
		}
		log.warn("login result uno : "+uno);
		return uno;
	}
	
	// 아이디 비밀번호 찾기
	@Override
	public UserVO findID(String email) {		
		return uMapper.findIdPwByEmail(email);
	}
	
	@Override
	public int updatePW(UserVO uvo) {	
		uvo.setPw(pwEncoder.encode(uvo.getPw()));
		return uMapper.updatePW(uvo);
	}
}
