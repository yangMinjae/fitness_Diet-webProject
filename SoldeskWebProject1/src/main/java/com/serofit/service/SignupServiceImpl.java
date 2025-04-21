package com.serofit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serofit.domain.FileVO;
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
	@Transactional
	public int insertUser(UserVO uvo) {
		UProfileVO upvo = new UProfileVO();
		
		int userresult = uMapper.insertUser(uvo);
		UserVO vo = uMapper.findIdPwByEmail(uvo.getEmail());
		if (userresult == 1) {
			// uuid 고정 값
			upvo.setUuid("UUID-TEST");
			upvo.setUno(vo.getUno());
			
			int uuidresult = upmapper.insertProfile(upvo);
		}
		
		return userresult;
	}
}
