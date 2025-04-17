package com.serofit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serofit.domain.BoardVO;
import com.serofit.domain.DietVO;
import com.serofit.domain.FileVO;
import com.serofit.domain.HotBoardDTO;
import com.serofit.domain.UProfileVO;
import com.serofit.mapper.BoardMapper;
import com.serofit.mapper.DietMapper;
import com.serofit.mapper.FileMapper;
import com.serofit.mapper.UProfileMapper;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class HFServiceImple implements HFService{
	@Autowired
	UserMapper uMapper;
	
	// 로그인 시 닉네임 불러오기
	@Override
	public String getNickname(int uno) {
		return uMapper.readNickname(uno);
	}	
}
