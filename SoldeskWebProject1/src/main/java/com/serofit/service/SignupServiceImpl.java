package com.serofit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serofit.domain.UserVO;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class SignupServiceImpl implements SignupService {

	@Autowired
	UserMapper uMapper;

	@Override
	public int validateId(String id) {
		return uMapper.validateId(id);
	}

	@Override
	public int validateEmail(String email) {
		return uMapper.validateEmail(email);
	}

	@Override
	public int validateNickname(String nickname) {
		return uMapper.validateNickname(nickname);
	}
	
	@Override
	public int insertUser(UserVO uvo) {
		return uMapper.insertUser(uvo);
	}
}
