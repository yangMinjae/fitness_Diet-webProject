package com.serofit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serofit.mapper.MailMapper;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class HFServiceImple implements HFService{
	@Autowired
	UserMapper uMapper;
	
	@Autowired
	MailMapper mMapper;
	
	// 로그인 시 닉네임 불러오기
	@Override
	public String getNickname(int uno) {
		return uMapper.readNickname(uno);
	}	
	
	// 읽지 않은 메일 불러오기
	@Override
	public int selectMailCountBySender(int sender) {		
		return mMapper.selectMailCountBySender(sender);
	}
}
