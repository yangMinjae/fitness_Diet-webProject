package com.serofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serofit.domain.BoardVO;
import com.serofit.domain.DietVO;
import com.serofit.mapper.BoardMapper;
import com.serofit.mapper.DietMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class WriteBoardServiceImple implements WriteBoardService {	
	@Autowired
	DietMapper dMapper;
	@Autowired
	BoardMapper bMapper;
		
	// 유저의 식단 타이틀 리스트 가져오기
	@Override
	public List<DietVO> getDietTitle(int uno) {
		List<DietVO> dietList = dMapper.selectDietByUno(uno);
		return dietList;
	}
	
	// 게시글 작성하기
	@Override
	public void register(BoardVO bvo) {
		
		bMapper.insertPost(bvo);

	}
}
