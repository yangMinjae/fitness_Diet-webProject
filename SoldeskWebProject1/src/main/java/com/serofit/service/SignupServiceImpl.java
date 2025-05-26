package com.serofit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serofit.domain.FileVO;
import com.serofit.domain.LoginDTO;
import com.serofit.domain.UProfileVO;
import com.serofit.domain.UserVO;
import com.serofit.mapper.UProfileMapper;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class SignupServiceImpl implements SignupService {

	@Autowired
	UserMapper uMapper;

	@Autowired
	UProfileMapper upmapper;
	
	@Autowired
	PasswordEncoder pwEncoder;
	
	// 아이디 중복 확인
	@Override
	public int validateId(String id) {
		return uMapper.validateId(id);
	}

	// 이메일 중복 확인
	@Override
	public int validateEmail(String email) {
		return uMapper.validateEmail(email);
	}

	// 닉네임 중복 확인
	@Override
	public int validateNickname(String nickname) {
		return uMapper.validateNickname(nickname);
	}

	// 회원가입
	@Override
	@Transactional
	public int insertUser(UserVO uvo) {
		UProfileVO upvo = new UProfileVO();
		uvo.setPw(pwEncoder.encode(uvo.getPw()));
		int result = uMapper.insertUser(uvo);
		uMapper.insertAuth(uvo.getUno());
		
		if(result >= 1) {
			upvo.setUuid("basic0");
			upvo.setUno(uvo.getUno());
			result = upmapper.insertProfile(upvo);
		}
		
		return result;
	}
}
